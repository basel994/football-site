import { UserType } from "@/types/userType";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    try {
        const checkUserQuery = await sql `
        SELECT * FROM users WHERE name = ${name} and password = ${password}
        `;
        if(checkUserQuery.rows.length > 0) {
            const userData: UserType[] = checkUserQuery.rows.map(user => ({
                id: user.id, 
                name: user.name, 
                password: user.password, 
                role: user.role, 
                image: user.image, 
                created_at: user.created_at, 
            }));
            return NextResponse.json({data: userData[0]});
        }
        else return NextResponse.json({error: "خطأ في اسم المستخدم أو كلمة المرور!"});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "حدث خطأ! حاول مجدداً"});
    }
}