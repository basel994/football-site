"use client"
import { getCountries } from "@/apiFetching/countries/getCountries";
import styles from "./teamMutation.module.css";
import { updateTeam } from "@/apiFetching/teams/updateTeam";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import FileInput from "@/components/Form/FileInput/FileInput";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import TextInput from "@/components/Form/TextInput/TextInput";
import { TeamType } from "@/types/teamType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TeamUpdate({teamObject}: {teamObject: TeamType}) {
    useEffect(() => {
        const getCountriesFun = async() => {
            const callFun = await getCountries();
            if(callFun.data) {
                callFun.data.map((countryObject) => {
                    setCountries(prev => [...prev, {key: countryObject.name, value: countryObject.id}]);
                })
            }
            else setCountries([]);
        }
        getCountriesFun();
    }, [])
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [ newName, setNewName ] = useState<string>(teamObject.name);
    const [countries, setCountries] = useState<{key: string, value: string | number}[]>([]);
    const [ newCountry, setNewCountry ] = useState<string>(String(teamObject.country));
    const [ newFounded, setNewFounded ] = useState<string>(String(teamObject.founded_at));
    const [ newCoach, setNewCoach ] = useState<string>(teamObject.coach);
    const [ newLogo, setNewLogo ] = useState<File | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const modalBody = <div className={styles.modalBody}>
        <TextInput label=" اسم الفريق " 
        type="text" 
        value={newName}
        setState={setNewName}/>
        <SelectInput label="اختر البلد" options={countries} value={newCountry} setValue={setNewCountry} />
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
            formData.append("newCountry", String(newCountry));
            formData.append("newFounded", newFounded);
            formData.append("newCoach", newCoach);
            if(newLogo) {
                formData.append("newLogo", newLogo);
            }
            const callAddFun = await updateTeam(teamObject.id, formData);
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
        setNewCountry(String(teamObject.country));
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
            title="تعديـل فريق" 
            body= {modalBody} 
            onOk={onOk} 
            okButtonName={loading ? "جـارِ التعديـل..." : "تعديـل"}
            message={message} 
            error={error} />
        </>
    );
}