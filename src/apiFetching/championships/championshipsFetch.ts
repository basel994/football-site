import { ChampionshipType } from "@/types/championshipType";


type ApiResponse = {
    error?: string;
    data?: ChampionshipType[] | [];
};
export const championshipsFetch = async (): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/championships`, {cache: "no-store"});
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "فشل في تحميـل البطولات!"}
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}