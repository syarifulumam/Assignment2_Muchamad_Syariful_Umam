import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";

const CardCountry = ({ country }) => {
  return (
    <>
      <Link to={`/detail/${country.name.common}`} key={country.name.common}>
        <Card className="md:w-72">
          <img
            src={country.flags.svg}
            alt=""
            className="object-cover md:h-48 md:w-full"
          />
          <CardHeader>
            <CardTitle className="truncate h-10">
              {country.name.common}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Population : {country.population.toLocaleString()}</p>
            <p>Region : {country.region}</p>
            <p>Capital : {country.capital}</p>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default CardCountry;
