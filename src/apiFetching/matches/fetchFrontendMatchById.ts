import { FrontMatchType } from "@/types/frontMatchType";

type ApiResponse = {
    error?: string;
    data?: FrontMatchType[] | [];
};
export const fetchFrontendMatchById = async (id: number): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const urlFetched = `${baseUrl}/api/matches/front/${id}`;
    try {
        const apiFetch = await fetch(urlFetched, {cache: "no-store"});
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        else {
            return {error: "فشل في تحميـل بيانـات المباراة!"}
        }
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}