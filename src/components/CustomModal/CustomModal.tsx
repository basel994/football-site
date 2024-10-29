import CustomButton from "../CustomButton/CustomButton";
import styles from "./customModal.module.css";

export default function CustomModal( 
    { 
        visible,
        setVisible, 
        title,
        body, 
        onOk, 
    } : {
        visible: boolean;
        setVisible: (visible: boolean) => void; 
        title: string;
        body: React.ReactNode; 
        onOk: () => {};
    }
 ) {
    const modalClose = () => {
        setVisible(false);
    }
    return(
        <div className={`${styles.container} ${visible ? styles.show : styles.hide}`}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <p>{title}</p>
                    <div className={styles.close} onClick={modalClose}>
                        <span></span>
                    </div>
                </div>
                <div className={styles.body}>{body}</div>
                <div className={styles.footer}>
                    <CustomButton title="حفـظ" 
                    bg="green" 
                    color="white" 
                    clicked={onOk}/>
                    <CustomButton title="إلغــاء" 
                    bg="red" 
                    color="white" 
                    clicked={modalClose} />
                </div>
            </div>
        </div>
    );
}