import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

export async function GET( request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    const headers = request.headers;
    headers.get("Content-Type");
    const id = (await params).id
    try {
        const getTeamsQuery = await sql `
        SELECT * FROM teams WHERE id = ${parseInt(id)}
        `;
        return NextResponse.json({data: getTeamsQuery.rows[0]});
    } catch( error ) {
        console.log( error );
        return NextResponse.json({error: "فشل في تحميـل بيانات الفريق! الرجــاء المحاولة لاحقـاً."})
    }
}
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {  
    const id = (await params).id;   
    const formData = await request.formData();
    const newName = formData.get("newName") as string;
    const newCountry = formData.get("newCountry") as string;
    const newFounded = formData.get("newFounded") as string;
    const newCoach = formData.get("newCoach") as string;
    const newLogo = formData.get("newLogo") as File;
    try {  
        if(!newLogo){
            
            const result = await sql`  
            UPDATE teams
            SET name = ${newName}, 
            country = ${parseInt(newCountry)}, 
            founded_at = ${parseInt(newFounded)}, 
            coach = ${newCoach}
            WHERE id = ${parseInt(id)}  
            RETURNING *  
            `;
            if (result.rows.length === 0) {  
                return NextResponse.json({ error: "الفريق غـير موجود!" }, { status: 404 });  
            }  
    
            return NextResponse.json({ message: "تم تعديل الفريق بنجـاح" }, { status: 200 }); 
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
                  UPDATE teams
                  SET name = ${newName}, 
                  country = ${parseInt(newCountry)}, 
                  founded_at = ${parseInt(newFounded)}, 
                  coach = ${newCoach}, 
                  logo = ${uploadResult.secure_url} 
                  WHERE id = ${parseInt(id)}  
                  RETURNING * 
                  `;  
                  if (res.rows.length === 0) {  
                    return NextResponse.json({ error: "الفريق غـير موجود!" }, { status: 404 });  
                }  
        
                return NextResponse.json({ message: "تم تعديل الفريق بنجـاح" }, { status: 200 });            
        }  
 

    } catch (error) {  
        console.error(error);  
        return NextResponse.json({ error: "فشل في تعـديل الفريق" }, { status: 500 });  
    }  
}

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const headers = request.headers;
    headers.get("Content-Type");
    const id = (await params).id;
    try {
        const deleteTeamQuery = await sql `
        DELETE FROM teams WHERE id = ${parseInt(id)} RETURNING id
        `;
        if(deleteTeamQuery.rows.length > 0) {
            return NextResponse.json({message: "تم حـذف الفريق بنجـاح"});
        }
        else {
            return NextResponse.json({error: "لم يتم حـذف الفريق!"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في حـذف الفريق!"});
    }
}