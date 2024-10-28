import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

interface Params {  
    id: string;  
} 
export async function GET( 
    request: NextRequest, 
    {params}: {params: Params}) {
        const headers = request.headers;
        headers.get("Content-Type");
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