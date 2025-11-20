import React from "react";
import InvoiceActions from "./InvoiceActions";

type Props = {
  length?: number;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  showFilters: boolean;
};

const InvoiceHeader = React.forwardRef<HTMLDivElement, Props>(
  ({ length, setShowFilters, showFilters }, ref) => {
    return (
      <div className="flex justify-between items-center w-full">
        <div className="">
          <h1 className="text-[#0C0E16] text-[16px] font-bold md:mb-2 lg:text-3xl capitalize">
            invoices
          </h1>
          <span className="text-xs text-[#8F95B2]">
            {length} total invoices
          </span>
        </div>
        <InvoiceActions
          setShowFilters={setShowFilters}
          showFilters={showFilters}
          ref={ref}
        />
      </div>
    );
  }
);

export default InvoiceHeader;
