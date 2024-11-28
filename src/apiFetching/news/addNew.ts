type ApiResponse = {
    error?: string;
    message?: string;
};
export const addNew = async (formData: FormData): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/news`, {
            method: 'POST',
            body: formData,
        });
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "فشل في إضافـة الخبـر!"}
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}