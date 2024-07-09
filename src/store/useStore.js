import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      countries: [],
      filterCountry: [],
      region: null,
      page: 0,
      itemOffset: 0,
      search: "",
      setSearch: (data) => set((state) => ({ search: data })),
      setPage: (data) => set((state) => ({ page: data })),
      setItemOffset: (data) => set((state) => ({ itemOffset: data })),
      setRegion: (data) => set((state) => ({ region: data })),
      setCountries: (data) => set((state) => ({ countries: data })),
      setFilteredCountry: (data) => set((state) => ({ filterCountry: data })),
      setKeyword: (keyword) =>
        set((state) => {
          if (state.region === null || state.region === "All") {
            return {
              itemOffset: 0,
              page: 0,
              filterCountry: [
                ...state.countries.filter((country) =>
                  country.name.common
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
                ),
              ],
            };
          } else {
            return {
              itemOffset: 0,
              page: 0,
              filterCountry: [
                ...state.countries.filter(
                  (country) =>
                    country.region === state.region &&
                    country.name.common
                      .toLowerCase()
                      .includes(keyword.toLowerCase())
                ),
              ],
            };
          }
        }),
      setFilterCountry: (region) =>
        set((state) => {
          if (region && region[0] !== "All") {
            return {
              filterCountry: [
                ...state.countries.filter(
                  (country) => country.region === region[0]
                ),
              ],
            };
          } else {
            return {
              filterCountry: [...state.countries],
            };
          }
        }),
    }),
    {
      name: "countries-storage", // name of the item in the storage (must be unique)
    }
  )
);

export default useStore;
