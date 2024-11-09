"use client"
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import TextInput from "@/components/Form/TextInput/TextInput";
import { useEffect, useState } from "react";
import styles from "./matchMutation.module.css";
import { getPlayersByTeam } from "@/apiFetching/players/getPlayersByTeam";
import { addGoal } from "@/apiFetching/goals/addGoal";
import { addRedCard } from "@/apiFetching/redCards/addRedCard";
import { addYellowCard } from "@/apiFetching/yellowCards/addYellowCard";
import { useRouter } from "next/navigation";

export default function AddEvent({
    team_one,
    team_two,
    champion, 
    match, 
}: {
    team_one: number;
    team_two: number;
    champion: string;
    match: number;
}) {
    useEffect( () => {
        const getTeamName = async (id: number) => {
            const callFun = await teamsFetchById(id);
            if(callFun.data) {
                return callFun.data.name;
            }
            else return null
        }
        const fetchTeam_one = async () => {
            const first = await getTeamName(team_one);
            if(first) {
                setTeams(prev => [...prev,{key: first, value: String(team_one)}]);
            }
        }
        const fetchTeam_two = async () => {
            const second = await getTeamName(team_two);
            if(second) {
                setTeams(prev => [...prev,{key: second, value: String(team_two)}]);
            }
        }
        fetchTeam_one();
        fetchTeam_two();
    }, [] );

    const addEventClicked = () => {
        setVisible(true);
    }
    const router = useRouter();
    const [teams, setTeams] = useState<{key: string, value: string}[]>([]);
    const [team, setTeam] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [event, setEvent ] = useState<string>("");
    const [eventTime, setEventTime] = useState<string>("");
    const [players, setPlayers] = useState<{key: string, value: string}[]>([]);
    const [player, setPlayer] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    useEffect(() => {
        const playersByTeam = async() => {
            const callFun = await getPlayersByTeam(parseInt(team));
            if(callFun.data) {
                callFun.data.map((playerObject) => {
                    setPlayers(prev => [...prev, {key: playerObject.name, value: String(playerObject.id)}]);
                })
            }
            else setPlayers([]);
        }
    },[team]);
    const events = [
        {key: "أهـداف", value: "goal"}, 
        {key: "كـروت صفـراء", value: "yellow_card"}, 
        {key: "كـروت حمـراء", value: "red_card"}, 
    ];
    console.log(team);
    console.log(event);
    console.log(player);
    console.log(champion);
    console.log(match);
    const modalBody = <div className={styles.modalBody}>
        <SelectInput label="اختر حـدث" options={events} setValue={setEvent} />
        <SelectInput label="اختر الفريق" options={teams} setValue={setTeam} />
        <SelectInput label="اختر لاعـب" options={players} setValue={setPlayer} />
        <TextInput label="أدخـل توقيت الحدث" type="text" value={eventTime} setState={setEventTime} />
    </div>;
    const onOk = async () => {
        if(!event || !team || !player || !eventTime) {
            setError("جميع الحقول مطلوبـة!")
        }
        else {
            const body = {champion: champion, match_id: match, player_id: parseInt(player), minute: parseInt(eventTime)}
            switch(event) {
                case "goal" : 
                const callGoal = await addGoal(body);
                if(callGoal.error) {
                    setMessage("");
                    setError(callGoal.error);
                }
                else if(callGoal.message) {
                    setError("");
                    setMessage(callGoal.message);
                    router.refresh();
                }
                break;
                case "yellow_card" : 
                const callYellowCards = await addYellowCard(body);
                if(callYellowCards.error) {
                    setMessage("");
                    setError(callYellowCards.error);
                }
                else if(callYellowCards.message) {
                    setError("");
                    setMessage(callYellowCards.message);
                    router.refresh();
                }
                break;
                case "Red_card" : 
                const callRedCards = await addRedCard(body);
                if(callRedCards.error) {
                    setMessage("");
                    setError(callRedCards.error);
                }
                else if(callRedCards.message) {
                    setError("");
                    setMessage(callRedCards.message);
                    router.refresh();
                }
                break;
            }
        }
    }
    return(
        <>
            <CustomButton title="إضافة حدث" 
            bg="rgb(167, 167, 243)" 
            clicked={addEventClicked}/>
            <CustomModal  
            title="إضـافة حـدث" 
            visible={visible} 
            setVisible={setVisible} 
            body={modalBody} 
            onOk={onOk} 
            message={message} 
            error={error} 
            />
        </>
    );
}