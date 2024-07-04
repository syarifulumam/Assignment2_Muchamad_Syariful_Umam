import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import useStore from "./store/useStore.js";
import { Input } from "./components/ui/input.jsx";
import { FilterRegion } from "./components/filter-region.jsx";
import CardListCountry from "./components/card-list-country.jsx";
import ReactPaginate from "react-paginate";
import useFetch from "./api/useFetch.js";
import { Skeleton } from "./components/skeleton.jsx";
import { AnimatePresence } from "framer-motion";
import { NotFound } from "./components/not-found.jsx";

const Home = () => {
  const setKeyword = useStore((state) => state.setKeyword);
  return (
    <>
      <div className="flex flex-col md:flex-row mb-4 items-center justify-between container">
        <div className="flex w-full md:w-72 items-center py-4 relative">
          <Search className="absolute left-2 top-9 transform -translate-y-1/2 h-4 w-4" />
          <Input
            placeholder="Search for a country..."
            className="max-w-sm pl-8 bg-primary"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <FilterRegion />
      </div>
      <div className="container flex flex-wrap gap-3" id="container">
        <PaginatedItems itemsPerPage={8} />
      </div>
    </>
  );
};

function PaginatedItems({ itemsPerPage }) {
  const countries = useStore((state) => state.countries);
  const filterCountry = useStore((state) => state.filterCountry);
  const filteredCountry = useStore((state) => state.setFilteredCountry);
  const setCountries = useStore((state) => state.setCountries);
  const { data, loading, error } = useFetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,cca3,borders,currencies,languages,subregion,tld"
  );

  const page = useStore((state) => state.page);
  const setPage = useStore((state) => state.setPage);
  const itemOffset = useStore((state) => state.itemOffset);
  const setItemOffset = useStore((state) => state.setItemOffset);

  const getCountry = filterCountry.length === 0 ? countries : filterCountry;
  // const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = getCountry.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(getCountry.length / itemsPerPage);

  useEffect(() => {
    if (data) {
      setCountries(data);
      filteredCountry(data);
    }
    filteredCountry(getCountry);
  }, [data]);

  // if (filterCountry.length === 0) return <NotFound />;

  if (loading) return <Skeleton />;

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % getCountry.length;
    setPage(event.selected);
    setItemOffset(newOffset);
  };

  return (
    <>
      <AnimatePresence>
        <CardListCountry currentItems={currentItems} />
      </AnimatePresence>

      <ReactPaginate
        breakLabel="" // ...
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={0}
        forcePage={page}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="my-5"
        pageLinkClassName="py-2 px-4 bg-primary border border-grey rounded-md"
        previousClassName="text-primary-foreground my-5"
        previousLinkClassName="py-2 px-4 bg-primary border border-grey rounded-md"
        nextClassName="page-item my-5"
        nextLinkClassName="py-2 px-4 bg-primary border border-grey rounded-md"
        // breakClassName="page-item"
        // breakLinkClassName="py-2 px-4 bg-primary rounded-md"
        containerClassName="mx-auto flex w-full justify-center items-center gap-5"
        activeClassName="active font-black dark:brightness-200"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Home;
