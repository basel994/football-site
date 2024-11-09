import { GoalType } from "@/types/goalType";

type ApiResponse = {
    error?: string;
    data?: GoalType[];
}
export async function getGoal(): Promise<ApiResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const callApi = await fetch(`${baseUrl}/api/goals`, {
            cache: "no-store", 
        });
        if(callApi.ok) {
            const apiResponse: ApiResponse = await callApi.json();
            return apiResponse;
        }
        else {
            return({error: "فشل الاتصــال!"});
        }
    } catch(error) {
        console.log(error);
        return {error: "فشل الاتصال بالخادم!"};
    }
}