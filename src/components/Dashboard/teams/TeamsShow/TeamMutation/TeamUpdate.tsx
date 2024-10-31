"use client"
import styles from "./teamMutation.module.css";
import { updateChampionship } from "@/apiFetching/championships/updateChampionship";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import FileInput from "@/components/Form/FileInput/FileInput";
import TextInput from "@/components/Form/TextInput/TextInput";
import { TeamType } from "@/types/teamType";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TeamUpdate({teamObject}: {teamObject: TeamType}) {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [ newName, setNewName ] = useState<string>(teamObject.name);
    const [ newCountry, setNewCountry ] = useState<string>(teamObject.country);
    const [ newFounded, setNewFounded ] = useState<string>(String(teamObject.founded_at));
    const [ newCoach, setNewCoach ] = useState<string>(teamObject.coach);
    const [ newLogo, setNewLogo ] = useState<File | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const modalBody = <div className={styles.modalBody}>
        <TextInput label=" اسم المنتخب/الفريق " 
        type="text" 
        value={newName}
        setState={setNewName}/>
        <TextInput label="البلد" 
        type="text" 
        value={newCountry}
        setState={setNewCountry}/>
        <TextInput label="سنة التأسيس" 
        type="text" 
        value={newFounded}
        setState={setNewFounded}/>
        <TextInput label="المدرب" 
        type="text" 
        value={newCoach}
        setState={setNewCoach}/>
        <FileInput label="تغييـر الشعـار" 
        icon="/images/dashboard/championship/uploadpicture.ico" 
        setState={setNewLogo}/>
    </div>
    const onOk = async () => {
        if(!newName || !newCountry || !newFounded || !newCoach) {
            setError("الرجــاء عدم ترك حقول فارغـة");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("newName", newName);
            formData.append("newCountry", newCountry);
            formData.append("newFounded", newFounded);
            formData.append("newCoach", newCoach);
            if(newLogo) {
                formData.append("newLogo", newLogo);
            }
            const callAddFun = await updateChampionship(String(teamObject.id), formData);
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
        setNewName(teamObject.name);
        setNewCountry(teamObject.country);
        setNewFounded(String(teamObject.founded_at));
        setNewCoach(teamObject.coach);
        setNewLogo(null);
        setError("");
        setMessage("");
    }
    return(
        <>
            <CustomButton title="تعديـل" 
            bg="rgb(8, 92, 92)" 
            color="white" 
            clicked={updateClicked}/>
            <CustomModal visible={visible} 
            setVisible={setVisible}  
            title="تعديـل منتخب/فريق" 
            body= {modalBody} 
            onOk={onOk} 
            okButtonName={loading ? "جـارِ التعديـل..." : "تعديـل"}
            message={message} 
            error={error} />
        </>
    );
}