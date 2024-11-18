import { UserType } from "@/types/userType";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const last = formData.get("last") as string;
    const password = formData.get("password") as string;
    try {
        const checkUserQuery = await sql `
        SELECT * FROM users WHERE name = ${name} and last = ${last}
        `;
        if(checkUserQuery.rows.length > 0) {

            return NextResponse.json({error: "اسم المستخدم موجود "});
        }
        else {
            const insertNewUserQuery = await sql `
            INSERT INTO users (name, last, password) 
            VALUES (${name}, ${last}, ${password}) 
            RETURNING *
            `;
            if(insertNewUserQuery.rows.length > 0) {
                const userData: UserType[] = insertNewUserQuery.rows.map((user) => ({
                    id: user.id, 
                    name: user.name, 
                    last: user.last, 
                    password: user.password, 
                    role: user.role, 
                    image: user.image, 
                    created_at: user.created_at, 
                }));
                return NextResponse.json({data: userData[0]});
            }
            else return NextResponse.json({error: "فشل التسجيل! حاول مجدداً"})
        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "حدث خطأ! حاول مجدداً"});
    }
}