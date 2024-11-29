import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {  
    const id = (await params).id;   
    const {newName} = await request.json();
    try {
          const res = await sql`  
          UPDATE users
          SET name = ${newName}
          WHERE id = ${parseInt(id)}  
          RETURNING * 
          `;  
          if (res.rows.length === 0) {  
            return NextResponse.json({ error: "المستخدم غـير موجود!" }, { status: 404 });  
          }  
          return NextResponse.json({ data: res.rows[0] }, { status: 200 });             
 

    } catch (error) {  
        console.error(error);  
        return NextResponse.json({ error: "فشل في تعـديل الاسم" }, { status: 500 });  
    }  
}