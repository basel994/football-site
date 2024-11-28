import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

export async function GET( 
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }) {
        const headers = request.headers;
        headers.get("Content-Type");
        const id = (await params).id
        try {
            const fetchNewQuery = await sql `
            SELECT * FROM sportNews WHERE id = ${parseInt(id)}
            `;
            return NextResponse.json({data: fetchNewQuery.rows[0]});
        } catch ( error ) {
            console.log( error );
            return NextResponse.json({error: "فشل في تحميل الخبر"});
        }
    }
    export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {  
        const id = (await params).id;   
        const formData = await request.formData();
        const newTitle = formData.get("newTitle") as string;
        const newContent = formData.get("newContent") as string;
        const newImage = formData.get("newImage") as File;
        try {  
            if(!newImage){
                
                const result = await sql`  
                UPDATE sportNews
                SET title = ${newTitle}, 
                content = ${newContent} 
                WHERE id = ${parseInt(id)}  
                RETURNING *  
                `;
                if (result.rows.length === 0) {  
                    return NextResponse.json({ error: "الخبـر غـير موجـود!" }, { status: 404 });  
                }  
        
                return NextResponse.json({ message: "تم تعديل الخبـر بنجـاح" }, { status: 200 }); 
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
                      UPDATE sportNews
                      SET title = ${newTitle},
                      image = ${uploadResult.secure_url}, 
                      content = ${newContent} 
                      WHERE id = ${parseInt(id)}  
                      RETURNING * 
                      `;  
                      if (res.rows.length === 0) {  
                        return NextResponse.json({ error: "الخبـر غـير موجتود!" }, { status: 404 });  
                    }  
            
                    return NextResponse.json({ message: "تم تعديل الخبـر بنجـاح" }, { status: 200 });            
            }  
     
    
        } catch (error) {  
            console.error(error);  
            return NextResponse.json({ error: "فشل في تعـديل الخبـر" }, { status: 500 });  
        }  
    }
    
    export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
        const headers = request.headers;
        headers.get("Content-Type");
        const id = (await params).id;
        try {
            const deleteNewQuery = await sql `
            DELETE FROM sportNews WHERE id = ${parseInt(id)} RETURNING id
            `;
            if(deleteNewQuery.rows.length > 0) {
                return NextResponse.json({message: "تم حـذف الخبـر بنجـاح"});
            }
            else {
                return NextResponse.json({error: "لم يتم حـذف الخبـر!"});
            }
        } catch(error) {
            console.log(error);
            return NextResponse.json({error: "فشل في حـذف الخبـر!"});
        }
    }