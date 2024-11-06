import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import ChampionshipsShow from "@/components/Dashboard/Championships/ChampionshipsShow/ChampionshipsShow";

export default function Page() {
    return(
        <div className={styles.page}>
            <PageHeader title="المنتخبـات" />
            <ChampionshipsShow />
        </div>
    );
}