type ApiResponse = {
    error?: string;
    message?: string;
}
export async function addParticipant(body: {champion: string, team_id: number}): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/participants`, {
            method: "POST",
            body: JSON.stringify(body),
        });
        if(callApi.ok) {
            const response: ApiResponse = await callApi.json();
            return response;
        }
        else return {error: "فشل الاتصـال!"};
    } catch(error) {
        console.log(error);
        return {error: "فشل الاتصال بالخادم!"};
    }
}