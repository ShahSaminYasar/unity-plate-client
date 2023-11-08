import { useState } from "react";
import useSettings from "../../hooks/useSettings";

const FilterGroup = ({ setSortOrder }) => {
  const { borderColor, bgColorAlt } = useSettings();
  const [searchText, setSearchText] = useState("");
  return (
    <div className="w-full flex flex-row justify-between items-center gap-4 mb-10">
      <div>
        <select
          onChange={(e) => {
            setSortOrder(e.target.value);
          }}
          className={`py-2 px-3 pe-9 block border-2 ${borderColor} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
        >
          <option value="asc" selected>
            ↑ Expiry date (asc)
          </option>
          <option value="desc">↓ Expiry date (desc)</option>
        </select>
      </div>

      <div>
        <form
          className={`flex flex-row gap-0 items-center rounded-md overflow-hidden border-2 ${borderColor}`}
        >
          <input
            type="text"
            placeholder="Search here"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-2 text-base text-slate-800 bg-white outline-none"
          />
          <button type="submit" className={`p-2 ${bgColorAlt} text-white`}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
export default FilterGroup;
