type ApiResponse = {
    error?: string;
    message?: string;
}
export async function editCountry(id: number, formData: FormData): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/countries/${id}`, {
            method: "PATCH",
            body: formData,
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