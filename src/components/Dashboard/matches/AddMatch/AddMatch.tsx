"use client"
import CustomModal from "@/components/CustomModal/CustomModal";
import styles from "./addMatch.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { teamsFetch } from "@/apiFetching/teams/teamsFetch";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import { championshipsFetch } from "@/apiFetching/championships/championshipsFetch";
import { addNewMatch } from "@/apiFetching/matches/addNewMatch";
import DateInput from "@/components/Form/DateInput/DateInput";

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
        getTeams();
        getChampionships()
    }, []);
    const router = useRouter();
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ team_one, setTeam_one ] = useState<string | null>(null);
    const [ team_two, setTeam_two ] = useState<string | null>(null);
    const [teams, setTeams] = useState<{key: string, value: string}[] | null>(null);
    const [championships, setChampionships] = useState<{key: string, value: string}[] | null>(null);
    const [ championship, setChampionship ] = useState<string>("");
    const [ match_date, setMatch_date ] = useState<string>(`${new Date()}`);
    const [status, setStatus] = useState<string>("لـم تبدأ بعـد");
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");
    const statusArray = [
        {key: "لـم تبدأ بعـد", value: "not_start"}, 
        {key: "الشوط الأول", value: "first"}, 
        {key: "استراحـة", value: "break"}, 
        {key: "الشوط الثـاني", value: "second"}, 
        {key: "شوط إضافي أول", value: "extra_one"}, 
        {key: "شوط إضافي ثاني", value: "extra_two"}, 
        {key: "ركلات الترجيح", value: "penalty"}, 
        {key: "انتهـت", value: "finish"}, 
        {key: "تأجلت", value: "postponed"}, 
        {key: "ألغيت", value: "cancelled"}, 
    ]
    const onAddClicked = () => {
        setVisible(true);
        setError("");
        setMessage("");
        setChampionship("");
        setMatch_date("");
        setStatus("");
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
            formData.append("status", status);
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
        <SelectInput label="اختـر الفريـق الأول" options={teams} setValue={setTeam_one}/>
        <SelectInput label="اختـر الفريـق الثـاني" options={teams} setValue={setTeam_two}/>
        <SelectInput label="اختـر البطـولــة" options={championships} setValue={setChampionship}/>
        <DateInput label="حـدد التاريخ والوقت" setValue={setMatch_date} />
        <SelectInput label="حدد حالة المباراة" options={statusArray} setValue={setStatus} />
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