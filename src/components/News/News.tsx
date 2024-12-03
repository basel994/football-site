import { newsFetch } from "@/apiFetching/news/newsFetch";
import styles from "./news.module.css";
import NewsPagination from "./NewsPgination";

export default async function News() {
    const callApiFun = await newsFetch();
    return(
        <div className={styles.news}>
            {
                !callApiFun.data ? 
                <p className={styles.error}>{callApiFun.error}</p> : 
                <NewsPagination items={callApiFun.data.length} />
            }
        </div>
    );
}