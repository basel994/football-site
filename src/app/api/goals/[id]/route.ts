import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    const { 
        player_id, 
        minute 
    }: { 
        match_id: number;
        player_id: number; 
        minute: number; 
    } = await request.json();
    try {
        const editGoalsQuery = await sql `
        UPDATE goals 
        SET player_id = ${player_id}, 
        minute = ${minute} 
        WHERE id = ${intId}
        RETURNING id
        `;
        if(editGoalsQuery.rows.length > 0) {
            return NextResponse.json({message: "تم تعديل الحدث بنجــاح"});
        }
        else {
            return NextResponse.json({error: "لم يتم العثور على الحدث"})
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تعديل الحدث!"});
    }
}
export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const headers = request.headers;
    headers.get("Content-Type");
    const id = (await params).id;
    const intId = parseInt(id);
    try {
        const deleteGoalQuery = await sql `
        DELETE FROM goals 
        WHERE id = ${intId}
        RETURNING id
        `;
        if(deleteGoalQuery.rows.length > 0) {
            return NextResponse.json({message: "تم تعديل الحدث بنجــاح"});
        }
        else {
            return NextResponse.json({error: "لم يتم العثور على الحدث"})
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل تعديل الحدث!"});
    }
}