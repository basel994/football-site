import { MatchType } from "@/types/matchType";
import styles from "./match.module.css";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import Image from "next/image";
import { dateForm } from "@/functions/dateForm";

export default async function Match({matchObject, state}: {matchObject: MatchType; state?: string}) {
    const getTeam = async (id: string) => {
        const callFun = await teamsFetchById(id);
        return callFun.data;
    }
    const team_one = await getTeam(matchObject.team_one);
    const team_two = await getTeam(matchObject.team_two);
    let status = state;
    if(!state) {
        const time = new Date();
        const date = dateForm(new Date(matchObject.match_date));
        if (time < new Date(matchObject.match_date)) {
            status = date.stringTime;
        }
        else {
            status = "جاريـة الآن";
        }
    }
    const result_one = matchObject.team_one_score;
    const result_two = matchObject.team_two_score;
    return(
            <div className={styles.match}>
                <div className={styles.team}>
                    {
                        team_one && <div className={styles.teamDetails}>
                            <Image src={team_one.logo} 
                            alt="" 
                            width={40} 
                            height={40} />
                            <p>{team_one.name}</p>
                        </div>
                    }
                    <p className={result_one > result_two ? styles.win : (result_one === result_two ? styles.equal : styles.fail)}>{result_one !== null ? result_one : "__"}</p>
                </div>
                <div className={styles.status}><p>{status}</p></div>
                <div className={styles.team}>
                {
                        team_two && <div className={styles.teamDetails}>
                            <Image src={team_two.logo} 
                            alt="" 
                            width={40} 
                            height={40} />
                            <p>{team_two.name}</p>
                        </div>
                    }
                    <p className={result_two > result_one ? styles.win : (result_two === result_one ? styles.equal : styles.fail)}>{result_two !== null ? result_two : "__"}</p>
                </div>
            </div>
    );
}