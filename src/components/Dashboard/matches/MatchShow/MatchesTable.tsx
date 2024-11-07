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
    return(
        <table className={styles.table}>
            <thead>
                <tr>
                    <th><p>ف1</p></th>
                    <th><p>ف2</p></th>
                    <th><p> البطولـة</p></th>
                    <th><p>التاريخ</p></th>
                    <th><p>التوقيت</p></th>
                    <th><p>تعديـل</p></th>
                    <th><p>حدث</p></th>
                    <th><p>تثبيت</p></th>
                    <th><p>حــذف</p></th>
                </tr>
            </thead>
            <tbody>
                {
                    matchesData.map(async(matcObject) => {
                        const team_one = await getTeamName(matcObject.team_one);
                        const team_two = await getTeamName(matcObject.team_two);
                        const match_date = getDateForm(matcObject.match_date);
                        return(
                            <tr key={matcObject.id}>
                                <td><p>{team_one}</p></td>
                                <td><p>{team_two}</p></td>
                                <td><p>{matcObject.championship}</p></td>
                                <td><p>{match_date.stringDate}</p></td>
                                <td><p>{match_date.stringTime}</p></td>
                                <td>
                                    <MatchUpdate matcObject={matcObject} />
                                </td>
                                <td>
                                    <AddEvent team_one={matcObject.team_one} 
                                    team_two={matcObject.team_two} 
                                    champion={matcObject.championship} 
                                    match={matcObject.id} />
                                </td>
                                <td>
                                    <MatchFixing matchObject={matcObject}/>
                                </td>
                                <td>
                                    <MatchDelete id={String(matcObject.id)}/>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}