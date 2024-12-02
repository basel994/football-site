"use client"
import CustomModal from "@/components/CustomModal/CustomModal";
import styles from "./playerMutation.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { teamsFetch } from "@/apiFetching/teams/teamsFetch";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import { getCountries } from "@/apiFetching/countries/getCountries";
import TextInput from "@/components/Form/TextInput/TextInput";
import FileInput from "@/components/Form/FileInput/FileInput";
import { PlayerType } from "@/types/playerType";
import { editPlayer } from "@/apiFetching/players/editPlayer";
import CustomButton from "@/components/CustomButton/CustomButton";
export default function PlayerUpdate({playerObject}: {playerObject: PlayerType}) {
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
    const [ country, setCountry ] = useState<string >(String(playerObject.country));
    const [countries, setCountries] = useState<{key: string, value: string|number}[] | null>(null);
    const [ team, setTeam ] = useState<string>(String(playerObject.team));
    const [teams, setTeams] = useState<{key: string, value: string|number}[] | null>(null);
    const [ name, setName ] = useState<string>(playerObject.name);
    const [ age, setAge ] = useState<string>(String(playerObject.age));
    const [ role, setRole ] = useState<string>(playerObject.role);
    const [ image, setImage ] = useState<File | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");

    const updateClicked = () => {
        setVisible(true);
        setError("");
        setMessage("");
        setName(playerObject.name);
        setAge(String(playerObject.age));
        setRole(playerObject.role);
        setCountry(String(playerObject.country));
        setTeam(String(playerObject.team));
    }
    const onOk = async () => {
        if(!team || !country || !name || !age || !role) {
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
            if(image){
                formData.append("image", image)
            }
            const callAddFun = await editPlayer(playerObject.id,formData);
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
        <SelectInput label="اختـر البلد " options={countries} value={country} setValue={setCountry}/>
        <SelectInput label="اختـر الفريـق " options={teams} value={team} setValue={setTeam}/>
        <TextInput label="أدخل اسم اللاعب" type="text" value={name} setState={setName} />
        <TextInput label="أدخل عمر اللاعب" type="text" value={age} setState={setAge} />
        <TextInput label="أدخل مركز اللاعب" type="text" value={role} setState={setRole} />
        <FileInput label="تحميل صورة للاعب" setState={setImage} />
    </div>;
    return(
        <>
            <CustomButton title="تعديـل" 
            bg="rgb(192, 208, 243)" 
            clicked={updateClicked}/>
            <CustomModal visible={visible} 
            setVisible={setVisible}  
            title="تعديـل لاعـب" 
            body= {modalBody} 
            onOk={onOk} 
            okButtonName={loading ? "جـارِ التعديـل..." : "تعديـل"}
            message={message} 
            error={error} />
        </>
    );
}