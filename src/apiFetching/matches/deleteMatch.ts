type ApiResponse = {
    error?: string;
    message?: string;
};
export const deleteMatch = async (id: string): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/matches/${id}`, {
            method: "DELETE",
        });
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "فشل في حـذف المباراة!"}
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}