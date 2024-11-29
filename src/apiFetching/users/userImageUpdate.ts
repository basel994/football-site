import { UserType } from "@/types/userType";

type ApiResponse = {
    error?: string;
    data?: UserType;
};
export const userImageupdate = async (id: number, formData: FormData): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/auth/users/${id}/image`, {
            method: "PATCH",
            body: formData,
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