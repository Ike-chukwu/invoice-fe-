import { Invoice } from "@/services/invoice/types";
import React from "react";

type Props = {
  invoice?: Invoice;
};

const InvoiceStatus = ({ invoice }: Props) => {
  return (
    <div className="flex w-full justify-between md:justify-normal md:w-auto gap-4 items-center">
      <span className="text-xs capitalize text-[#888EAF]">status</span>
      {invoice?.status == "paid" && (
        <div className="text-green-400 justify-center w-[5rem] py-2 text-[12px] bg-[#F5FDFA] flex gap-2 items-center text-bold rounded-md capitalize">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span>{invoice?.status}</span>
        </div>
      )}
      {invoice?.status == "pending" && (
        <div className="text-[#FF8F00] justify-center w-[5rem] py-2 text-[12px] bg-[#FFF9F2] flex gap-2 items-center text-bold rounded-md capitalize">
          <div className="w-2 h-2 rounded-full bg-[#FF8F00]"></div>
          <span>{invoice?.status}</span>
        </div>
      )}
      {invoice?.status == "draft" && (
        <div className="text-[#373B53] justify-center w-[5rem] py-2 text-[12px] bg-[#F5F5F6] flex gap-2 items-center text-bold rounded-md capitalize">
          <div className="w-2 h-2 rounded-full bg-[#373B53]"></div>
          <span>{invoice?.status}</span>
        </div>
      )}
      {invoice?.status == "unpaid" && (
        <div className="text-[#EF4444] justify-center w-[5rem] py-2 text-[12px] bg-[#FEF2F2] flex gap-2 items-center text-bold rounded-md capitalize">
          <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
          <span>{invoice?.status}</span>
        </div>
      )}
    </div>
  );
};

export default InvoiceStatus;
