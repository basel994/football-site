import { newDetailsFetch } from "@/apiFetching/news/newDetailsFetch";
import styles from "./page.module.css";

export default async function Page({params}: {params: {id: string}}) {
    const {id} = await params;
    const callApiFun = await newDetailsFetch(id);
    return(
        <div className={styles.page}>
            {
                !callApiFun.data ? 
                <p className={styles.error}>{callApiFun.error}</p> : 
                <p>{callApiFun.data.title}</p>
            }
        </div>
    );
}