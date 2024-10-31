import { MatchType } from "@/types/matchType";

type ApiResponse = {
    error?: string;
    data?: MatchType[] | [];
};
export const matchesFetch = async (date?: string, time?: string): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    let urlFetched = `${baseUrl}/api/matches`;
    if(date && !time) {
        urlFetched = `${baseUrl}/api/matches?date=${date}`;
    }
    else if(date && time) {
        urlFetched = `${baseUrl}/api/matches?date=${date}&time=${time}`;
    }
    try {
        const apiFetch = await fetch(urlFetched, {cache: "no-store"});
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "فشل في تحميـل المباريـات!"}
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}