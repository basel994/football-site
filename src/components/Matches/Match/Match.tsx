import { MatchType } from "@/types/matchType";
import styles from "./match.module.css";
import { teamsFetchById } from "@/apiFetching/teams/teamFetchById";
import Image from "next/image";
import { dateForm } from "@/functions/dateForm";

export default async function Match({matchObject}: {matchObject: MatchType}) {
    const getTeam = async (id: string) => {
        const callFun = await teamsFetchById(id);
        return callFun.data;
    }
    const team_one = await getTeam(matchObject.team_one);
    const team_two = await getTeam(matchObject.team_two);
    const time = new Date();
    const date = dateForm(new Date(matchObject.match_date));
    let status = date.stringTime;
    if (time < new Date(matchObject.match_date)) {
        status = date.stringTime;
    }
    else {
        status = "جاريـة الآن";
    }
    return(
        <div className={styles.container}>
            <div className={styles.champion}>
                <p>{matchObject.championship}</p>
            </div>
            <div className={styles.match}>
                <div className={styles.team}>
                    {
                        team_one && <div className={styles.teamDetails}>
                            <p>{team_one.name}</p>
                            <Image src={team_one.logo} 
                            alt="" 
                            width={40} 
                            height={40} />
                        </div>
                    }
                    <p>{matchObject.team_one_score !== null ? matchObject.team_one_score : "__"}</p>
                </div>
                <div className={styles.status}><p>{status}</p></div>
                <div className={styles.team}>
                {
                        team_two && <div className={styles.teamDetails}>
                            <p>{team_two.name}</p>
                            <Image src={team_two.logo} 
                            alt="" 
                            width={40} 
                            height={40} />
                        </div>
                    }
                    <p>{matchObject.team_two_score !== null ? matchObject.team_two_score : "__"}</p>
                </div>
            </div>
        </div>
    );
}