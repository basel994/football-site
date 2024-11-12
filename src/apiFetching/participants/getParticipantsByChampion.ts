import { ParticipantType } from "@/types/participantType";

type ApiResponse = {
    error?: string;
    data?: ParticipantType[];
}
export async function getParticipants(champion: string): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/participants/champions/${champion}`, {
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