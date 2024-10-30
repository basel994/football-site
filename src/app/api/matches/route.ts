import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");
    if(date) {
        try {
            const getDatedMatchesQuery = await sql `
            SELECT * FROM matches WHERE match_date::date = ${date} 
            `;
            return NextResponse.json(getDatedMatchesQuery.rows);
        } catch(error) {
            return NextResponse.json({error: "حدث خطأ! حـاول مجددا"})
        }
    }
    else {
        try {
            const getMatchesQuery = await sql `
            SELECT * FROM matches 
            `;
            return NextResponse.json(getMatchesQuery.rows);
        } catch(error) {
            return NextResponse.json({error: "حدث خطأ! حـاول مجددا"})
        }
    }
}