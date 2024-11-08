type ApiResponse = {
    error?: string;
    message?: string;
};
export const updateStatus = async (id: number, newStatus: string): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/matches/status/${id}`, {
            method: "PATCH",
            body: JSON.stringify({status: newStatus}),
        });
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "لم يتم تحديث المباراة!"}
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}