import syles from "./playersShow.module.css";
import AddPlayer from "../AddPlayer/AddPlayer";
import PlayersTable from "./PlayersTable";
import { getPlayers } from "@/apiFetching/players/getPlayers";

export default async function PlayersShow() {
    const playersGet = await getPlayers();
    return(
        <div className={syles.container}>
            <AddPlayer />
            {
                !playersGet.data ? 
                <p className={syles.error}>{playersGet.error}</p> : 
                <PlayersTable playersData={playersGet.data} />
            }
        </div>
    );
}