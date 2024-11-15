import styles from "./match.module.css";
import Image from "next/image";
import { FrontMatchType } from "@/types/frontMatchType";

export default function MatchDetails({matchObject}: {matchObject: FrontMatchType;}) {

    const events = matchObject.events
    events.sort((a, b) => b.minute - a.minute);
    const team_one_goals = events.filter((event) => event.type === "goal" && event.team === matchObject.team_one);
    const team_two_goals = events.filter((event) => event.type === "goal" && event.team === matchObject.team_two);
    return(
        <table className={styles.table}>
            <tbody>
                <tr>
                    <td>
                        <div className={styles.logo}>
                            <Image src={matchObject.team_one_logo} 
                            alt="" 
                            width={30} 
                            height={30} />
                        </div>
                    </td>
                    <td></td>
                    <td>
                        <div className={styles.logo}>
                            <Image src={matchObject.team_two_logo} 
                            alt="" 
                            width={30} 
                            height={30} />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={1}><p>{matchObject.team_one}</p></td>
                    <td><p>{matchObject.status}</p></td>
                    <td colSpan={1}><p>{matchObject.team_two}</p></td>
                </tr>
                <tr>
                    <td>
                        <div className={styles.events}>
                            {
                                events.map((event) => {
                                    return(
                                        <div key={event.id}>
                                            <Image src={event.type === "goal" ? "/images/matches/match.ico" : (event.type === "yellow" ? "/images/matches/yellowcard.ico" : "/images/matches/redCard.ico")} 
                                            alt="" 
                                            width={10} 
                                            height={10} />
                                            <p>{event.player}</p>
                                            <p>د {event.minute}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </td>
                    <td>
                        <div className={styles.goals}>
                            {matchObject.status !== "ألغيت" && matchObject.status !== "لـم تبدأ بعـد" ? 
                                <>
                                    <p>{team_one_goals.length}</p>
                                    <p>{team_two_goals.length}</p>
                                </> : 
                                <>
                                    <p>__</p>
                                    <p>__</p>
                                </>
                            }
                        </div>
                    </td>
                    <td>
                        <div className={styles.events}>
                            {
                                events.map((event) => {
                                    return(
                                        <div key={event.id}>
                                            <Image src={event.type === "goal" ? "/images/matches/match.ico" : (event.type === "yellow" ? "/images/matches/yellowcard.ico" : "/images/matches/redCard.ico")} 
                                            alt="" 
                                            width={10} 
                                            height={10} />
                                            <p>{event.player}</p>
                                            <p>د {event.minute}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}