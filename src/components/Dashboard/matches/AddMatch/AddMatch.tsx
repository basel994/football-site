"use client"
import CustomModal from "@/components/CustomModal/CustomModal";
import styles from "./addMatch.module.css";
import { useEffect, useState } from "react";
import TextInput from "@/components/Form/TextInput/TextInput";
import { useRouter } from "next/navigation";
import { addNewTeam } from "@/apiFetching/teams/addNewTeam";
import { teamsFetch } from "@/apiFetching/teams/teamsFetch";
import SelectInput from "@/components/Form/SelectInput/SelectInput";

export default function AddMatch() {
    useEffect(() => {
        const getTeams = async () => {
            const callAddFun = await teamsFetch();
            if(callAddFun.error){
                console.log("callAddFun.error");
                setTeams([{key:"غير معروف",value:""}]);
            }
            else
{            const teamsMapped = callAddFun.data?.map((team) => 
            ({key: team.name, value: String(team.id)})
                );
                if(teamsMapped)
                setTeams(teamsMapped);}
        }
        getTeams();
    }, []);
    const router = useRouter();
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ team_one, setTeam_one ] = useState<string>("");
    const [ team_two, setTeam_two ] = useState<string>("");
    const [teams, setTeams] = useState<{key: string, value: string}[]>([{key:"team.name",value:"String(team.id)"}])
    const [ championship, setChampionship ] = useState<string>("");
    const [ team_one_score, setTeam_one_score ] = useState<string>("");
    const [ team_two_score, setTeam_two_score ] = useState<string>("");
    const [ match_date, setMatch_date ] = useState<string>("");
    const [ match_time, setMatch_time ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");
    const onAddClicked = () => {
        setVisible(true);
        setError("");
        setMessage("");
        setTeam_one("");
        setTeam_two("");
        setChampionship("");
        setMatch_date("");
        setMatch_time("");
    }
    const onOk = async () => {
        if(!team_one || !team_two || !championship || !match_date || !match_time) {
            setError("جميـع الحقـول مطلوبـة");
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
            formData.append("match_time", match_time);
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
        <SelectInput options={teams?teams:null}/>
        <TextInput label=" نتيجة المنتخب/الفريق الأول " 
        type="text" 
        value={team_one_score}
        setState={setTeam_one_score}/>
        <TextInput label="نتيجة المنتخب/الفريق الثاني" 
        type="text" 
        value={team_two_score}
        setState={setTeam_two_score}/>
    </div>;
    console.log(teams);
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