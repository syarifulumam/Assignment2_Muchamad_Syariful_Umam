import React from "react";

export const NotFound = () => {
  return (
    <div className="flex w-full m-auto mt-10 flex-col items-center justify-center gap-10">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        Data Tidak di Temukan
      </h1>
      <img src="search.svg" alt="not-found" className="md:w-1/2" />
    </div>
  );
};
