"use client"
import { newsFetch } from "@/apiFetching/news/newsFetch";
import styles from "./news.module.css";
import New from "./New/New";
import { useEffect, useState } from "react";
import { NewType } from "@/types/newType";
import Pagination from "../Pgination/PaginationWithoutPills/Pgination";

export default function NewsPagination({items}: {items: number}) {
    const limit: number = 2;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [news, setNews] = useState<NewType[] | null>(null);
    const [error, setError] = useState<string>("");
    useEffect( () => {
        const fetchNews = async() => {
            const callApiFun = await newsFetch(currentPage, limit);
            if(callApiFun.data) {
                setNews(callApiFun.data);
            }
            else if(callApiFun.error) {
                setError(callApiFun.error)
                setNews(null);
            }
        }
        fetchNews();
    }, [currentPage] );

    return(
        <div className={styles.news}>
            {
                !news ? 
                <p className={styles.error}>{error}</p> : 
                news.map((newObject) => {
                    return <New key={newObject.id} newObject={newObject} />
                })
            }
            <Pagination items={items} 
            limit={limit} 
            currentPage={currentPage} 
            setPage={setCurrentPage} />
        </div>
    );
}