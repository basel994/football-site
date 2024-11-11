"use client"
import { deleteGoal } from "@/apiFetching/goals/deleteGoal";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./matchesShow.module.css";
import { deleteYellowCard } from "@/apiFetching/yellowCards/deleteYellowCard";
import { deleteRedCard } from "@/apiFetching/redCards/deleteRedCard";

export default function EventDelete({id, event}: {id: number, event: string}) {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const deleteClicked = () => {
        setVisible(true);
        setError("");
        setMessage("");
    }
    const modalBody = <div className={styles.modalBody}>
        <p>هل تريد بالتأكيد حذف هذا الحدث؟</p>
        </div>;
    const onOk = async() => {
        setLoading(true);
        const callFun = event === "goal" ? await deleteGoal(id) : 
        (event === "yellow" ? await deleteYellowCard(id) : await deleteRedCard(id));
        if(callFun.error) {
            setLoading(false);
            setMessage("");
            setError(callFun.error);
        }
        else if(callFun.message) {
            setLoading(false);
            setError("");
            setMessage(callFun.message);
            router.refresh();
        }
    }
    return(
        <>
            <CustomButton icon="/images/controlIcons/trash.ico" clicked={deleteClicked}/>
            <CustomModal title="حذف حدث" 
            visible={visible} 
            setVisible={setVisible} 
            body={modalBody} 
            onOk={onOk}
            warning 
            error={error} 
            message={message} 
            okButtonName={loading ? "جـار الحذف" : "حذف"}/>
        </>
    );
}