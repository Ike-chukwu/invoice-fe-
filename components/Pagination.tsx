import { useRouterQuery } from "@/hooks/useRouterQuery";
import React from "react";
import { SeachParams } from "@/constants/index";

type Props = {
  pageCount?: number;
  currentPage?: string;
};

const Pagination = ({ currentPage, pageCount }: Props) => {
  const { changeQuery } = useRouterQuery();

  return (
    <div className="pt-[3rem] md:pt-0 flex w-full justify-between  mt-auto">
      {Number(currentPage) > 1 && (
        <button
          onClick={() =>
            changeQuery(SeachParams.PAGE, Number(currentPage) - 1 + "")
          }
          className="text-[16px] bg-[#9277FF] px-4 py-2 capitalize rounded-full text-white"
        >
          previous
        </button>
      )}
      {!!pageCount && pageCount > Number(currentPage) && (
        <button
          onClick={() =>
            changeQuery(SeachParams.PAGE, Number(currentPage) + 1 + "")
          }
          className={
            "text-[16px] bg-[#9277FF] px-4 py-2 capitalize rounded-full text-white " +
            (Number(currentPage) > 1 ? "" : "ml-auto")
          }
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
