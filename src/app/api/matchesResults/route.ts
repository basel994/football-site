import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");
    if(date) {
        try {
            const getDatedMatchesQuery = await sql `
            SELECT * FROM matchesResults WHERE match_date::date = ${date} 
            `;
            return NextResponse.json({data: getDatedMatchesQuery.rows});
        } catch(error) {
            console.log(error);
            return NextResponse.json({error: "حدث خطأ في التاريخ! حـاول مجددا"})
        }
    }
    else {
        try {
            const getMatchesQuery = await sql `
            SELECT * FROM matchesResults 
            `;
            return NextResponse.json({data: getMatchesQuery.rows});
        } catch(error) {
            console.log(error);
            return NextResponse.json({error: "حدث خطأ! حـاول مجددا"})
        }
    }
}
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const team_one = formData.get("team_one") as string;
    const team_two = formData.get("team_two") as string;
    const championship = formData.get("championship") as string;
    const team_one_score = formData.get("team_one_score") as string;
    const team_two_score = formData.get("team_two_score") as string;
    const match_date = formData.get("match_date") as string;
    try {
        const res = await sql`  
        INSERT INTO matchesResults(team_one, team_two, championship, team_one_score, team_two_score, match_date)   
        VALUES (${parseInt(team_one)}, ${parseInt(team_two)}, ${championship}, ${team_one_score}, ${team_two_score}, ${match_date})  
        RETURNING id;  
      `;
      if(res.rows.length > 0) {
        return NextResponse.json({message: "تم إضافة مباراة جديدة بنجــاح"});
      }
      return NextResponse.json({error: "لم تتم الإضافــة"});
    } catch ( error ) {
        console.log( error );
        return NextResponse.json({error: "جدث خطـأ أثناء الإضافة! حـاول مجدداً"});
    }
}