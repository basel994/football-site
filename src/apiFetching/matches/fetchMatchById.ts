import { MatchType } from "@/types/matchType";

type ApiResponse = {
    error?: string;
    data?: MatchType;
};
export const matchFetcById = async (id: number): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/matches/${id}`, {cache: "no-store"});
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "فشل في تحميـل المباراة!"}
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}