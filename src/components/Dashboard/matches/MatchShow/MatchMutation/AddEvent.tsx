"use client"
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/CustomModal/CustomModal";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import TextInput from "@/components/Form/TextInput/TextInput";
import { useEffect, useState } from "react";
import styles from "./matchMutation.module.css";

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
    const [teams, setTeams] = useState<{key: string, value: string}[]>([]);
    const [team, setTeam] = useState<string | number>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [event, setEvent ] = useState<string | number>("");
    const [eventTime, setEventTime] = useState<string>("");
    const [player, setPlayer] = useState<string | number>("");
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
        <SelectInput label="اختر لاعـب" options={teams} setValue={setPlayer} />
        <TextInput label="أدخـل توقيت الحدث" type="text" value={eventTime} setState={setEventTime} />
    </div>
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
            onOk={() => {}}

            />
        </>
    );
}