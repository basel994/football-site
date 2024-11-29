import { UserType } from "@/types/userType";
import styles from "./userDetails.module.css";
import Image from "next/image";
import UserImageUpdate from "../UserMutation/UserImageUpdate";
import UserNameUpdate from "../UserMutation/UserNameUpdate";
import UserLastNameUpdate from "../UserMutation/UserLastNameUpdate";
import UserPasswordUpdate from "../UserMutation/UserPasswordUpdate";
export default function UserDetails({userData}: {userData: UserType}) {
    return(
        <table className={styles.container}>
            <tr>
                <td className={styles.header} colSpan={3}><p>{`${userData.name} ${userData.last}`}</p></td>
            </tr>
            <tr>
                <td colSpan={3}>
                    <div className={styles.userImage}>
                        <Image src={userData.image} 
                        alt="" 
                        width={75} 
                        height={75} />
                        <UserImageUpdate id={userData.id} />
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan={3}><p>تفـاصيل الحســاب:</p></td>
            </tr>
            <tr>
                <td><p>الاسم الأول</p> </td>
                <td><p>الاسم الأخير</p> </td>
                <td><p>كلمة المرور</p> </td>
            </tr>
            <tr>
                <td>
                    <div className={styles.userInfo}>
                        <p>{userData.name}</p>
                        <UserNameUpdate id={userData.id} />
                    </div>
                </td>
                <td>
                    <div className={styles.userInfo}>
                        <p>{userData.last}</p>
                        <UserLastNameUpdate id={userData.id} />
                    </div>
                </td>
                <td>
                    <div className={styles.userInfo}>
                        <p>{userData.password}</p>
                        <UserPasswordUpdate id={userData.id} />
                    </div>
                </td>
            </tr>
        </table>
    );
}