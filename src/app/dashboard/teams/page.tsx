import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import TeamsShow from "@/components/Dashboard/teams/TeamsShow/TeamsShow";

export default function Page() {
    return(
        <div className={styles.page}>
            <PageHeader title="الفرق" />
            <TeamsShow />
        </div>
    );
}