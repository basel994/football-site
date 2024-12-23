import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
export async function GET(request: NextRequest) {
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const getPlayersQuery = await sql `
        SELECT * FROM players
        `;
        return NextResponse.json({data: getPlayersQuery.rows});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تحميل اللاعبـين!"})
    }
}
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const age = formData.get("age") as string;
    const role = formData.get("role") as string;
    const country = formData.get("country") as string;
    const team = formData.get("team") as string;
    const image = formData.get("image") as File;
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
        const arrayBuffer = await image.arrayBuffer();
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
        INSERT INTO players 
        (name, age, role, image, country, team) 
        Values (${name}, ${age}, ${role}, ${uploadResult.secure_url}, ${parseInt(country)}, ${parseInt(team)}) 
        RETURNING id
        `;
        if(addCountryQuery.rows.length > 0) {
            return NextResponse.json({message: "تم إضافة لاعـب جديد بنجـاح"});
        }
        else {
            return NextResponse.json({error: "حصل خطـأ أثنـاء الإضـافـة!"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في إضافة لاعـب جديد"});
    }
}