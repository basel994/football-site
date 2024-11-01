import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import MatchesShow from "@/components/Dashboard/matches/MatchShow/MatchesShow";

export default async function Page() {
    return(
        <div className={styles.page}>
            <PageHeader title="المبــاريــات" icon="/images/matches/match.ico" />
            <MatchesShow />
        </div>
    );
}