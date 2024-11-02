import { matchesFetch } from "@/apiFetching/matches/fetchMatches";
import styles from "./matches.module.css";
import Match from "./Match/Match";

export default async function Matches() {
    const date = new Date();
    const today = date.toDateString();
    const getTodayMatches = await matchesFetch(today);
    return(
        <div className={styles.container}>
            {
                !getTodayMatches.data ? <p className={styles.error}>{getTodayMatches.error}</p> :
                getTodayMatches.data.map((match) => {
                    return(
                        <Match key={match.id} matchObject={match} />
                    );
                })
            }
        </div>
    );
}