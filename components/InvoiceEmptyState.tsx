import Image from "next/image";
import React from "react";

const InvoiceEmptyState = () => {
  return (
    <>
      <Image
        src="/assets/illustration-empty.svg"
        height={300}
        alt="empty state of invoices"
        width={400}
        className="w-[270px] pt-10 mx-auto"
      />

      <div className="flex flex-col py-5 text-center items-center gap-4">
        <p className="text-[18px] font-bold">There is nothing here</p>
        <p className="text-[13px] text-[#888eb0]">
          Create a new invoice by clicking the New <br /> Invoice button and get
          started
        </p>
      </div>
    </>
  );
};

export default InvoiceEmptyState;
