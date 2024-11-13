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
import { ChampionshipType } from "@/types/championshipType";

export default function AddParticipant({champion}: {champion: ChampionshipType}) {
    const [visible, setVisible] = useState<boolean>(false);
    const [team, setTeam] = useState<string>("");
    const [teams, setTeams] = useState<{key: string, value: string}[]>([]);
    const [countries, setCountries] = useState<{key: string, value: string}[]>([]);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoding] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        const countriesGet = async () => {
            const countries = await getCountries();
            if(countries.data) {
                countries.data.map(country => {
                    setCountries(prev => [...prev, {key: country.name, value: String(country.id)}]);
                });
            }
                }
        const getTeams = async () => {
                const fetchTeams = await teamsFetch();
                if(fetchTeams.data) {
                    fetchTeams.data.map(team => {
                        setTeams(prev => [...prev, {key: team.name, value: String(team.id)}]);
                    });
                }
            }
        countriesGet();
        getTeams();
    },[]);
    const addClicked = () => {
        setVisible(true);
    }
    const modalBody = <div className={styles.modalBody}>
        {
            champion.type === "countries" && <SelectInput label="حدد منتخـب" options={countries} setValue={setTeam} />
        }
        {
            champion.type === "teams" && <SelectInput label="حدد فريق" options={teams} setValue={setTeam} />
        }
    </div>
    const onOk = async() => {
        if(!team) {
            setError("الرجاء تحديد منتخب/فريق!");
        }
        else {
            setLoding(true);
            const body = {champion: champion.name, team_id: parseInt(team)};
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
            <div className={styles.add}>
                <CustomButton icon="/images/controlIcons/add.ico" clicked={addClicked} />
            </div>
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