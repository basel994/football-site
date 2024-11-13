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
        const getChampionshipsQuery = await sql `
        SELECT * FROM championships
        `;
        return NextResponse.json({data: getChampionshipsQuery.rows});
    } catch( error ) {
        console.log( error );
        return NextResponse.json({error: "فشل في تحميـل البطولات! الرجــاء المحاولة لاحقـاً."})
    }
}
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
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
        INSERT INTO championships(name, logo, type)   
        VALUES (${name}, ${uploadResult.secure_url}, ${type})  
        RETURNING id;  
      `;
      if(res.rows.length > 0) {
        return NextResponse.json({message: "تم إضافة بطولة جديدة بنجــاح"});
      }
      return NextResponse.json({error: "لم تتم الإضافــة"});
    } catch ( error ) {
        console.log( error );
        return NextResponse.json({error: "جدث خطـأ أثناء الإضافة! حـاول مجدداً"});
    }
}