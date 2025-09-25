"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchNormal1, CloseCircle } from "iconsax-reactjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TableSearch = ({ showButton = false }) => {
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const searchValue = searchParams?.get("query") || "";

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (search) {
      params.set("query", search);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    setSearch("");
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <SearchNormal1
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search"
          className="pl-10 pr-10"
          size={40}
          value={search}
          defaultValue={searchValue}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        {search && (
          <Button
            variant="ghost"
            onClick={handleClear}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <CloseCircle size={20} />
          </Button>
        )}
      </div>
      {showButton && <Button onClick={handleSearch}>Search</Button>}
    </div>
  );
};

export default TableSearch;
