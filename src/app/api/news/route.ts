import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({  
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
    api_key: process.env.CLOUDINARY_API_KEY,  
    api_secret: process.env.CLOUDINARY_API_SECRET,  
});
type CloudinaryResponse = {  
    secure_url: string;  
  } 

export async function GET(request: NextRequest) {
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const fetchNewsQuery = await sql `
        SELECT * FROM sportNews
        `;
        return NextResponse.json({data: fetchNewsQuery.rows})
    } catch( error ) {
        console.log( error );
        return NextResponse.json({error: "فشل في تحميـل الأخبــار! الرجــاء المحاولة لاحقـاً."})
    }
}
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
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
        INSERT INTO sportNews(title, image, content)   
        VALUES (${title}, ${uploadResult.secure_url}, ${content})  
        RETURNING id;  
      `;
      if(res.rows.length > 0) {
        return NextResponse.json({message: "تم إضافة خبـر جديـد بنجــاح"});
      }
      return NextResponse.json({error: "لم تتم الإضافــة"});
    } catch ( error ) {
        console.log( error );
        return NextResponse.json({error: "جدث خطـأ أثناء الإضافة! حـاول مجدداً"});
    }
}