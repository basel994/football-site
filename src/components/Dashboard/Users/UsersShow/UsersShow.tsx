import syles from "./usersShow.module.css";
import UsersTable from "./UsersTable";
import AddUser from "../AddUser/AddUser";
import { usersFetch } from "@/apiFetching/users/usersFetch";

export default async function UsersShow() {
    const getUsers = await usersFetch();
    return(
        <div className={syles.container}>
            <AddUser />
            {
                !getUsers.data ? 
                <p className={syles.error}>{getUsers.error}</p> : 
                <UsersTable usersData={getUsers.data} />
            }
        </div>
    );
}