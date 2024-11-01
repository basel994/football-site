"use client"
import { updateMatch } from "@/apiFetching/matches/updateMatch";
import styles from "./matchMutation.module.css";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import TextInput from "@/components/Form/TextInput/TextInput";
import { MatchType } from "@/types/matchType";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MatchUpdate({teamObject}: {teamObject: MatchType}) {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const [ team_one, setTeam_one ] = useState<string>(teamObject.team_one);
    const [ team_two, setTeam_two ] = useState<string>(teamObject.team_two);
    const [ championship, setChampionship ] = useState<string>(teamObject.championship);
    const [ team_one_score, setTeam_one_score ] = useState<string>(String(teamObject.team_one_score));
    const [ team_two_score, setTeam_two_score ] = useState<string>(String(teamObject.team_two_score));
    const [ match_date, setMatch_date ] = useState<string>(teamObject.match_date);
    const [ match_time, setMatch_time ] = useState<string>(teamObject.match_time);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const modalBody = <div className={styles.modalBody}>
        <TextInput label=" نتيجة المنتخب/الفريق الأول " 
        type="text" 
        value={team_one_score}
        setState={setTeam_one_score}/>
        <TextInput label="نتيجة المنتخب/الفريق الثاني" 
        type="text" 
        value={team_two_score}
        setState={setTeam_two_score}/>
    </div>
    const onOk = async () => {
        if(!team_one || !team_two || !championship || !match_date || !match_time) {
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
            formData.append("match_time", match_time);
            const callAddFun = await updateMatch(String(teamObject.id), formData);
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
        setTeam_one(teamObject.team_one);
        setTeam_two(teamObject.team_two);
        setChampionship(teamObject.championship);
        setTeam_one_score(String(teamObject.team_one_score));
        setTeam_two_score(String(teamObject.team_two_score));
        setMatch_date(teamObject.match_date);
        setMatch_time(teamObject.match_time);
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