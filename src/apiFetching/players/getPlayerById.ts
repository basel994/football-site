import { PlayerType } from "@/types/playerType";

type ApiResponse = {
    error?: string;
    data?: PlayerType;
}
export async function getPlayerById(id: number): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/players/${id}`, {
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