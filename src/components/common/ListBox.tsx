import { SortType } from "types";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  ChevrondownIconOutline,
  ChevronupIconOutline,
  CheckIconOutline,
} from "assets/icons";

const sortByList: SortType[] = [
  { _id: "1", name: "Best Match", lable: "", order: "asc" },
  { _id: "2", name: "Best Seller", lable: "", order: "asc" },
  { _id: "3", name: "Price Low", lable: "price", order: "asc" },
  { _id: "4", name: "Price High", lable: "price", order: "desc" },
];

type ListBoxProps = {
  onSort: (sortType: SortType) => void;
};

const ListBox = ({ onSort }: ListBoxProps) => {
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState(sortByList[0]);

  const handleSelected = (event: SortType) => {
    setSelected(event);
    onSort(event);
  };
  const handleClick = (clicked: boolean) => setClicked(!clicked);

  return (
    <div className="top-16 w-40">
      <Listbox
        value={selected}
        onChange={(event: SortType) => handleSelected(event)}
      >
        <div className="relative mt-1">
          <Listbox.Button
            onClick={() => handleClick(clicked)}
            className="relative w-full cursor-pointer rounded-lgbg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm"
          >
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {clicked ? <ChevronupIconOutline /> : <ChevrondownIconOutline />}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm lg:text-md z-50">
              {sortByList.map((sortItem: SortType) => (
                <Listbox.Option
                  key={sortItem._id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-purple-100 text-purple-900" : "text-gray-900"
                    }`
                  }
                  value={sortItem}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {sortItem.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                          <CheckIconOutline />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ListBox;
