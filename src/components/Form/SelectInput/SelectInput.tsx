import styles from "./select.module.css";

export default function SelectInput({options}:{options: {key: string, value: string}[]|null}) {
    return(
        <select>
            {options&&options.map((option)=> {
                return(
                    <option key={option.value} value={option.value}>{option.key}</option>
                );
            })}
        </select>
    );
}