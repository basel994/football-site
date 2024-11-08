import styles from "./matchesShow.module.css";
import { MatchType } from "@/types/matchType";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import MatchUpdate from "./MatchMutation/MatchUpdate";
import MatchDelete from "./MatchMutation/MatchDelete";
import { dateForm } from "@/functions/dateForm";
import MatchFixing from "./MatchMutation/MatchFixing";
import AddEvent from "./MatchMutation/AddEvent";

export default function MatchesTable({matchesData}: {matchesData: MatchType[]}) {
    const getTeamName = async (id: number) => {
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
                                        <td colSpan={5}>
                                            <p>{matcObject.champion}</p>
                                        </td>
                                    </tr>
                                    {matcObject.matches.map(async(matcObject) => {
                                        const team_one = await getTeamName(matcObject.team_one);
                                        const team_two = await getTeamName(matcObject.team_two);
                                        const match_date = getDateForm(matcObject.match_date);
                                        return(
                                            <>
                                            <tr className={styles.match}>
                                            <td><p>{team_one}</p></td>
                                            <td><p>{team_two}</p></td>
                                            <td><p>{match_date.stringDate}</p></td>
                                            <td><p>{match_date.stringTime}</p></td>
                                            <td><p>{matcObject.status}</p></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}>
                                                <div className={styles.control} >
                                                    <MatchUpdate matcObject={matcObject} />
                                                    {matcObject.status !== "لـم تبدأ بعـد" && 
                                                    matcObject.status !== "انتهـت" && 
                                                    matcObject.status !== "تأجلت" && 
                                                    matcObject.status !== "ألغيت" ? 
                                                    <AddEvent team_one={matcObject.team_one} 
                                                    team_two={matcObject.team_two} 
                                                    champion={matcObject.championship} 
                                                    match={matcObject.id} /> : 
                                                    null}
                                                    <MatchFixing matchObject={matcObject}/>
                                                    <MatchDelete id={String(matcObject.id)}/>
                                                </div>
                                            </td>
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