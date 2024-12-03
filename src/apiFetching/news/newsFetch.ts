import { NewType } from "@/types/newType";

type ApiResponse = {
    error?: string;
    data?: NewType[] | [];
};
export const newsFetch = async (page?: number, limit?: number): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    let api: string;
    if(page && limit) {
        api = `${baseUrl}/api/news?page=${page}&limit=${limit}`;
    }
    else api = `${baseUrl}/api/news`;
    try {
        const apiFetch = await fetch(api, {cache: "no-store"});
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "فشل في تحميـل الأخبــار!"}
    } catch( error ) {
        console.log( error );
        return {error: "فشل الاتصــال!"}
    }
}