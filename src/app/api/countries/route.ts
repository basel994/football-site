import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
export async function GET(request: NextRequest) {
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const getCountriesQuery = await sql `
        SELECT * FROM countries
        `;
        return NextResponse.json(getCountriesQuery.rows);
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تحميل البلـدان!"})
    }
}
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const logo = formData.get("logo") as File;
    cloudinary.v2.config(
        {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        }
    );
    type CloudinaryResponse = {
        secure_url: string;
    }
    try {
        const arrayBuffer = await logo.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResultPromise = new Promise<CloudinaryResponse>((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream( {
                resource_type: "auto",
            }, (error, result) => {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(result as CloudinaryResponse);
                }
            } );
            uploadStream.end(buffer);
        });
        const uploadResult = await uploadResultPromise;
        const addCountryQuery = await sql `
        INSERT INTO countries 
        (name, logo) 
        VALUES (${name}, ${uploadResult.secure_url}) 
        RETURNING id
        `;
        if(addCountryQuery.rows.length > 0) {
            return NextResponse.json({message: "تم إضافة بلد جديد بنجـاح"});
        }
        else {
            return NextResponse.json({error: "حصل خطـأ أثنـاء الإضـافـة!"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في إضافة بلد جديد"});
    }
}