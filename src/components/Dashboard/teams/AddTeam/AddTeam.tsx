"use client"
import CustomModal from "@/components/CustomModal/CustomModal";
import styles from "./addTeam.module.css";
import { useState } from "react";
import TextInput from "@/components/Form/TextInput/TextInput";
import FileInput from "@/components/Form/FileInput/FileInput";
import { useRouter } from "next/navigation";
import { addNewTeam } from "@/apiFetching/teams/addNewTeam";

export default function AddTeam() {
    const router = useRouter();
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ name, setName ] = useState<string>("");
    const [ country, setCountry ] = useState<string>("");
    const [ founded_at, setFounded_at ] = useState<string>("");
    const [ coach, setCoach ] = useState<string>("");
    const [ logo, setLogo ] = useState<File | null>();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");
    const onAddClicked = () => {
        setVisible(true);
        setError("");
        setMessage("");
        setName("");
        setLogo(null);
    }
    const onOk = async () => {
        if(!name || !logo || !founded_at || !coach || !country) {
            setError("جميـع الحقـول مطلوبـة");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("country", country);
            formData.append("founded_at", founded_at);
            formData.append("coach", coach);
            formData.append("logo", logo);
            const callAddFun = await addNewTeam(formData);
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
    const modalBody = <div className={styles.modalBody}>
        <TextInput label="أدخـل اسم المنتخب/الفريق" 
        type="text" 
        value={name}
        setState={setName}/>
        <TextInput label="أدخـل البلد" 
        type="text" 
        value={country}
        setState={setCountry}/>
        <TextInput label="أدخـل سنة التأسيس" 
        type="text" 
        value={founded_at}
        setState={setFounded_at}/>
        <TextInput label="أدخـل اسم المدرب" 
        type="text" 
        value={coach}
        setState={setCoach}/>
        <FileInput label="تحميـل الشعـار" 
        icon="/images/dashboard/championship/uploadpicture.ico" 
        setState={setLogo}/>
    </div>
    return(
        <>
            <div className={styles.container}>
                <div className={styles.add} title="إضافة منتخب/فريق جديـد" onClick={onAddClicked}>
                    <span></span>
                </div>
            </div>
            <CustomModal visible={visible} setVisible={setVisible} 
            title="إضافـة منتخب/فريق جديـد" 
            body={modalBody} 
            onOk={onOk} 
            message={message} 
            error={error} 
            okButtonName={loading ? "جـارِ الإضافــة..." : "إضافــة"}/>
        </>
    );
}