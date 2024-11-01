import styles from "./matchesShow.module.css";
import { MatchType } from "@/types/matchType";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import MatchUpdate from "./MatchMutation/MatchUpdate";
import MatchDelete from "./MatchMutation/MatchDelete";

export default function MatchesTable({teamsData}: {teamsData: MatchType[]}) {
    return(
        <table className={styles.table}>
            <thead>
                <tr>
                    <th><p>التسلسل</p></th>
                    <th><p>الفريق الأول</p></th>
                    <th><p>الفريق الثاني</p></th>
                    <th><p> البطولـة</p></th>
                    <th><p>نتيجة ف1</p></th>
                    <th><p>نتيجة ف2</p></th>
                    <th><p>التاريخ</p></th>
                    <th><p>التوقيت</p></th>
                    <th><p>تعديـل</p></th>
                    <th><p>حــذف</p></th>
                </tr>
            </thead>
            <tbody>
                {
                    teamsData.map(async(teamObject, index) => {
                        const get_team_one = await teamsFetchById(teamObject.team_one);
                        let team_one;
                        if(get_team_one.data) {
                            team_one = get_team_one.data.name
                        }
                        else {
                            team_one = "غيـر معروف"
                        }
                        const get_team_two = await teamsFetchById(teamObject.team_one);
                        let team_two;
                        if(get_team_two.data) {
                            team_two = get_team_two.data.name
                        }
                        else {
                            team_two = "غيـر معروف"
                        }
                        return(
                            <tr key={teamObject.id}>
                                <td><p>{index + 1}</p></td>
                                <td><p>{team_one}</p></td>
                                <td><p>{team_two}</p></td>
                                <td><p>{teamObject.championship}</p></td>
                                <td><p>{teamObject.team_one_score}</p></td>
                                <td><p>{teamObject.team_two_score}</p></td>
                                <td><p>{teamObject.match_date}</p></td>
                                <td><p>{teamObject.match_time}</p></td>
                                <td>
                                    <MatchUpdate teamObject={teamObject} />
                                </td>
                                <td>
                                    <MatchDelete id={String(teamObject.id)}/>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}