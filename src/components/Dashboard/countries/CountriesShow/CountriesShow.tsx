import syles from "./countriesShow.module.css";
import CountriesTable from "./CountriesTable";
import AddCountry from "../AddCountry/AddCountry";
import { getCountries } from "@/apiFetching/countries/getCountries";

export default async function CountriesShow() {
    const getCountriesFun = await getCountries();
    return(
        <div className={syles.container}>
            <AddCountry />
            {
                !getCountriesFun.data ? 
                <p className={syles.error}>{getCountriesFun.error}</p> : 
                <CountriesTable countriesData={getCountriesFun.data} />
            }
        </div>
    );
}