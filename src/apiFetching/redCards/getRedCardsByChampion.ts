import { RedCardsType } from "@/types/redCardsType";

type ApiResponse = {
    error?: string;
    data?: RedCardsType[];
}
export async function getRedCardsByChampion(champion: string): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/redCards/champion/${champion}`, {
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