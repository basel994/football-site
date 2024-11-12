import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const fetchParticipantsQuery = await sql `
        SELECT * FROM participants
        `;
        return NextResponse.json({data: fetchParticipantsQuery.rows});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "حدث خطأ"});
    }
}
export async function POST(request: NextRequest) {
    const {champion, team_id, type} = await request.json();
    try {
        const addNewParticipantQuery = await sql `
        INSERT INTO participants (champion, team_id, type) VALUES (${champion}, ${team_id}, ${type}) 
        RETURNING id
        `;
        if(addNewParticipantQuery.rows.length > 0) {
            return NextResponse.json({message: "تم إضافة مشارك جديد للبطولة"});
        }
        else {
            return NextResponse.json({error: "لم يتم الإضافة !"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "حدث خطأ اثناء الإضافة!"});
    }
}