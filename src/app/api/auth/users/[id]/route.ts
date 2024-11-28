import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const headers = request.headers;
    headers.get("Content-Type");
    const id = (await params).id;
    const intId = parseInt(id);
    try {
        const fetchUserByIdQuery = await sql `
        SELECT * FROM users WHERE id = ${intId}
        `;
        if(fetchUserByIdQuery.rows.length > 0) {
            return NextResponse.json({data: fetchUserByIdQuery.rows[0]});
        }
        else return NextResponse.json({error: "لم يتم العثور على المستخدم!"});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تحميل بيانات المستخدم!"});
    }
}
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {  
    const id = (await params).id;   
    const formData = await request.formData();
    const newName = formData.get("newName") as string;
    const newLast = formData.get("newLast") as string;
    const newPassword = formData.get("newPassword") as string;
    const newRole = formData.get("newRole") as string;
    const newImage = formData.get("newImage") as File;
    try {  
        if(!newImage){
            
            const result = await sql`  
            UPDATE users
            SET name = ${newName}, 
            last = ${newLast}, 
            password = ${newPassword}, 
            role = ${newRole} 
            WHERE id = ${parseInt(id)}  
            RETURNING *  
            `;
            if (result.rows.length === 0) {  
                return NextResponse.json({ error: "المستخدم غـير موجودة!" }, { status: 404 });  
            }  
    
            return NextResponse.json({ message: "تم تعديل المستخدم بنجـاح" }, { status: 200 }); 
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
                  SET name = ${newName}, 
                  last = ${newLast}, 
                  password = ${newPassword}, 
                  role = ${newRole}, 
                  image = ${uploadResult.secure_url}
                  WHERE id = ${parseInt(id)}  
                  RETURNING * 
                  `;  
                  if (res.rows.length === 0) {  
                    return NextResponse.json({ error: "المستخدم غـير موجودة!" }, { status: 404 });  
                }  
        
                return NextResponse.json({ message: "تم تعديل المستخدم بنجـاح" }, { status: 200 });            
        }  
 

    } catch (error) {  
        console.error(error);  
        return NextResponse.json({ error: "فشل في تعـديل المستخدم" }, { status: 500 });  
    }  
}

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const headers = request.headers;
    headers.get("Content-Type");
    const id = (await params).id;
    try {
        const deleteUserQuery = await sql `
        DELETE FROM users WHERE id = ${parseInt(id)} RETURNING id
        `;
        if(deleteUserQuery.rows.length > 0) {
            return NextResponse.json({message: "تم حـذف المستخدم بنجـاح"});
        }
        else {
            return NextResponse.json({error: "لم يتم حـذف المستخدم!"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في حـذف المستخدم!"});
    }
}