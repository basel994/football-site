import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {  
    const id = (await params).id;   
    const formData = await request.formData();
    const newImage = formData.get("image") as File;
    try {  
            cloudinary.v2.config({  
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
                api_key: process.env.CLOUDINARY_API_KEY,  
                api_secret: process.env.CLOUDINARY_API_SECRET,  
            });
            type CloudinaryResponse = {  
                secure_url: string;  
              } 
              const arrayBuffer = await newImage.arrayBuffer();
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
                  UPDATE users
                  SET image = ${uploadResult.secure_url}
                  WHERE id = ${parseInt(id)}  
                  RETURNING * 
                  `;  
                  if (res.rows.length === 0) {  
                    return NextResponse.json({ error: "المستخدم غـير موجودة!" }, { status: 404 });  
                }  
        
                return NextResponse.json({ message: "تم تعديل الصورة بنجـاح" }, { status: 200 });             
 

    } catch (error) {  
        console.error(error);  
        return NextResponse.json({ error: "فشل في تعـديل صورة الملف الشخصي" }, { status: 500 });  
    }  
}