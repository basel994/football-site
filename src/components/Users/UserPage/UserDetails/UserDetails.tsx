import { UserType } from "@/types/userType";
import styles from "./userDetails.module.css";
import Image from "next/image";
import UserImageUpdate from "../UserMutation/UserImageUpdate";
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
                <td><p>{userData.name}</p></td>
                <td><p>{userData.last}</p></td>
                <td><p>{userData.password}</p></td>
            </tr>
        </table>
    );
}