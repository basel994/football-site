import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const getPlayerQuery = await sql `
        SELECT * FROM players WHERE id = ${intId}
        `;
        if(getPlayerQuery.rows.length > 0) {
            return NextResponse.json({data: getPlayerQuery.rows[0]});
        }
        else {
            return NextResponse.json({error: "اللاعب غير موجود!"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تحميل بيانات اللاعب!"})
    }
}
export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const age = formData.get("age") as string;
    const role = formData.get("role") as string;
    const country = formData.get("country") as string;
    const team = formData.get("team") as string;
    const image = formData.get("image") as File;
    cloudinary.v2.config( {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    } );
    type CloudinaryResponse = {
        secure_url: string;
    }
    try {
        if(image) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadResultPromise = new Promise<CloudinaryResponse>((resolve, reject) => {
                const uploadStream = cloudinary.v2.uploader.upload_stream({
                    resource_type: "auto",
                }, (error, result) => {
                    if(error) {
                        reject(error);
                    }
                    else {
                        resolve(result as CloudinaryResponse);
                    }
                });
                uploadStream.end(buffer);
            });
            const uploadResult = await uploadResultPromise;
            const updatePlayerQuery = await sql `
            UPDATE players 
            SET name = ${name}, 
            age = ${age}, 
            role = ${role}, 
            country = ${parseInt(country)}, 
            team = ${parseInt(team)}, 
            image = ${uploadResult.secure_url} 
            WHERE id = ${intId} 
            RETURNING id
            `;
            if(updatePlayerQuery.rows.length > 0) {
                return NextResponse.json({message: "تم تعديل اللاعب بنجتاح"});
            }
            else {
                return NextResponse.json({error: "حصل خطأ أثناء التعديل!"})
            }
        } else {
            const updatePlayerQuery = await sql `
            UPDATE players 
            SET name = ${name}, 
            age = ${age}, 
            role = ${role}, 
            country = ${parseInt(country)}, 
            team = ${parseInt(team)} 
            WHERE id = ${intId} 
            RETURNING id
            `;
            if(updatePlayerQuery.rows.length > 0) {
                return NextResponse.json({message: "تم تعديل اللاعـب بنجتاح"});
            }
            else {
                return NextResponse.json({error: "حصل خطأ أثناء التعديل!"})
            }
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في تعديل اللاعـب!"});
    }
}
export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const deletePlayerQuery = await sql `
        DELETE FROM players 
        WHERE id = ${intId} 
        RETURNING id
        `;
        if(deletePlayerQuery.rows.length > 0) {
            return NextResponse.json({message: "تم حذف اللاعـب بنجـاح"});
        }
        else {
            return NextResponse.json({error: "حصل خطـأ أثنـاء الحذف!"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في حذف اللاعـب!"});
    }
}