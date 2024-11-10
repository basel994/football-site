type ApiResponse = {
    error?: string;
    message?: string;
}
export async function addRedCard(body: {champion: string, match_id: number, team_id: number, player_id: number, minute: number}): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/redCards`, {
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