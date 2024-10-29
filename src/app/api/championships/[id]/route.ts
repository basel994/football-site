import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const headers = request.headers;
    headers.get("Content-Type");
    const id = (await params).id;
    try {
        const deleteChampionQuery = await sql `
        DELETE FROM championships WHERE id = ${parseInt(id)} RETURNING id
        `;
        if(deleteChampionQuery.rows.length > 0) {
            return NextResponse.json({message: "تم حـذف البطولــة بنجـاح"});
        }
        else {
            return NextResponse.json({error: "لم يتم حـذف البطولــة!"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في حـذف البطولــة!"});
    }
}
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {  
    const id = (await params).id;   
    const formData = await request.formData();
    const newName = formData.get("newName") as string;
    const newLogo = formData.get("newLogo") as File;
    try {  
        if(!newLogo){
            
            const result = await sql`  
            UPDATE championships
            SET name = ${newName}, 
            WHERE id = ${parseInt(id)}  
            RETURNING *  
            `;
            if (result.rows.length === 0) {  
                return NextResponse.json({ error: "البطولـة غـير موجودة!" }, { status: 404 });  
            }  
    
            return NextResponse.json({ message: "تم تعديل البطولـة بنجـاح" }, { status: 200 }); 
        }
        else {
            cloudinary.v2.config({  
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
                api_key: process.env.CLOUDINARY_API_KEY,  
                api_secret: process.env.CLOUDINARY_API_SECRET,  
            });
            type CloudinaryResponse = {  
                secure_url: string;  
              } 
              const arrayBuffer = await newLogo.arrayBuffer();
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
                  UPDATE championships
                  SET name = ${newName},
                  logo = ${uploadResult.secure_url} 
                  WHERE id = ${parseInt(id)}  
                  RETURNING * 
                  `;  
                  if (res.rows.length === 0) {  
                    return NextResponse.json({ error: "البطولـة غـير موجودة!" }, { status: 404 });  
                }  
        
                return NextResponse.json({ message: "تم تعديل البطولـة بنجـاح" }, { status: 200 });            
        }  
 

    } catch (error) {  
        console.error(error);  
        return NextResponse.json({ error: "فشل في تعـديل البطولــة" }, { status: 500 });  
    }  
}