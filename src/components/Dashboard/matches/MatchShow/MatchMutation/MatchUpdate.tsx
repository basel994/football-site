"use client"
import { updateMatch } from "@/apiFetching/matches/updateMatch";
import styles from "./matchMutation.module.css";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import TextInput from "@/components/Form/TextInput/TextInput";
import { MatchType } from "@/types/matchType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import { teamsFetch } from "@/apiFetching/teams/teamsFetch";
import { championshipsFetch } from "@/apiFetching/championships/championshipsFetch";
import DateInput from "@/components/Form/DateInput/DateInput";

export default function MatchUpdate({matcObject}: {matcObject: MatchType}) {
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
    const [visible, setVisible] = useState<boolean>(false);
    const [ team_one, setTeam_one ] = useState<string>(matcObject.team_one);
    const [ team_two, setTeam_two ] = useState<string>(matcObject.team_two);
    const [teams, setTeams] = useState<{key: string, value: string}[] | null>(null);
    const [championships, setChampionships] = useState<{key: string, value: string}[] | null>(null);
    const [ championship, setChampionship ] = useState<string>(matcObject.championship);
    const [ team_one_score, setTeam_one_score ] = useState<string>(String(matcObject.team_one_score));
    const [ team_two_score, setTeam_two_score ] = useState<string>(String(matcObject.team_two_score));
    const [ match_date, setMatch_date ] = useState<string>(matcObject.match_date);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const modalBody = <div className={styles.modalBody}>
        <SelectInput label="اختـر الفريـق الأول" value={team_one} options={teams} setValue={setTeam_one}/>
        <SelectInput label="اختـر الفريـق الثـاني" value={team_two} options={teams} setValue={setTeam_two}/>
        <SelectInput label="اختـر البطـولــة" value={championship} options={championships} setValue={setChampionship}/>
        <TextInput label=" نتيجة المنتخب/الفريق الأول " 
        type="text" 
        value={team_one_score}
        setState={setTeam_one_score}/>
        <TextInput label="نتيجة المنتخب/الفريق الثاني" 
        type="text" 
        value={team_two_score}
        setState={setTeam_two_score}/>
        <DateInput label="ادخل التاريخ والوقت" value={match_date} setValue={setMatch_date} />
    </div>
    const onOk = async () => {
        if(!team_one || !team_two || !championship || !match_date) {
            setError("الرجــاء عدم ترك حقول فارغـة");
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append("team_one", team_one);
            formData.append("team_two", team_two);
            formData.append("championship", championship);
            formData.append("team_one_score", team_one_score);
            formData.append("team_two_score", team_two_score);
            formData.append("match_date", match_date);
            const callAddFun = await updateMatch(String(matcObject.id), formData);
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
        setError("");
        setMessage("");
        setTeam_one(matcObject.team_one);
        setTeam_two(matcObject.team_two);
        setChampionship(matcObject.championship);
        setTeam_one_score(String(matcObject.team_one_score));
        setTeam_two_score(String(matcObject.team_two_score));
        setMatch_date(matcObject.match_date);
    }
    return(
        <>
            <CustomButton title="تعديـل" 
            bg="rgb(8, 92, 92)" 
            color="white" 
            clicked={updateClicked}/>
            <CustomModal visible={visible} 
            setVisible={setVisible}  
            title="تعديـل منتخب/فريق" 
            body= {modalBody} 
            onOk={onOk} 
            okButtonName={loading ? "جـارِ التعديـل..." : "تعديـل"}
            message={message} 
            error={error} />
        </>
    );
}