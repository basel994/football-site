import styles from "./championshipsShow.module.css";
import Image from "next/image";
import CountryDelete from "./CountryMutation/CountryDelete";
import { CountryType } from "@/types/countryType";
import CountryUpdate from "./CountryMutation/CountryUpdate";

export default function CountriesTable({countriesData}: {countriesData: CountryType[]}) {
    return(
        <table className={styles.table}>
            <thead>
                <tr>
                    <th><p>التسلسل</p></th>
                    <th><p>المنتخـب</p></th>
                    <th><p>الشعــار</p></th>
                    <th><p>تعـديل</p></th>
                    <th><p>حــذف</p></th>
                </tr>
            </thead>
            <tbody>
                {
                    countriesData.map((countryObject, index) => {
                        return(
                            <tr key={countryObject.id}>
                                <td><p>{index + 1}</p></td>
                                <td><p>{countryObject.name}</p></td>
                                <td>
                                    <Image src={countryObject.logo} 
                                    alt="" 
                                    width={30} 
                                    height={30} />
                                </td>
                                <td>
                                    <CountryUpdate id={countryObject.id} name={countryObject.name} />
                                </td>
                                <td>
                                    <CountryDelete id={countryObject.id} name={countryObject.name}/>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}