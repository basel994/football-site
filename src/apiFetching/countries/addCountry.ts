type ApiResponse = {
    error?: string;
    message?: string;
}
export async function addCountry(formData: FormData): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/countries`, {
            method: "POST",
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