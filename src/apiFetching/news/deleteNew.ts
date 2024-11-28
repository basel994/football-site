type ApiResponse = {
    error?: string;
    message?: string;
};
export const deleteNew = async (id: number): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/news/${id}`, {
            method: "DELETE",
        });
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "فشل في حـذف الخبـر!"}
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}