import { matchesFetch } from "@/apiFetching/matches/fetchMatches";
import styles from "./matches.module.css";
import Match from "./Match/Match";
import { matchesResultsFetch } from "@/apiFetching/matchesResults/matchesResultsFetch";
import { MatchType } from "@/types/matchType";
interface ChampionGroup {  
    champion: string;  
    matches: MatchType[];  
}  
const groupMatchesByChampion = (matches: MatchType[]): ChampionGroup[] => {  
    const championMap: { [key: string]: MatchType[] } = {};  

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
    const getTodayMatches = await matchesFetch(today);
    const getTodayMatchesResults = await matchesResultsFetch(today);
    return(
        <div className={styles.container}>
            {
                !getTodayMatchesResults.data ? <p className={styles.error}>{getTodayMatchesResults.error}</p> :
                groupMatchesByChampion(getTodayMatchesResults.data).map((match) => {
                    return(
                        <div className={styles.championContainer}>
                            <div className={styles.champion}><p>{match.champion}</p></div>
                            {
                                match.matches.map((match) => {
                                    return(
                                        <Match key={match.id} matchObject={match} state="انتهـت" />
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
            {
                !getTodayMatches.data ? <p className={styles.error}>{getTodayMatches.error}</p> :
                groupMatchesByChampion(getTodayMatches.data).map((match) => {
                    return(
                        <div className={styles.championContainer}>
                            <div className={styles.champion}><p>{match.champion}</p></div>
                            {
                                match.matches.map((match) => {
                                    return(
                                        <Match key={match.id} matchObject={match} />
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