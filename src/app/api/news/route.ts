import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const fetchNewsQuery = await sql `
        SELECT * FROM news
        `;
        return NextResponse.json({data: fetchNewsQuery.rows})
    } catch( error ) {
        console.log( error );
        return NextResponse.json({error: "فشل التحميل"})
    }
}