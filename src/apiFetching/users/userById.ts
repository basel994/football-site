import { UserType } from "@/types/userType";

type ApiResponse = {
    error?: string;
    data?: UserType;
}
export async function userById(id: number): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/auth/users/${id}`, {
            cache: "no-store", 
        });
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "فشل في تحميـل تفـاصيل المستخدم!"};
    } catch ( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"};
    }
}