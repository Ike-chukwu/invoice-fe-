import React from "react";
import SmallInvoiceCard from "./InvoiceCards/SmallInvoiceCard";
import LargeInvoiceCard from "./InvoiceCards/LargeInvoiceCard";
import { Invoice } from "@/services/invoice/types";

type Props = {
  invoices: Invoice[] | undefined;
};

const InvoiceList = ({ invoices }: Props) => {
  return (
    <div>
      {/* <div className="h-[600px] overflow-y-auto"> */}
      <div className="hidden h-full md:flex flex-col gap-4 w-full">
        {invoices?.map((invoice) => (
          <LargeInvoiceCard key={invoice._id} invoice={invoice} />
        ))}
      </div>
      <div className="flex pt-[2.5rem] md:hidden flex-col gap-4 w-full">
        {invoices?.map((invoice) => (
          <SmallInvoiceCard key={invoice._id} invoice={invoice} />
        ))}
      </div>
    </div>
  );
};

export default InvoiceList;
