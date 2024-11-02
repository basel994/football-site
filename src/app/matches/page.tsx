import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import Matches from "@/components/Matches/Matches";

export default function Page() {
    return(
        <div className={styles.page}>
            <PageHeader title="المبــاريــات" icon="/images/matches/match.ico" />
            <Matches />
        </div>
    );
}