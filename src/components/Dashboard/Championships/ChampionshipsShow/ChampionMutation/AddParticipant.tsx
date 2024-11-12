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
    const [status, setSttus] = useState<string>("");
    const [type, setType] = useState<{key: string, value: string}[]>([
    { key: "منتخبـات", value: "countries"}, 
    {key: "فـرق", value: "teams"}, 
    ]);
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
        <SelectInput label="حدد نوع المشاركون" options={type} setValue={setSttus} />
        {
            status === "countries" && <SelectInput label="حدد منتخـب" options={countries} setValue={setTeam} />
        }
        {
            status === "teams" && <SelectInput label="حدد فريق" options={teams} setValue={setTeam} />
        }
    </div>
    const onOk = async() => {
        if(!team) {
            setError("الرجاء تحديد منتخب/فريق!");
        }
        else {
            setLoding(true);
            const body = {champion: champion, team_id: parseInt(team), type: status};
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