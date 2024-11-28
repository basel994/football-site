import syles from "./newsShow.module.css";
import NewsTable from "./NewsTable";
import AddNew from "../AddNew/AddNew";
import { newsFetch } from "@/apiFetching/news/newsFetch";

export default async function NewsShow() {
    const getNews = await newsFetch();
    return(
        <div className={syles.container}>
            <AddNew />
            {
                !getNews.data ? 
                <p className={syles.error}>{getNews.error}</p> : 
                <NewsTable newsData={getNews.data} />
            }
        </div>
    );
}