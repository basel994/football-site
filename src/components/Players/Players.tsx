"use client"
import { useEffect, useState } from "react";
import TextInput from "../Form/TextInput/TextInput";
import styles from "./players.module.css";
import { FrontPlayerType } from "@/types/frontPlayerType";
import { fetchFrontendPlayers } from "@/apiFetching/players/fetchFrontPlayers";

export default function Players() {
    const [serach, setSearch] = useState<string>("");
    const [players, setPlayers] = useState<FrontPlayerType[] | null>(null);
    const [error, setError] = useState<string>("");
    useEffect( () => {
        const fetchPlayers = async () => {
            const callFun = await fetchFrontendPlayers(serach);
            if( callFun.data) {
                setError("");
                setPlayers(callFun.data);
            }
            else if(callFun.error){
                setError(callFun.error);
                setPlayers(null);
            }
        }
        fetchPlayers();
    }, [serach] );
    return(
        <div className={styles.container}>
            <TextInput type="text" 
            label="ادخـل اسم لاعـب للبحـث..." 
            value={serach} 
            setState={setSearch}/>
            <p>{error}</p>
            <table>
                {
                    players && players.map((player) => {
                        return(
                            <tr key={player.id}>
                                <td><p>{player.name}</p></td>
                                <td><p>{player.country}</p></td>
                                <td><p>{player.team}</p></td>
                            </tr>
                        );
                    })
                }
            </table>
        </div>
    );
}