import { ChampionshipType } from "@/types/championshipType";


type ApiResponse = {
    error?: string;
    data?: ChampionshipType;
};
export const fetchChampionByName = async (name: string): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/championships/champion/${name}`, {cache: "no-store"});
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "فشل في تحميـل البطولـة!"}
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}