import syles from "./userShow.module.css";
import UserPage from "./UserPage";
import { userById } from "@/apiFetching/users/userById";

export default async function UserShow({id}: {id: number}) {
    const getUser = await userById(id);
    return(
        <div className={syles.container}>
            {
                !getUser.data ? 
                <p className={syles.error}>{getUser.error}</p> : 
                <UserPage userData={getUser.data} />
            }
        </div>
    );
}