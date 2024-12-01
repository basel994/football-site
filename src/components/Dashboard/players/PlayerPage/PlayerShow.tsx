import { getPlayerById } from "@/apiFetching/players/getPlayerById";
import syles from "./playerShow.module.css";
import PlayerPage from "./PlayerPage";

export default async function PlayerShow({id}: {id: number}) {
    const getPlayer = await getPlayerById(id);
    return(
        <div className={syles.container}>
            {
                !getPlayer.data ? 
                <p className={syles.error}>{getPlayer.error}</p> : 
                <PlayerPage playerData={getPlayer.data} />
            }
        </div>
    );
}