import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: Promise<{name: string}>}) {
    const headers = request.headers;
    headers.get("Content-Type");
    const name = (await params).name;
    try {
        const fetchChampionByIdQuery = await sql `
        SELECT * FROM championships WHERE name = ${name}
        `;
        if(fetchChampionByIdQuery.rows.length > 0) {
            return NextResponse.json({data: fetchChampionByIdQuery.rows[0]});
        }
        else return NextResponse.json({error: "لم يتم العثور على البطولة!"});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تحميل بيانات البطولـة!"});
    }
}