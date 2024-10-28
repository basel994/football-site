import { newsFetch } from "@/apiFetching/news/newsFetch";
import styles from "./news.module.css";
import New from "./New/New";

export default async function News() {
    const callApiFun = await newsFetch();
    console.log(callApiFun);
    return(
        <div className={styles.news}>
            {
                !callApiFun.data ? 
                <p className={styles.error}>{callApiFun.error}</p> : 
                callApiFun.data.map((newObject) => {
                    return <New key={newObject.id} newObject={newObject} />
                })
            }
        </div>
    );
}