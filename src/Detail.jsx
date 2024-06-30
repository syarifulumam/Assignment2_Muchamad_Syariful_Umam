import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/button.jsx";
import { MoveLeft } from "lucide-react";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import useStore from "./store/useStore.js";
import { getCurrency, getLanguage } from "./lib/getValueObjKey.js";

const Detail = () => {
  const { nameCountry } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const countries = useStore((state) => state.countries);
  const [country, setCountry] = useState([]);
  const borders = countries
    .filter((item) => country.borders?.includes(item.cca3))
    .map((item) => item.name.common);
  const [currencies, setCurrencies] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const filterCountry = countries.filter(
      (item) => item.name.common === nameCountry
    )[0];
    setIsLoading(true);
    setCountry(filterCountry);
    setCurrencies(getCurrency(filterCountry.currencies));
    setLanguages(getLanguage(filterCountry.languages));
    setIsLoading(false);
  }, [nameCountry]);

  if (isLoading) return "Loading...";

  return (
    <section className="container mt-10">
      <Link to="/">
        <Button className="drop-shadow-md border border-gray-200 w-28 dark:border-gray-700">
          <MoveLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>
      <div className="mt-14 flex flex-col md:flex-row md:gap-28">
        <img src={country.flags?.svg} alt="" className="md:w-2/5" />
        <div className="max-w-xl">
          <CardHeader>
            <CardTitle>{country.name?.common}</CardTitle>
          </CardHeader>
          <CardContent className="md:my-7 flex flex-col md:flex-row gap-2 md:gap-0 flex-wrap">
            <p className="w-1/2">
              Native Name:{" "}
              {
                country?.name?.nativeName[
                  Object?.keys(country?.name?.nativeName)[0]
                ].official
              }
            </p>
            <p className="w-1/2">Population: {country.population}</p>
            <p className="w-1/2">Region: {country.region}</p>
            <p className="w-1/2">Sub Region: {country.subregion}</p>
            <p className="w-1/2">Capital: {country.capital}</p>
            <p className="w-1/2">Top Level Domain: {country.tld}</p>
            <p className="w-1/2">Curencies: {currencies.toString()}</p>
            <p className="w-1/2">Languages: {languages.toString()}</p>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row gap-2 items-start">
            <p>Border Countries: </p>
            <div className="flex flex-wrap gap-3">
              {borders &&
                borders.map((item, i) => {
                  return (
                    <Link to={`/detail/${item}`} key={i}>
                      <Button
                        className="drop-shadow-md border border-gray-200 px-3 md:ml-4 dark:border-gray-700"
                        size="sm"
                      >
                        {item}
                      </Button>
                    </Link>
                  );
                })}
            </div>
          </CardFooter>
        </div>
      </div>
    </section>
  );
};

export default Detail;
