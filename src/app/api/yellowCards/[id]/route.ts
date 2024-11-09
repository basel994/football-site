import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const { 
        player_id, 
        minute 
    }: { 
        player_id: number; 
        minute: number; 
    } = await request.json();
    try {
        const editYellowCardQuery = await sql `
        UPDATE yellowCards 
        SET player_id = ${player_id}, 
        minute = ${minute} 
        WHERE id = ${id}
        RETURNING id
        `;
        if(editYellowCardQuery.rows.length > 0) {
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
        const deleteYellowCardQuery = await sql `
        DELETE FROM yellowCards 
        WHERE id = ${intId}
        RETURNING id
        `;
        if(deleteYellowCardQuery.rows.length > 0) {
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