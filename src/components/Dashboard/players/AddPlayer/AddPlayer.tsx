"use client"
import CustomModal from "@/components/CustomModal/CustomModal";
import styles from "./addPlayer.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { teamsFetch } from "@/apiFetching/teams/teamsFetch";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import { getCountries } from "@/apiFetching/countries/getCountries";
import { addPlayer } from "@/apiFetching/players/addPlayer";
import TextInput from "@/components/Form/TextInput/TextInput";
import FileInput from "@/components/Form/FileInput/FileInput";
export default function AddMatch() {
    useEffect(() => {
        const getTeams = async () => {
            const callAddFun = await teamsFetch();
            if(callAddFun.error){
                setTeams(null);
            }
            else {
                const teamsMapped = callAddFun.data?.map((team) => 
                ({key: team.name, value: String(team.id)}));
                if(teamsMapped)
                setTeams(teamsMapped);
            }
        }
        const getAllCountries = async () => {
            const callAddFun = await getCountries();
            if(callAddFun.error){
                setCountries(null);
            }
            else {
                const countriesMapped = callAddFun.data?.map((country) => 
                ({key: country.name, value: country.id}));
                if(countriesMapped)
                setCountries(countriesMapped);
            }
        }
        getTeams();
        getAllCountries()
    }, []);
    const router = useRouter();
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ country, setCountry ] = useState<string | null>(null);
    const [countries, setCountries] = useState<{key: string, value: string|number}[] | null>(null);
    const [ team, setTeam ] = useState<string | null>(null);
    const [teams, setTeams] = useState<{key: string, value: string|number}[] | null>(null);
    const [ name, setName ] = useState<string>("");
    const [ age, setAge ] = useState<string>("");
    const [ role, setRole ] = useState<string>("");
    const [ image, setImage ] = useState<File>();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");

    const onAddClicked = () => {
        setVisible(true);
        setError("");
        setMessage("");
        setName("");
        setAge("");
        setRole("");
    }
    const onOk = async () => {
        if(!team || !country || !name || !age || !role || !image) {
            setError("جميـع الحقـول مطلوبـة");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("age", age);
            formData.append("role", role);
            formData.append("team", team);
            formData.append("country", country);
            formData.append("image", image)
            const callAddFun = await addPlayer(formData);
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
        <SelectInput label="اختـر البلد " options={countries} setValue={setCountry}/>
        <SelectInput label="اختـر الفريـق " options={teams} setValue={setTeam}/>
        <TextInput label="أدخل اسم اللاعب" type="text" value={name} setState={setName} />
        <TextInput label="أدخل عمر اللاعب" type="text" value={age} setState={setAge} />
        <TextInput label="أدخل مركز اللاعب" type="text" value={role} setState={setRole} />
        <FileInput label="تحميل صورة للاعب" setState={setImage} />
    </div>;
    return(
        <>
            <div className={styles.container}>
                <div className={styles.add} title="إضافة لاعب جديدة" onClick={onAddClicked}>
                    <span></span>
                </div>
            </div>
            <CustomModal visible={visible} setVisible={setVisible} 
            title="إضافـة لاعب جديدة" 
            body={modalBody} 
            onOk={onOk} 
            message={message} 
            error={error} 
            okButtonName={loading ? "جـارِ الإضافــة..." : "إضافــة"}/>
        </>
    );
}