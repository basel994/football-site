import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(  
    {params}: {params: {id: string}}) {
        try {
            const fetchNewQuery = await sql `
            SELECT * FROM sportNews WHERE id = ${parseInt(params.id)}
            `;
            return NextResponse.json({data: fetchNewQuery.rows[0]})
        } catch ( error ) {
            console.log( error );
            return NextResponse.json({error: "فشل في تحميل الخبر"});
        }
    }