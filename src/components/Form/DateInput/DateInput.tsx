import styles from "./dateInput.module.css";

export default function DateInput({
    label,
    value,
    setValue,
}: {
    label: string;
    value?: string;
    setValue: (value: string) => void;
}
) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    return(
        <div className={styles.container}>
            <label><p>{label}</p></label>
            <input type="datetime-local" onChange={onChange} value={value}/>
        </div>
    );
}