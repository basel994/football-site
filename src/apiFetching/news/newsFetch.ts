import { NewType } from "@/types/newType";

type ApiResponse = {
    error?: string;
    data?: NewType[] | [];
};
export const newsFetch = async (): Promise<ApiResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    try {
        const apiFetch = await fetch(`${baseUrl}/api/news`, {cache: "no-store"});
        if(apiFetch.ok) {
            const response: ApiResponse = await apiFetch.json();
            return response;
        }
        return {error: "فشل الاتصال بالخادم!"}
    } catch( error ) {
        console.log( error );
        return {error: "حصل خطأ غير متوقع"}
    }
}