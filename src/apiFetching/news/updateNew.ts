type ApiResponse = {
    error?: string;
    message?: string;
};
export const updateNew = async (id: number, formData: FormData): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/news/${id}`, {
            method: "PATCH",
            body: formData,
        });
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "لم يتم تعـديل الخبـر!"}
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}