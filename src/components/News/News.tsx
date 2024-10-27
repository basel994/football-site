import { newsFetch } from "@/apiFetching/news/newsFetch";
import styles from "./news.module.css";

export default async function News() {
    const callApiFun = await newsFetch();
    console.log(callApiFun);
    return(
        <div className={styles.news}>
            {
                callApiFun.error && <p>{callApiFun.error}</p>
            }
            {
                callApiFun.data && callApiFun.data.length > 0 ? <p>{callApiFun.data[0].title}</p>:null
            }
        </div>
    );
}