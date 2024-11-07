"use client"
import CustomModal from "@/components/CustomModal/CustomModal";
import styles from "./addTeam.module.css";
import { useEffect, useState } from "react";
import TextInput from "@/components/Form/TextInput/TextInput";
import FileInput from "@/components/Form/FileInput/FileInput";
import { useRouter } from "next/navigation";
import { addNewTeam } from "@/apiFetching/teams/addNewTeam";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import { getCountries } from "@/apiFetching/countries/getCountries";

export default function AddTeam() {
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
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ name, setName ] = useState<string>("");
    const [countries, setCountries] = useState<{key: string, value: string | number}[]>([]);
    const [ country, setCountry ] = useState<number | null>(null);
    const [ founded_at, setFounded_at ] = useState<string>("");
    const [ coach, setCoach ] = useState<string>("");
    const [ logo, setLogo ] = useState<File | null>(null);
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
            formData.append("country", String(country));
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
        <TextInput label="أدخـل اسم الفريق" 
        type="text" 
        value={name}
        setState={setName}/>
        <SelectInput label="اختر البلد" options={countries} setValue={setCountry} />
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
                <div className={styles.add} title="إضافة فريق جديـد" onClick={onAddClicked}>
                    <span></span>
                </div>
            </div>
            <CustomModal visible={visible} setVisible={setVisible} 
            title="إضافـة فريق جديـد" 
            body={modalBody} 
            onOk={onOk} 
            message={message} 
            error={error} 
            okButtonName={loading ? "جـارِ الإضافــة..." : "إضافــة"}/>
        </>
    );
}