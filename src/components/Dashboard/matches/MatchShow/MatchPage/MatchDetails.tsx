import styles from "./matchesShow.module.css";
import { MatchType } from "@/types/matchType";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import MatchUpdate from "../MatchMutation/MatchUpdate";
import MatchDelete from "../MatchMutation/MatchDelete";
import { dateForm } from "@/functions/dateForm";
import MatchStateUpdating from "../MatchMutation/MatchStateUpdating";
import AddEvent from "../MatchMutation/AddEvent";
import { getGoalsByMatch } from "@/apiFetching/goals/getGoalsByMatch";

export default async function MatchDetails({matchData}: {matchData: MatchType}) {
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
 
    const goalsGet = async (match_id: number) => {
        const callFun = await getGoalsByMatch(match_id);
        if(callFun.data) return callFun.data;
        else return null;
    }
    const team_one = await getTeamName(matchData.team_one);
    const team_two = await getTeamName(matchData.team_two);
    const match_date = getDateForm(matchData.match_date);
    const goals = await goalsGet(matchData.id);
    console.log(goals);
    return(
        <div className={styles.matchesShow}>
                            <table className={styles.table}>
                                <tbody>
                                    <tr className={styles.tableHeader}>
                                        <td colSpan={5}>
                                            <p>{matchData.championship}</p>
                                        </td>
                                    </tr>

                                            <tr className={styles.match}>
                                            <td><p>{team_one}</p></td>
                                            <td><p>{team_two}</p></td>
                                            <td><p>{match_date.stringDate}</p></td>
                                            <td><p>{match_date.stringTime}</p></td>
                                            <td><p>{matchData.status}</p></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}>
                                                <div className={styles.control} >
                                                    <MatchUpdate matcObject={matchData} />
                                                    {matchData.status !== "لـم تبدأ بعـد" && 
                                                    matchData.status !== "انتهـت" && 
                                                    matchData.status !== "تأجلت" && 
                                                    matchData.status !== "ألغيت" ? 
                                                    <AddEvent team_one={matchData.team_one} 
                                                    team_two={matchData.team_two} 
                                                    champion={matchData.championship} 
                                                    match={matchData.id} /> : 
                                                    null}
                                                    <MatchStateUpdating matchId={matchData.id} status={matchData.status}/>
                                                    <MatchDelete id={String(matchData.id)}/>
                                                </div>
                                            </td>
                                        </tr>

                                </tbody>
                            </table>
            
        </div>
    );
}