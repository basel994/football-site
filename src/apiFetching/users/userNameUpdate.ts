import { UserType } from "@/types/userType";

type ApiResponse = {
    error?: string;
    data?: UserType;
};
export const userNameupdate = async (id: number, newName: string): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/auth/users/${id}/name`, {
            method: "PATCH",
            body: JSON.stringify({newName}),
        });
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "لم يتم التعديل !"}
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}