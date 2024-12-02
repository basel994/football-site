import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import Players from "@/components/Players/Players";

export default function Page() {
    return(
        <div className={styles.container}>
            <PageHeader title="لاعبـون" />
            <Players />
        </div>
    );
}