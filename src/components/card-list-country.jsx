import React from "react";
import CardCountry from "./card-country.jsx";
import { motion } from "framer-motion";

const CardListCountry = ({ currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((country) => (
          <motion.div
            key={country.name.common}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardCountry key={country.name.common} country={country} />
          </motion.div>
        ))}
    </>
  );
};

export default CardListCountry;
