import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchNormal1 } from "iconsax-reactjs";

const TableSearch = ({ showButton = false }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <SearchNormal1
          className="absolute left-3 top-1/2 transform -translate-y-1/2 "
          size={20}
        />
        <Input type="text" placeholder="Search" className="pl-10 " size={40} />
      </div>
      {showButton && <Button>Search</Button>}
    </div>
  );
};

export default TableSearch;
