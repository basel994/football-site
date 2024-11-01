import { TeamType } from "@/types/teamType";

type ApiResponse = {
    error?: string;
    data?: TeamType;
};
export const teamsFetchById = async (id: string): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/teams/${id}`, {cache: "no-store"});
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "فشل في تحميـل بيانات المنتخب/الفريق!"}
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}