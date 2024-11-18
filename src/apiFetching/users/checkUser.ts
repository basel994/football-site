import { UserType } from "@/types/userType";

type ApiResponse = {
    error?: string;
    data?: UserType;
}
export async function checkUser(formData: FormData): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            body: formData,  
        });
        if(callApi.ok) {
            const response: ApiResponse = await callApi.json();
            return response;
        }
        else return {error: "فشل الاتصـال!"}
    } catch(error) {
        console.log(error);
        return {error: "حدث خطأ! حاول مجدداً"};
    }
}