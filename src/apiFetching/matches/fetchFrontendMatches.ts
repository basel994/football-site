import { FrontMatchType } from "@/types/frontMatchType";

type ApiResponse = {
    error?: string;
    data?: FrontMatchType[] | [];
};
export const fetchFrontendMatches = async (date?: string): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    let urlFetched = `${baseUrl}/api/matches/front`;
    if(date) {
        urlFetched = `${baseUrl}/api/matches/front?date=${date}`;
    }
    try {
        const apiFetch = await fetch(urlFetched, {cache: "no-store"});
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        else {
            return {error: "فشل في تحميـل المباريـات!"}
        }
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}