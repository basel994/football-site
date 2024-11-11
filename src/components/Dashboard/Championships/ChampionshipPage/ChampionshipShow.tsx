import syles from "./championshipsShow.module.css";
import ChampionshipPage from "./ChampionshipPage";
import { fetchChampionById } from "@/apiFetching/championships/fetchChampionById";

export default async function ChampionshipShow({id}: {id: number}) {
    const getChampionships = await fetchChampionById(id);
    return(
        <div className={syles.container}>
            {
                !getChampionships.data ? 
                <p className={syles.error}>{getChampionships.error}</p> : 
                <ChampionshipPage championshipData={getChampionships.data} />
            }
        </div>
    );
}