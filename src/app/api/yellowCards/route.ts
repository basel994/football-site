import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const getYellowCardsQuery = await sql `
        SELECT * FROM yellowCards
        `;
        return NextResponse.json({data: getYellowCardsQuery.rows});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تحميل البطاقات الصفراء!"})
    }
}
export async function POST(request: NextRequest) {
    const { 
        champion,
        match_id, 
        team_id,
        player_id, 
        minute 
    }: { 
        champion: string;
        match_id: number;
        team_id: number;
        player_id: number; 
        minute: number; 
    } = await request.json();
    try {
        const addYellowCardQuery = await sql `
        INSERT INTO yellowCards (champion, match_id, team_id, player_id, minute) VALUES (${champion}, ${match_id}, ${team_id}, ${player_id}, ${minute}) 
        RETURNING id
        `;
        if(addYellowCardQuery.rows.length > 0) {
            return NextResponse.json({message: "تم إضافة بطاقة صفراء بنجـاح"});
        }
        else {
            return NextResponse.json({error: "حصل خطـأ أثنـاء إضافة بطاقة صفراء!"});
        }
        
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل إضافة بطاقة صفراء!"});
    }
}