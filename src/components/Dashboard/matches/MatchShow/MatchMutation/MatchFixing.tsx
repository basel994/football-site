"use client"
import { deleteMatch } from "@/apiFetching/matches/deleteMatch";
import { addNewMatch } from "@/apiFetching/matchesResults/addNewMatch";
import CustomButton from "@/components/CustomButton/CustomButton";
import { MatchType } from "@/types/matchType";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MatchFixing({matchObject}: {matchObject: MatchType}) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const fixClicked = async() => {
        setLoading(true);
        const formData = new FormData();
        formData.append("team_one", String(matchObject.team_one));
        formData.append("team_two", String(matchObject.team_two));
        formData.append("championship", matchObject.championship);
        formData.append("match_date", matchObject.match_date);
        const fixMatch = await addNewMatch(formData);
        if(!fixMatch.error) {
            const matchDelete = await deleteMatch(String(matchObject.id));
            if(matchDelete.error) {
                setError("حاول مجددا")
            }
            else {
                router.refresh();
            }
        }
        else {
            setError("حاول مجددا");
        }
    }
    return(
        <div>
            <CustomButton title={`${loading ? "جار التحديث" : "تحديث الحالة"}`} 
            bg="rgb(175, 247, 213)" 
            clicked={fixClicked}/>
            <p>{error}</p>
        </div>
    );
}