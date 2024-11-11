import styles from "./matchesShow.module.css";
import Image from "next/image";
import { getPlayerById } from "@/apiFetching/players/getPlayerById";
import { getGoalsByMatch } from "@/apiFetching/goals/getGoalsByMatch";
import { getYellowCardsByMatch } from "@/apiFetching/yellowCards/getYellowCardsByMatch";
import { getRedCardsByMatch } from "@/apiFetching/redCards/getRedCardsByMatch";
import EventDelete from "./EventDelete";

export default async function Event({
    team_name, 
    team_id, 
    match_id, 
}: 
    {
        team_name: string; 
        team_id: number; 
        match_id: number;}) {
            const getPlayerName = async (id: number) => {
                const callFun = await getPlayerById(id);
                if(callFun.data) {
                    return callFun.data.name;
                }
                else return null;
            }
         
            const goalsGet = async (match_id: number) => {
                const callFun = await getGoalsByMatch(match_id);
                if(callFun.data) return callFun.data;
                else return null;
            }
            const yellowCardGet = async (match_id: number) => {
                const callFun = await getYellowCardsByMatch(match_id);
                if(callFun.data) return callFun.data;
                else return null;
            }
            const redCardGet = async (match_id: number) => {
                const callFun = await getRedCardsByMatch(match_id);
                if(callFun.data) return callFun.data;
                else return null;
            }
            const goals = await goalsGet(match_id);
            const yellowCards = await yellowCardGet(match_id);
            const redCards = await redCardGet(match_id);

    return(
        <div className={styles.eventsContainer}>
           <div><p>{team_name}</p></div>
           <div className={styles.events}>
               <div className={styles.event}>
                   <div><p>الأهداف</p></div>
                   <div>
                       {
                            goals && goals.map(async(goal) => {
                                if(goal.team_id === team_id) {
                                    return(
                                        <div className={styles.eventDetail}>
                                            <Image src="/images/matches/match.ico" 
                                            alt="" 
                                            width={15} 
                                            height={15} />
                                            <p>{await getPlayerName(goal.player_id)}</p>
                                            <p>د {goal.minute}</p>
                                            <EventDelete id={goal.id} event="goal" />
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                </div>
                <div className={styles.event}>
                   <div><p>البطاقات الصفراء</p></div>
                   <div>
                       {
                            yellowCards && yellowCards.map(async(yellow) => {
                                if(yellow.team_id === team_id) {
                                    return(
                                        <div className={styles.eventDetail}>
                                            <Image src="/images/matches/yellowcard.ico" 
                                            alt="" 
                                            width={15} 
                                            height={15} />
                                            <p>{await getPlayerName(yellow.player_id)}</p>
                                            <p>د {yellow.minute}</p>
                                            <EventDelete id={yellow.id} event="yellow" />
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                </div>
                <div className={styles.event}>
                   <div><p>البطاقات الحمراء</p></div>
                   <div>
                       {
                            redCards && redCards.map(async(red) => {
                                if(red.team_id === team_id) {
                                    return(
                                        <div className={styles.eventDetail}>
                                            <Image src="/images/matches/redcard.ico" 
                                            alt="" 
                                            width={15} 
                                            height={15} />
                                            <p>{await getPlayerName(red.player_id)}</p>
                                            <p>د {red.minute}</p>
                                            <EventDelete id={red.id} event="red" />
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                </div>
        </div>
    </div>
    );
}