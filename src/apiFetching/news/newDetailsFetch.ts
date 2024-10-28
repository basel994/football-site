import { NewType } from "@/types/newType";

type ApiResponse = {
    error?: string;
    data?: NewType;
}
export async function newDetailsFetch(id: string): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/news/${id}`, {
            next: {
                revalidate: 3600,
            }
        });
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "فشل في تحميـل تفـاصيل الخبـر!"};
    } catch ( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"};
    }
}