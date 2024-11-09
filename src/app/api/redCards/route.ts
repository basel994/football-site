import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const getRedCardsQuery = await sql `
        SELECT * FROM redCards
        `;
        return NextResponse.json({data: getRedCardsQuery.rows});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تحميل البطاقات الحمراء!"})
    }
}
export async function POST(request: NextRequest) {
    const { 
        champion,
        match_id, 
        player_id, 
        minute 
    }: { 
        champion: string;
        match_id: number;
        player_id: number; 
        minute: number; 
    } = await request.json();
    try {
        const addRedCardQuery = await sql `
        INSERT INTO redCards (champion, match_id, player_id, minute) VALUES (${champion}, ${match_id}, ${player_id}, ${minute}) 
        RETURNING id
        `;
        if(addRedCardQuery.rows.length > 0) {
            return NextResponse.json({message: "تم إضافة بطاقة حمراء بنجـاح"});
        }
        else {
            return NextResponse.json({error: "حصل خطـأ أثنـاء إضافة بطاقة حمراء!"});
        }
        
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل إضافة بطاقة حمراء!"});
    }
}