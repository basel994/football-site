import { FrontPlayerType } from "@/types/frontPlayerType";

type ApiResponse = {
    error?: string;
    data?: FrontPlayerType[] | [];
};
export const fetchFrontendPlayers = async (player?: string): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const urlFetched = `${baseUrl}/api/players/front?player=${player}`;
    try {
        if(player) {
            const apiFetch = await fetch(urlFetched, {cache: "no-store"});
            if(apiFetch.ok) {
                const response: ApiResponse = await apiFetch.json();
                return response;
            }
            else {
                return {error: "فشل في تحميـل اللاعبين!"}
            }
        }
        else return {data: []};
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}