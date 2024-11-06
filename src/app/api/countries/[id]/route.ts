import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const getCountryQuery = await sql `
        SELECT * FROM countries WHERE id = ${intId}
        `;
        if(getCountryQuery.rows.length > 0) {
            return NextResponse.json({data: getCountryQuery.rows[0]});
        }
        else {
            return NextResponse.json({error: "البلد غير موجود!"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تحميل بيانات البلد!"})
    }
}
export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    const formData = await request.formData();
    const newName = formData.get("newName") as string;
    const newLogo = formData.get("newLogo") as File;
    cloudinary.v2.config( {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    } );
    type CloudinaryResponse = {
        secure_url: string;
    }
    try {
        if(newLogo) {
            const arrayBuffer = await newLogo.arrayBuffer();
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
            const updateCountryQuery = await sql `
            UPDATE countries 
            SET name = ${newName}, 
            logo = ${uploadResult.secure_url} 
            WHERE id = ${intId} 
            RETURNING id
            `;
            if(updateCountryQuery.rows.length > 0) {
                return NextResponse.json({message: "تم تعديل البلد بنجتاح"});
            }
            else {
                return NextResponse.json({error: "حصل خطأ أثناء التعديل!"})
            }
        } else {
            const updateCountryQuery = await sql `
            UPDATE countries 
            SET name = ${newName} 
            WHERE id = ${intId} 
            RETURNING id
            `;
            if(updateCountryQuery.rows.length > 0) {
                return NextResponse.json({message: "تم تعديل البلد بنجتاح"});
            }
            else {
                return NextResponse.json({error: "حصل خطأ أثناء التعديل!"})
            }
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في تعديل البلد!"});
    }
}
export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const deleteCountryQuery = await sql `
        DELETE FROM countries 
        WHERE id = ${intId} 
        RETURNING id
        `;
        if(deleteCountryQuery.rows.length > 0) {
            return NextResponse.json({message: "تم حذف البلد بنجـاح"});
        }
        else {
            return NextResponse.json({error: "حصل خطـأ أثنـاء الحذف!"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في حذف البلد!"});
    }
}