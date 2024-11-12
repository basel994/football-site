import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: Promise<{champion: string}>}) {
    const champion = (await params).champion;
    const headers = request.headers;
    headers.get("Content-Type");
    try{
        const fetchParticipantByIdQuery = await sql `
        SELECT * FROM participants WHERE champion = ${champion}
        `;
        if(fetchParticipantByIdQuery.rows.length > 0) {
            return NextResponse.json({data: fetchParticipantByIdQuery.rows[0]});
        }
        else {
            return NextResponse.json({error: "لم يتم العثور على مشاركون!"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "حدث خطأ"})
    }
}