"use client"
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import CustomButton from "@/components/CustomButton/CustomButton";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import { useEffect, useState } from "react";

export default function AddEvent({
    team_one,
    team_two,
}: {
    team_one: string;
    team_two: string;
}) {
    useEffect( () => {
        const getTeamName = async (id: string) => {
            const callFun = await teamsFetchById(id);
            if(callFun.data) {
                return callFun.data.name;
            }
            else return null
        }
        const fetchTeam_one = async () => {
            const first = await getTeamName(String(team_one));
            if(first) {
                setTeams(prev => [...prev,{key: first, value: String(team_one)}]);
            }
        }
        const fetchTeam_two = async () => {
            const second = await getTeamName(String(team_two));
            if(second) {
                setTeams(prev => [...prev,{key: second, value: String(team_two)}]);
            }
        }
        fetchTeam_one();
        fetchTeam_two();
    }, [] );
    const [teams, setTeams] = useState<{key: string, value: string}[]>([]);
    const [team, setTeam] = useState<string>("");
    console.log(team);
    return(
        <>
            <CustomButton title="إضافة حدث" />
            <SelectInput label="اختر الفريق" options={teams} setValue={setTeam} />
        </>
    );
}