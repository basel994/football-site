import { matchesFetch } from "@/apiFetching/matches/fetchMatches";
import styles from "./matches.module.css";
import Match from "./Match/Match";
import { matchesResultsFetch } from "@/apiFetching/matchesResults/matchesResultsFetch";

export default async function Matches() {
    const date = new Date();
    const today = date.toDateString();
    const getTodayMatches = await matchesFetch(today);
    const getTodayMatchesResults = await matchesResultsFetch(today);
    return(
        <div className={styles.container}>
                        {
                !getTodayMatchesResults.data ? <p className={styles.error}>{getTodayMatchesResults.error}</p> :
                getTodayMatchesResults.data.map((match) => {
                    return(
                        <Match key={match.id} matchObject={match} state="انتهـت" />
                    );
                })
            }
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