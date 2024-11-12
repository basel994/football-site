"use client"
import { deleteParticipant } from "@/apiFetching/participants/deleteParticipant";
import styles from "./championMutation.module.css";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteParticipant({id}: {id: number}) {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const modalBody = <div className={styles.modalBody}>
        <p>هل تريد بالتأكيد إزالة المنتخب/الفريق من البطولة؟</p>
    </div>;
    const onOk = async() => {
        const callFun = await deleteParticipant(id);
        if(callFun.error) {
            setMessage("");
            setError(callFun.error);
        }
        else if(callFun.message) {
            setError("");
            setMessage(callFun.message);
            router.refresh();
        }
    }
    const deleteClicked = () => {
        setVisible(true);
    }
    return(
        <>
        <CustomButton title="إزالـة" bg="rgb(247, 195, 195)" clicked={deleteClicked} />
        <CustomModal visible={visible} 
        setVisible={setVisible} 
        title="حذف مشاركة" 
        body={modalBody} 
        onOk={onOk} 
        warning 
        message={message} 
        error={error} />
        </>
    );
}