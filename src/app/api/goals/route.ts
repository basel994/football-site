import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const getGoalsQuery = await sql `
        SELECT * FROM goals
        `;
        return NextResponse.json({data: getGoalsQuery.rows});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تحميل الأهداف!"})
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
        const addGoalQuery = await sql `
        INSERT INTO redCards (champion, match_id, player_id, minute) VALUES (${champion}, ${match_id}, ${player_id}, ${minute}) 
        RETURNING id
        `;
        if(addGoalQuery.rows.length > 0) {
            return NextResponse.json({message: "تم إضافة هدف بنجـاح"});
        }
        else {
            return NextResponse.json({error: "حصل خطـأ أثنـاء إضافة هدف!"});
        }
        
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل إضافة هدف!"});
    }
}