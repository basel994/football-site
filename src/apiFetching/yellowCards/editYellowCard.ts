type ApiResponse = {
    error?: string;
    message?: string;
}
export async function editYellowCard(id: number, body: {player_id: number, minute: number}): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/yellowCards/${id}`, {
            method: "PATCH",
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