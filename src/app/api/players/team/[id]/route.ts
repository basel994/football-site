import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const getPlayersQuery = await sql `
        SELECT * FROM players WHERE team = ${intId}
        `;
            return NextResponse.json({data: getPlayersQuery.rows});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تحميل لاعبو الفريق!"});
    }
}