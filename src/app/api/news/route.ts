import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({message: "أهــلاً بكم في تطبيقنــا الرياضـــي الجديد"})
}