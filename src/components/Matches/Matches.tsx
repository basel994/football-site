import styles from "./matches.module.css";
import MatchSearchByDate from "./MatchSearchByDate";

export default async function Matches() {
    return(
        <div className={styles.container}>
            <MatchSearchByDate />
        </div>
    );
}