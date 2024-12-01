"use client";
import { useEffect, useState } from "react";
import DateInput from "../Form/DateInput/DateInput";
import styles from "./matches.module.css";
import { fetchFrontendMatches } from "@/apiFetching/matches/fetchFrontendMatches";
import { FrontMatchType } from "@/types/frontMatchType";
import Link from "next/link";
import Match from "./Match/Match";

interface ChampionGroup {  
    champion: string;  
    matches: FrontMatchType[];  
}  
const groupMatchesByChampion = (matches: FrontMatchType[]): ChampionGroup[] => {  
    const championMap: { [key: string]: FrontMatchType[] } = {};  

    matches.forEach(match => {  
        if (!championMap[match.championship]) {  
            championMap[match.championship] = [];  
        }  
        championMap[match.championship].push(match);  
    });  

    return Object.keys(championMap).map(champion => ({  
        champion,  
        matches: championMap[champion]  
    }));  
}; 
export default function MatchSearchByDate() {
    const [date, setDate] = useState<string>(new Date().toDateString());
    const [matches, setMatches] = useState<FrontMatchType[] | null>(null);
    const [error, setError] = useState<string>("");
    useEffect( () => {
        const getMatchesByDate = async() => {
            const callFun = await fetchFrontendMatches(date);
            if(callFun.data) {
                setMatches(callFun.data);
            }
            else if(callFun.error) {
                setError(callFun.error);
            }
        }
        getMatchesByDate();
    }, [date] );
    return(
        <>
        <DateInput label="" 
        setValue={setDate} 
        value={date} />
                    {
                !matches ? <p className={styles.error}>{error}</p> :
                groupMatchesByChampion(matches).map((match, index) => {
                    return(
                        <div className={styles.championContainer} key={index}>
                            <div className={styles.champion}><p>{match.champion}</p></div>
                            {
                                match.matches.map((match) => {
                                    return(
                                        <Link href={`/matches/${match.id}`} key={match.id}>
                                            <Match matchObject={match} />
                                        </Link> 
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </>
    );
}