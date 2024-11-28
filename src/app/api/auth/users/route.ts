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
        const getUsersQuery = await sql `
        SELECT * FROM users
        `;
        return NextResponse.json({data: getUsersQuery.rows});
    } catch( error ) {
        console.log( error );
        return NextResponse.json({error: "فشل في تحميـل المستخدمين! الرجــاء المحاولة لاحقـاً."})
    }
}
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const last = formData.get("last") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const image = formData.get("image") as File;
    try {
        const arrayBuffer = await image.arrayBuffer();
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
        INSERT INTO users(name, last, password, role, image)   
        VALUES (${name}, ${last}, ${password}, ${role}, ${uploadResult.secure_url})  
        RETURNING id;  
      `;
      if(res.rows.length > 0) {
        return NextResponse.json({message: "تم إضافة مستخدم جديد بنجــاح"});
      }
      return NextResponse.json({error: "لم تتم الإضافــة"});
    } catch ( error ) {
        console.log( error );
        return NextResponse.json({error: "جدث خطـأ أثناء الإضافة! حـاول مجدداً"});
    }
}