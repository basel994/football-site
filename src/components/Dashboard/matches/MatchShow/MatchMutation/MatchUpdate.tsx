"use client"
import { updateMatch } from "@/apiFetching/matches/updateMatch";
import styles from "./matchMutation.module.css";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import { MatchType } from "@/types/matchType";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DateInput from "@/components/Form/DateInput/DateInput";

export default function MatchUpdate({matcObject}: {matcObject: MatchType}) {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [ match_date, setMatch_date ] = useState<string>(matcObject.match_date);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const modalBody = <div className={styles.modalBody}>
        <DateInput label="حدد التاريخ والوقت" value={match_date} setValue={setMatch_date} />
    </div>
    const onOk = async () => {
        if(!match_date) {
            setError("الرجــاء عدم ترك حقول فارغـة");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("match_date", match_date);
            const callAddFun = await updateMatch(String(matcObject.id), formData);
            if(callAddFun.error) {
                setLoading(false);
                setMessage("");
                setError(callAddFun.error);
            }
            else if(callAddFun.message) {
                setLoading(false);
                setError("");
                setMessage(callAddFun.message);
                router.refresh();
            }
        }
    }
    const updateClicked = () => {
        setVisible(true);
        setError("");
        setMessage("");
        setMatch_date(matcObject.match_date);
    }
    return(
        <>
            <CustomButton title="تعديل التـاريخ" 
            bg="rgb(192, 208, 243)" 
            clicked={updateClicked}/>
            <CustomModal visible={visible} 
            setVisible={setVisible}  
            title="تعديـل تـاريخ مبـاراة" 
            body= {modalBody} 
            onOk={onOk} 
            okButtonName={loading ? "جـارِ التعديـل..." : "تعديـل"}
            message={message} 
            error={error} />
        </>
    );
}