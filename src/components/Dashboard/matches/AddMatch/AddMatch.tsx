"use client"
import CustomModal from "@/components/CustomModal/CustomModal";
import styles from "./addMatch.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import { championshipsFetch } from "@/apiFetching/championships/championshipsFetch";
import { addNewMatch } from "@/apiFetching/matches/addNewMatch";
import DateInput from "@/components/Form/DateInput/DateInput";
import { getParticipantsByChampion } from "@/apiFetching/participants/getParticipantsByChampion";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import { getCountryById } from "@/apiFetching/countries/getCountryById";
import { fetchChampionByName } from "@/apiFetching/championships/fetchChampionByName";
export default function AddMatch() {
    useEffect(() => {
        const getChampionships = async () => {
            const callAddFun = await championshipsFetch();
            if(callAddFun.error){
                setChampionships(null);
            }
            else {
                const championsMapped = callAddFun.data?.map((champion) => 
                ({key: champion.name, value: champion.name}));
                if(championsMapped)
                setChampionships(championsMapped);
            }
        }
        getChampionships();
    }, []);
    const router = useRouter();
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ team_one, setTeam_one ] = useState<string | null>(null);
    const [ team_two, setTeam_two ] = useState<string | null>(null);
    const [teams, setTeams] = useState<{key: string, value: string}[]>([]);
    const [championships, setChampionships] = useState<{key: string, value: string}[] | null>(null);
    const [ championship, setChampionship ] = useState<string>("");
    const [ match_date, setMatch_date ] = useState<string>(`${new Date()}`);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");
    useEffect(() => {
        const getTeams = async () => {
            setTeams([]);
            const getChampion = await fetchChampionByName(championship);
            if(getChampion.data) {
                const fetchParticipants = await getParticipantsByChampion(championship);
                if(fetchParticipants.data) {
                    fetchParticipants.data.map(async(participant) => {
                        if(getChampion.data?.type === "teams") {
                            const fetchTeamName = await teamsFetchById(participant.team_id);
                            if(fetchTeamName.data) {
                                const data = fetchTeamName.data;
                                setTeams(prev => [...prev, {key: data.name, value: String(participant.team_id)}])
                            }
                        }
                        else {
                            const fetchTeamName = await getCountryById(participant.team_id);
                            if(fetchTeamName.data) {
                                const data = fetchTeamName.data;
                                setTeams(prev => [...prev, {key: data.name, value: String(participant.team_id)}])
                            }
                        }
                    })
                }
            }
        }

        getTeams();

    }, [championship]);
    const onAddClicked = () => {
        setVisible(true);
        setError("");
        setMessage("");
        setChampionship("");
        setMatch_date("");
    }
    const onOk = async () => {
        if(!team_one || !team_two || !championship || !match_date) {
            setError("جميـع الحقـول مطلوبـة");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("team_one", String(team_one));
            formData.append("team_two", String(team_two));
            formData.append("championship", championship);
            formData.append("match_date", match_date);
            const callAddFun = await addNewMatch(formData);
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
        <SelectInput label="اختـر البطـولــة" options={championships} setValue={setChampionship}/>
        <SelectInput label="اختـر الفريـق الأول" options={teams} setValue={setTeam_one}/>
        <SelectInput label="اختـر الفريـق الثـاني" options={teams} setValue={setTeam_two}/>
        <DateInput label="حـدد التاريخ والوقت" setValue={setMatch_date} />
    </div>;
    console.log(match_date);
    return(
        <>
            <div className={styles.container}>
                <div className={styles.add} title="إضافة مباراة جديدة" onClick={onAddClicked}>
                    <span></span>
                </div>
            </div>
            <CustomModal visible={visible} setVisible={setVisible} 
            title="إضافـة مباراة جديدة" 
            body={modalBody} 
            onOk={onOk} 
            message={message} 
            error={error} 
            okButtonName={loading ? "جـارِ الإضافــة..." : "إضافــة"}/>
        </>
    );
}