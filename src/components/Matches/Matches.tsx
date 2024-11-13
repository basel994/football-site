import styles from "./matches.module.css";
import Match from "./Match/Match";
import { fetchFrontendMatches } from "@/apiFetching/matches/fetchFrontendMatches";
import { FrontMatchType } from "@/types/frontMatchType";
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
export default async function Matches() {
    const date = new Date();
    const today = date.toDateString();
    const getTodayMatches = await fetchFrontendMatches(today);
    return(
        <div className={styles.container}>

            {
                !getTodayMatches.data ? <p className={styles.error}>{getTodayMatches.error}</p> :
                groupMatchesByChampion(getTodayMatches.data).map((match, index) => {
                    return(
                        <div className={styles.championContainer} key={index}>
                            <div className={styles.champion}><p>{match.champion}</p></div>
                            {
                                match.matches.map((match) => {
                                    return(
                                        <Match key={match.championship} matchObject={match} />
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </div>
    );
}