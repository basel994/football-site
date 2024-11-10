import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const intId = parseInt(id);
    const headers = request.headers;
    headers.get("Content-Type");
    try {
        const getMatchById = await sql `
        SELECT * FROM matches WHERE id = ${intId}
        `;
        if(getMatchById.rows.length > 0) {
            return NextResponse.json({data: getMatchById.rows[0]});
        }
        else {
            return NextResponse.json({error: "لم يتم العثور على المباراة"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فسل تحميل المباراة!"});
    }
}
export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const formData = await request.formData();
    const team_one = formData.get("team_one") as string;
    const team_two = formData.get("team_two") as string;
    const championship = formData.get("championship") as string;
    const match_date = formData.get("match_date") as string;
    try {
        const res = await sql`  
        UPDATE matches
        SET team_one = ${parseInt(team_one)},
        team_two = ${parseInt(team_two)},
        championship = ${championship},
        match_date = ${match_date} 
        WHERE id = ${parseInt(id)}
        RETURNING *
      `;
      if(res.rows.length > 0) {
        return NextResponse.json({message: "تم تعديل المباراة بنجــاح"});
      }
      return NextResponse.json({error: "لم تتم التعديل"});
    } catch ( error ) {
        console.log( error );
        return NextResponse.json({error: "جدث خطـأ أثناء التعديل! حـاول مجدداً"});
    }
}
export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const headers = request.headers;
    headers.get("Content-Type");
    const id = (await params).id;
    try {
        const deleteMatch = await sql `
        DELETE FROM matches WHERE id = ${parseInt(id)} RETURNING id
        `;
        if(deleteMatch.rows.length > 0) {
            return NextResponse.json({message: "تم حـذف المباراة بنجـاح"});
        }
        else {
            return NextResponse.json({error: "لم يتم حـذف المباراة!"});
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "فشل في حـذف المباراة!"});
    }
}