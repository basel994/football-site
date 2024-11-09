import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: Promise<{champion: string}>}) {
    const champion = (await params).champion;
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const getYellowCardsQuery = await sql `
        SELECT * FROM yellowCards WHERE champion = ${champion}
        `;
            return NextResponse.json({data: getYellowCardsQuery.rows});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تحميل البطاقات الصفراء!"});
    }
}