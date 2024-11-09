import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: Promise<{champion: string}>}) {
    const champion = (await params).champion;
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const getRedCardsQuery = await sql `
        SELECT * FROM redCards WHERE champion = ${champion}
        `;
            return NextResponse.json({data: getRedCardsQuery.rows});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تحميل البطاقات الحمراء!"});
    }
}