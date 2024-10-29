import { championshipsFetch } from "@/apiFetching/championships/championshipsFetch";
import syles from "./championshipsShow.module.css";
import ChampionshipsTable from "./ChampionshipsTable";
import AddChampion from "../AddChampionship/AddChampionship";

export default async function ChampionshipsShow() {
    const getChampionships = await championshipsFetch();
    return(
        <div className={syles.container}>
            <AddChampion />
            {
                !getChampionships.data ? 
                <p className={syles.error}>{getChampionships.error}</p> : 
                <ChampionshipsTable championshipData={getChampionships.data} />
            }
        </div>
    );
}