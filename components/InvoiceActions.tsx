import { useRouterQuery } from "@/hooks/useRouterQuery";
import React from "react";
import { ArrowDownIcon, PlusIcon } from "./icons";
import { filterTexts, SeachParams } from "@/constants/index";
import { useNavStore } from "@/stores/nav-store";

type Props = {
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  showFilters: boolean;
};

const InvoiceActions = React.forwardRef<HTMLDivElement, Props>(
  ({ setShowFilters, showFilters }, ref) => {
    const { changeQueries, getQuery } = useRouterQuery();
    const currentFilter = getQuery(SeachParams.STATUS) || "all";
    const toggleNav = useNavStore((state) => state.toggleNav);

    return (
      <div className="flex gap-10 md:gap-16 items-center">
        <div className="relative" ref={ref}>
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => setShowFilters((showFilters) => !showFilters)}
          >
            <span className="text-xs font-bold text-[#0C0E16]">
              Filter <span className="hidden md:inline">by status</span>
            </span>
            <ArrowDownIcon />
          </div>
          <div
            className={`absolute top-[150%] flex flex-col gap-3 left-[-20px] py-5 right-0 w-[170px] p-4 bg-white rounded-[15px] shadow-xl ${
              showFilters ? "block" : "hidden"
            } shadow-lg`}
          >
            {filterTexts.map((filter) => (
              <div className="flex items-center w-full">
                <input
                  name={filter.title}
                  id={filter.title}
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      changeQueries({
                        [SeachParams.STATUS]: filter.title,
                        [SeachParams.PAGE]: 1,
                      });
                    } else {
                      changeQueries({
                        [SeachParams.STATUS]: "all",
                        [SeachParams.PAGE]: 1,
                      });
                    }
                    setShowFilters(false);
                  }}
                  className="accent-[#9277FF] cursor-pointer"
                  checked={currentFilter === filter.title}
                />
                <label
                  htmlFor={filter.title}
                  className="capitalize text-[15px] font-bold ml-3 cursor-pointer"
                >
                  {filter.title}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={toggleNav}
          className="py-2 hover:opacity-80 cursor-pointer px-2 bg-[#9277FF] rounded-[3rem] flex gap-3 items-center"
        >
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <PlusIcon />
          </div>
          <span className="text-white text-[14px]">
            New <span className="hidden md:inline">invoice</span>
          </span>
        </button>
      </div>
    );
  }
);

export default InvoiceActions;
