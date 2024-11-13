import styles from "./matchesShow.module.css";
import { MatchType } from "@/types/matchType";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import { dateForm } from "@/functions/dateForm";
import Link from "next/link";
import { getCountryById } from "@/apiFetching/countries/getCountryById";
import { fetchChampionByName } from "@/apiFetching/championships/fetchChampionByName";

export default function MatchesTable({matchesData}: {matchesData: MatchType[]}) {
    const getTeamName = async (id: number, type: string) => {
        if(type === "teams") {
            const get_team = await teamsFetchById(id);
            let team;
            if(get_team.data) {
                team = get_team.data.name;
            }
            else {
                team= "";
            }
            return team;
        }
        else {
            const get_team = await getCountryById(id);
            let team;
            if(get_team.data) {
                team = get_team.data.name;
            }
            else {
                team= "";
            }
            return team;
        }
    }
    const getDateForm = (date: string) => {
        return dateForm(new Date(date));
    }
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
    return(
        <div className={styles.matchesShow}>
                {
                    groupMatchesByChampion(matchesData).map((matcObject, index) => {
                        return(
                            <table className={styles.table} key={index}>
                                <tbody>
                                    <tr className={styles.tableHeader}>
                                        <td colSpan={6}>
                                            <p>{matcObject.champion}</p>
                                        </td>
                                    </tr>
                                    {matcObject.matches.map(async(matcObject) => {
                                        const getChampion = await fetchChampionByName(matcObject.championship);
                                        let team_one = "", team_two = "";
                                        if(getChampion.data) {
                                            team_one = await getTeamName(matcObject.team_one, getChampion.data.type);
                                            team_two = await getTeamName(matcObject.team_two, getChampion.data.type);
                                        }
                                        const match_date = getDateForm(matcObject.match_date);
                                        return(
                                            <>
                                            <tr className={styles.match}>
                                            <td><p>{team_one}</p></td>
                                            <td><p>{team_two}</p></td>
                                            <td><p>{match_date.stringDate}</p></td>
                                            <td><p>{match_date.stringTime}</p></td>
                                            <td><p>{matcObject.status}</p></td>
                                            <td><Link href={`/dashboard/matches/${matcObject.id}`} >صفحة المباراة</Link></td>
                                        </tr>
                                        </>
                                        );
                                    })}

                                </tbody>
                            </table>

                        );
                    })
                }
        </div>
    );
}