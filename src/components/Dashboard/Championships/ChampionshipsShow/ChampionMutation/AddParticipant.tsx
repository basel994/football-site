"use client"
import { addParticipant } from "@/apiFetching/participants/addParticipant";
import styles from "./championMutation.module.css";
import { getCountries } from "@/apiFetching/countries/getCountries";
import { teamsFetch } from "@/apiFetching/teams/teamsFetch";
import CustomButton from "@/components/CustomButton/CustomButton";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomModal from "@/components/CustomModal/CustomModal";

export default function AddParticipant({champion}: {champion: string}) {
    const [visible, setVisible] = useState<boolean>(false);
    const [team, setTeam] = useState<string>("");
    const [teams, setTeams] = useState<{key: string, value: string}[]>([]);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoding] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        const getCountriesAndTeams = async () => {
            const countries = await getCountries();
            if(countries.data) {
                const fetchTeams = await teamsFetch();
                if(fetchTeams.data) {
                    countries.data.map(country => {
                        setTeams(prev => [...prev, {key: country.name, value: String(country.id)}]);
                    });
                    fetchTeams.data.map(team => {
                        setTeams(prev => [...prev, {key: team.name, value: String(team.id)}]);
                    })
                }
            }
            else setTeams([]);
        }
        getCountriesAndTeams();
    },[]);
    const addClicked = () => {
        setVisible(true);
    }
    const modalBody = <div className={styles.modalBody}>
        <SelectInput label="حدد منتخب/فريق" options={teams} setValue={setTeam} />
    </div>
    const onOk = async() => {
        if(!team) {
            setError("الرجاء تحديد منتخب/فريق!");
        }
        else {
            setLoding(true);
            const body = {champion: champion, team_id: parseInt(team)};
            const participantAdd = await addParticipant(body);
            if(participantAdd.error) {
                setLoding(false);
                setMessage("");
                setError(participantAdd.error);
            }
            else if(participantAdd.message) {
                setLoding(false);
                setError("");
                setMessage(participantAdd.message);
                router.refresh();
            }
        }
    }
    return(
        <>
            <CustomButton icon="/images/controlIcons/add.ico" clicked={addClicked} />
            <CustomModal title="إضافة مشارك للبطولة" 
            visible={visible} 
            setVisible={setVisible} 
            body={modalBody} 
            onOk={onOk} 
            okButtonName={loading ? "جـار الإضافة" : "إضافة"} 
            message={message} 
            error={error} />
        </>
    );
}