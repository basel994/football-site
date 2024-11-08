"use client"
import { deleteMatch } from "@/apiFetching/matches/deleteMatch";
import { addNewMatch } from "@/apiFetching/matchesResults/addNewMatch";
import CustomButton from "@/components/CustomButton/CustomButton";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { statusArray } from "./statusArray";
import { updateStatus } from "@/apiFetching/matches/updateStatus";
import CustomModal from "@/components/CustomModal/CustomModal";

export default function MatchStateUpdating({matchId, status}: {matchId: number, status: string}) {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [newStatus, setStatus] = useState<string>(status);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const modalBody = <div>
        <SelectInput label="حدد الحالة الجديدة" options={statusArray} setValue={setStatus} />
    </div>;
    const updateClicked = () => {
        setVisible(true);
    }
    const onOk = async() => {
        setLoading(true);
        const statusUpdate = await updateStatus(matchId, newStatus);
        if(statusUpdate.error) {
            setMessage("");
            setError(statusUpdate.error);
        }
        else {
            setError("");
            setMessage(statusUpdate.message!);
            router.refresh();
        }
    }
    return(
        <>
        <div>
            <CustomButton title={`${loading ? "جار التحديث" : "تحديث الحالة"}`} 
            bg="rgb(175, 247, 213)" 
            clicked={updateClicked}/>
        </div>
        <CustomModal title="تحديث حالـة المباراة" 
        body= {modalBody} 
        visible={visible} 
        setVisible={setVisible} 
        message={message} 
        error={error} 
        onOk={onOk} />
        </>
    );
}