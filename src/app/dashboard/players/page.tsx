import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import PlayersShow from "@/components/Dashboard/players/PlayersShow/PlayersShow";

export default function Page() {
    return(
        <div className={styles.page}>
            <PageHeader title="لاعبــون" />
            <PlayersShow />
        </div>
    );
}