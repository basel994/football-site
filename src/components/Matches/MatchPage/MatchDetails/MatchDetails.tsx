import styles from "./match.module.css";
import Image from "next/image";
import { FrontMatchType } from "@/types/frontMatchType";

export default function MatchDetails({matchObject}: {matchObject: FrontMatchType;}) {
    const team_one_goals = matchObject.goals.filter((goal) => goal.team === matchObject.team_one);
    const team_two_goals = matchObject.goals.filter((goal) => goal.team === matchObject.team_two);
    console.log(team_one_goals);
    return(
            <div className={styles.match}>
                <div className={styles.team}>
                        <div className={styles.teamDetails}>
                            <Image src={matchObject.team_one_logo} 
                            alt="" 
                            width={40} 
                            height={40} />
                            <p>{matchObject.team_one}</p>
                        </div>
                    {
                        team_one_goals.map((goal) => {
                            return(
                                <div><p>{goal.player} - {goal.minute}</p></div>
                            );
                        })
                    }
                </div>
                <div className={styles.details}>
                    <p className={styles.status}>{matchObject.status}</p>
                    <div className={styles.goals}>
                        {matchObject.status !== "ألغيت" && matchObject.status !== "لـم تبدأ بعـد" ? 
                        <>
                        <p>{team_one_goals.length}</p>
                        <p>{team_two_goals.length}</p>
                        </> : 
                        <>
                        <p>__</p>
                        <p>__</p>
                        </>}
                    </div>
                </div>
                <div className={styles.team}>
                        <div className={styles.teamDetails}>
                            <Image src={matchObject.team_two_logo} 
                            alt="" 
                            width={40} 
                            height={40} />
                            <p>{matchObject.team_two}</p>
                        </div>
                        {
                            team_two_goals.map((goal) => {
                            return(
                                <div><p>{goal.player} - {goal.minute}</p></div>
                            );
                            })
                        }
                </div>
            </div>
    );
}