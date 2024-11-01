type ApiResponse = {
    error?: string;
    message?: string;
};
export const addNewMatch = async (formData: FormData): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/matches`, {
            method: 'POST',
            body: formData,
        });
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "فشل في إضافـة مباراة جديدة!"}
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}