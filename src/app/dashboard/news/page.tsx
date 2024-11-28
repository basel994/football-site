import PageHeader from "@/components/PageHeader/PageHeader";
import styles from "./page.module.css";
import NewsShow from "@/components/Dashboard/News/NewsShow/NewsShow";

export default function Page() {
    return(
        <div className={styles.page}>
            <PageHeader title="الأخبــار" />
            <NewsShow />
        </div>
    );
}