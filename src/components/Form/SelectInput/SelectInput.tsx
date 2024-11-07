import styles from "./select.module.css";

export default function SelectInput({ 
    label,
    options, 
    value, 
    setValue}:{ 
        label: string;
        options: {key: string, value: string | number}[]|null;
        value?: string | number;
        setValue: (value: any) => void;
    }) {
        const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setValue(e.target.value);
        }
    return(
        <div className={styles.container}>
            <label><p>{label}</p></label>
            <select value={value} onChange={onChange}>
                <option></option>
                {options&&options.map((option)=> {
                return(
                    <option key={option.value} value={option.value}>{option.key}</option>
                );
                })}
            </select>
        </div>
    );
}