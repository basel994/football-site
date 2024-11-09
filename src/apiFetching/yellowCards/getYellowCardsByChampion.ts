import { YellowCardsType } from "@/types/yellowCard";

type ApiResponse = {
    error?: string;
    data?: YellowCardsType[];
}
export async function getYellowCardsByChampion(champion: string): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/yellowCards/champion/${champion}`, {
            cache: "no-store",
        });
        if(callApi.ok) {
            const response: ApiResponse = await callApi.json();
            return response ;
        }
        else {
            return {error: "فشل الاتصـال!"};
        }
    } catch(error) {
        console.log(error);
        return {error: "فشل الاتصال بالخادم!"};
    }
}