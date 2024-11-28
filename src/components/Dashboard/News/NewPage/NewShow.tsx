import syles from "./newShow.module.css";
import NewPage from "./NewPage";
import { newById } from "@/apiFetching/news/newById";

export default async function NewShow({id}: {id: number}) {
    const getNew = await newById(id);
    return(
        <div className={syles.container}>
            {
                !getNew.data ? 
                <p className={syles.error}>{getNew.error}</p> : 
                <NewPage newData={getNew.data} />
            }
        </div>
    );
}