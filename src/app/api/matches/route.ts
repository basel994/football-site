import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    if(date && !time) {
        try {
            const getDatedMatchesQuery = await sql `
            SELECT * FROM matches WHERE match_date::date = ${date} 
            `;
            return NextResponse.json({data: getDatedMatchesQuery.rows});
        } catch(error) {
            console.log(error);
            return NextResponse.json({error: "حدث خطأ في التاريخ! حـاول مجددا"})
        }
    }
    else if(date && time) {
        try {
            const getDatedMatchesQuery = await sql `
            SELECT * FROM matches WHERE match_date::date = ${date} 
            AND TO_CHAR(match_time, 'HH24:MI') = ${time}
            `;
            return NextResponse.json({data: getDatedMatchesQuery.rows});
        } catch(error) {
            console.log(error);
            return NextResponse.json({error: "حدث خطأ في التاريخ او الوقت! حـاول مجددا"})
        }
    }
    else {
        try {
            const getMatchesQuery = await sql `
            SELECT * FROM matches 
            `;
            return NextResponse.json({data: getMatchesQuery.rows});
        } catch(error) {
            console.log(error);
            return NextResponse.json({error: "حدث خطأ! حـاول مجددا"})
        }
    }
}