import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    const headers = request.headers;
    headers.get("Content-Type");
    try{
        const deleteParticipsntQuery = await sql `
        DELETE FROM participants WHERE id = ${intId} 
        RETURNING id
        `;
        if(deleteParticipsntQuery.rows.length > 0) {
            return NextResponse.json({message: "تم حذف المشاركة بنجاح"});
        }
        else {
            return NextResponse.json({error: "لم يتم حذف المشاركة!"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "حدث خطأ اثناء الحذف"});
    }
}