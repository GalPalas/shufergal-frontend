import { useState } from "react";
import { Listbox } from "@headlessui/react";
import {
  ChevrondownIconOutline,
  ChevronupIconOutline,
  PriceIconOutline,
} from "assets/icons";

const FilterPrice = () => {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(140);

  const handleClick = (clicked: boolean) => setClicked(!clicked);
  const handleChange = (e: any) => setValue(e.target.value);
  const handleClear = () => setValue(140);

  return (
    <Listbox>
      <div className="relative">
        <Listbox.Button
          onClick={() => handleClick(clicked)}
          className="flex items-center space-x-1 w-full cursor-pointer rounded-full bg-white border border-1 py-2 pl-3 pr-10 text-left"
        >
          <PriceIconOutline />
          <span>Price</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            {clicked ? <ChevronupIconOutline /> : <ChevrondownIconOutline />}
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute mt-1 w-40 max-h-100 overflow-auto rounded-md bg-white py-1 text-base shadow-lg lg:text-md z-50">
          <div className="flex flex-col justify-center items-center p-4">
            <label
              htmlFor="price-range"
              className="block mb-4 text-xl font-medium text-gray-900"
            >
              <span>{`$0 - ${value}+`}</span>
            </label>
            <div className="relative pb-2">
              <input
                id="price-range"
                type="range"
                value={value}
                min="0"
                max="140"
                onChange={(e) => handleChange(e)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="absolute top-5">$0</div>
              <div className="absolute top-5 right-0">$140</div>
            </div>
            <button
              className="underline cursor-pointer mt-2"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default FilterPrice;
