import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

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