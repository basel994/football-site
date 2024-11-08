import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const {status} = await request.json();
    const id = (await params).id;
    const intId = parseInt(id);
    try {
        const updateStatusQuery = await sql `
        UPDATE matches 
        SET status = ${status} 
        WHERE id = ${intId} 
        RETURNING id
        `;
        if(updateStatusQuery.rows.length > 0) {
            return NextResponse.json({message: "تم تحديث الحالة بنجاح"});
        }
        else {
            return NextResponse.json({error: "لم يتم تحديث الحالـة!"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في تحديث الحالـة!"});
    }
}