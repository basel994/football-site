"use client"
import CustomModal from "@/components/CustomModal/CustomModal";
import styles from "./addChampion.module.css";
import { useState } from "react";
import TextInput from "@/components/Form/TextInput/TextInput";
import FileInput from "@/components/Form/FileInput/FileInput";
import { addNewChampionship } from "@/apiFetching/championships/addNewChampionship";
import { useRouter } from "next/navigation";
import SelectInput from "@/components/Form/SelectInput/SelectInput";

export default function AddChampion() {
    const router = useRouter();
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ name, setName ] = useState<string>("");
    const [ logo, setLogo ] = useState<File | null>();
    const [type, setType] = useState<string>("");
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
        if(!name || !logo) {
            setError("جميـع الحقـول مطلوبـة");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("logo", logo);
            formData.append("type", type);
            const callAddFun = await addNewChampionship(formData);
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
    const types = [
        {key: "منتخبات", value: "countries"}, 
        {key: "فرق", value: "teams"}, 
    ];
    const modalBody = <div className={styles.modalBody}>
        <TextInput label="أدخـل اسم البطولــة" 
        type="text" 
        value={name}
        setState={setName}/>
        <SelectInput label="اختـر نوع المشاركين في البطولـة" options={types} setValue={setType} />
        <FileInput label="تحميـل الشعـار" 
        icon="/images/dashboard/championship/uploadpicture.ico" 
        setState={setLogo}/>
    </div>
    return(
        <>
            <div className={styles.container}>
                <div className={styles.add} title="إضافة بطولـة جديـدة" onClick={onAddClicked}>
                    <span></span>
                </div>
            </div>
            <CustomModal visible={visible} setVisible={setVisible} 
            title="إضافـة بطولــة جديـدة" 
            body={modalBody} 
            onOk={onOk} 
            message={message} 
            error={error} 
            okButtonName={loading ? "جـارِ الإضافــة..." : "إضافــة"}/>
        </>
    );
}