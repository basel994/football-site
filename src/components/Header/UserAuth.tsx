import styles from "./headerStyles/userAuth.module.css";
import User from "./User";
import LoginBtn from "./LoginBtn";
import SignUpBtn from "./SignUpBtn";

export default function UserAuth() {
    return(
        <div className={styles.auth}>
            <LoginBtn />
            <SignUpBtn />
            <User />
        </div>
    );
}