import { useState } from "react";
import useSettings from "../../hooks/useSettings";

const FilterGroup = () => {
  const { borderColor, primaryColor } = useSettings();
  const [searchText, setSearchText] = useState("");
  return (
    <div className="flex flex-row justify-between items-center gap-4">
      <div>
        <form
          className={`flex flex-row gap-0 items-center rounded-md overflow-hidden border-2 ${borderColor}`}
        >
          <input
            type="text"
            placeholder="Search here"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-2 text-base text-slate-800 bg-white"
          />
          <button type="submit" className={`p-2 ${primaryColor} text-white`}>Search</button>
        </form>
      </div>
    </div>
  );
};
export default FilterGroup;
