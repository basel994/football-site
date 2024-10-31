import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { sql } from "@vercel/postgres";

cloudinary.v2.config({  
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
    api_key: process.env.CLOUDINARY_API_KEY,  
    api_secret: process.env.CLOUDINARY_API_SECRET,  
});
type CloudinaryResponse = {  
    secure_url: string;  
  } 
export async function GET( request: NextRequest) {
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const getTeamsQuery = await sql `
        SELECT * FROM teams
        `;
        return NextResponse.json({data: getTeamsQuery.rows});
    } catch( error ) {
        console.log( error );
        return NextResponse.json({error: "فشل في تحميـل الفرق/المنتخبات! الرجــاء المحاولة لاحقـاً."})
    }
}
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const country = formData.get("country") as string;
    const coach = formData.get("coach") as string;
    const founded_at = formData.get("founded_at") as string;
    const logo = formData.get("logo") as File;
    try {
        const arrayBuffer = await logo.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResultPromise = new Promise<CloudinaryResponse>((resolve, reject) => {  
        const uploadStream = cloudinary.v2.uploader.upload_stream({   
            resource_type: 'auto'  
        }, (error, result) => {  
            if (error) {  
                reject(error);  
            } else {  
                resolve(result as CloudinaryResponse);  
            }  
        });  
      
            uploadStream.end(buffer);  
        });
        const uploadResult = await uploadResultPromise;
        const res = await sql`  
        INSERT INTO teams(name, country, founded_at, coach, logo)   
        VALUES (${name}, ${country}, ${parseInt(founded_at)}, ${coach}, ${uploadResult.secure_url})  
        RETURNING id;  
      `;
      if(res.rows.length > 0) {
        return NextResponse.json({message: "تم إضافة فريق/منتخب جديد بنجــاح"});
      }
      return NextResponse.json({error: "لم تتم الإضافــة"});
    } catch ( error ) {
        console.log( error );
        return NextResponse.json({error: "جدث خطـأ أثناء الإضافة! حـاول مجدداً"});
    }
}