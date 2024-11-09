import { YellowCardsType } from "@/types/yellowCard";

type ApiResponse = {
    error?: string;
    data?: YellowCardsType[];
}
export async function getYellowCards(): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/yellowCards`, {
            cache: "no-store", 
        });
        if(callApi.ok) {
            const apiResponse: ApiResponse = await callApi.json();
            return apiResponse;
        }
        else {
            return({error: "فشل الاتصــال!"});
        }
    } catch(error) {
        console.log(error);
        return {error: "فشل الاتصال بالخادم!"};
    }
}