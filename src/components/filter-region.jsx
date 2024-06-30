import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useStore from "@/store/useStore.js";

const countries = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Africa",
    label: "Africa",
  },
  {
    value: "Americas",
    label: "Americas",
  },
  {
    value: "Asia",
    label: "Asia",
  },
  {
    value: "Europe",
    label: "Europe",
  },
  {
    value: "Oceania",
    label: "Oceania",
  },
];

export function FilterRegion() {
  const [open, setOpen] = useState(false);
  const region = useStore((state) => state.region);
  const setRegion = useStore((state) => state.setRegion);
  const setFilterCountry = useStore((state) => state.setFilterCountry);
  const setItemOffset = useStore((state) => state.setItemOffset);
  const setPage = useStore((state) => state.setPage);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="md:w-[200px] w-full  justify-between bg-primary"
        >
          {region || "Filter by Region"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-[200px] min-w-full  p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No Country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(currentValue) => {
                    setPage(0);
                    setItemOffset(0);
                    setFilterCountry(
                      currentValue === region ? [] : [currentValue]
                    );
                    setRegion(currentValue === region ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      region === country.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
