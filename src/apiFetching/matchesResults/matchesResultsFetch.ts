import { MatchType } from "@/types/matchType";

type ApiResponse = {
    error?: string;
    data?: MatchType[] | [];
};
export const matchesResultsFetch = async (date?: string): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    let urlFetched = `${baseUrl}/api/matchesResults`;
    if(date) {
        urlFetched = `${baseUrl}/api/matchesResults?date=${date}`;
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