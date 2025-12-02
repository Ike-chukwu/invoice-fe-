import { addDays } from "@/helper";
import { Invoice } from "@/services/invoice/types";
import React from "react";

type Props = {
  invoice?: Invoice;
};

const InvoiceDetailsBody = ({ invoice }: Props) => {
  return (
    <div
      id="invoice"
      className="bg-white h-[500px] overflow-y-scroll md:h-auto md:overflow-y-hidden rounded-lg py-3 px-4 md:px-6 w-full flex flex-col gap-6 md:gap-10"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-center w-full">
        <div>
          <p className="uppercase text-[14px] md:text-[16px] mb-2 text-[#0C0E16] font-bold">
            {invoice?.code}
          </p>
          <span className="block text-[12px] w-[200px] break-words whitespace-pre-line md:text-[14px] capitalize text-[#888EAF]">
            {invoice?.projectDescription}
          </span>
        </div>
        <div className="mt-6 md:mt-auto">
          <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
            {invoice?.streetAddressOfBusinessOwner},
          </p>
          <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
            {invoice?.cityOfBusinessOwner},
          </p>
          <p className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
            {invoice?.postCodeOfBusinessOwner}
          </p>
          <p className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
            {invoice?.countryOfBusinessOwner}
          </p>
        </div>
      </div>
      <div className="flex w-full justify-between md:justify-normal md:w-auto md:gap-[8rem]">
        <div className="flex flex-col items-start gap-9">
          <div className="">
            <p className="text-[12px] md:text-[14px] mb-2 capitalize text-[#888EAF]">
              Invoice Date
            </p>
            <p className="text-[14px] md:text-lg font-bold">
              {invoice?.invoiceDate &&
                new Date(invoice.invoiceDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
            </p>
          </div>
          <div className="">
            <p className="text-[12px] md:text-[14px] mb-2 capitalize text-[#888EAF]">
              Payment Due
            </p>
            <p className="text-[14px] md:text-lg font-bold">
              {invoice?.invoiceDate &&
                new Date(
                  addDays(invoice.invoiceDate, parseInt(invoice.paymentTerms))
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3">
          <div className="">
            <p className="text-[14px] mb-2 capitalize text-[#888EAF]">
              bill to
            </p>
            <p className="text-[14px] md:text-lg font-bold">
              {invoice?.clientName}
            </p>
          </div>
          <div className="flex flex-col items-start ">
            <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
              {invoice?.streetAddressOfClient}
            </p>
            <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
              {invoice?.cityOfClient}
            </p>
            <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
              {invoice?.postCodeOfClient}
            </p>
            <p className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
              {invoice?.countryOfClient}
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <p className="text-[14px] mb-2 capitalize text-[#888EAF]">sent to</p>
          <p className="text-[14px] md:text-lg font-bold">
            {invoice?.clientEmail}
          </p>
        </div>
      </div>
      <div className="block md:hidden">
        <p className="text-[14px] mb-2 capitalize text-[#888EAF]">sent to</p>
        <p className="text-[14px] md:text-lg font-bold">
          {invoice?.clientEmail}
        </p>
      </div>
      <div className="">
        <div className="hidden md:grid grid-cols-4 w-full gap-6 px-4 md:px-8 py-10 bg-[#F9FAFE] rounded-tl-md rounded-tr-md">
          <p className="text-[13px] hidden md:block text-[#888EAF]">
            Item Name
          </p>
          <p className="text-[13px] text-center hidden md:block  text-[#888EAF]">
            QTY.
          </p>
          <p className="text-[13px] hidden md:block text-center text-[#888EAF]">
            Price
          </p>
          <p className="text-[13px] text-right hidden md:block text-[#888EAF]">
            Total
          </p>
          {invoice?.itemsList?.map((item) => (
            <>
              {/* <div className="w-full item flex-col md:flex-row gap-2 flex  md: justify-between"> */}
              <p className="text-[13px] hidden md:block md:text-[14px] font-bold">
                {item.itemName}
              </p>
              <p className="text-[13px] text-center hidden md:block md:text-[14px] text-black font-bold">
                {item.itemQuantity}
                <span className="mr-1 text-[#888EAF] md:hidden inline">x</span>
              </p>
              <p className="text-[13px] hidden text-center md:block md:text-[14px] text-black font-bold">
                ${item.itemPrice}.00
              </p>

              <p className="text-[13px] hidden md:block md:text-[14px] text-right font-bold">
                ${`${(item.itemQuantity ?? 0) * (item.itemPrice ?? 0)}.00`}
              </p>
            </>
          ))}
        </div>
        <div className="md:hidden flex flex-col gap-6 px-4 md:px-8 py-10 bg-[#F9FAFE] w-full ">
          {invoice?.itemsList?.map((item) => (
            <div className="flex justify-between items-center ">
              <div className="flex flex-col  items-start md:hidden  ">
                <p className="text-[13px] md:text-[14px] font-bold">
                  {item.itemName}
                </p>
                <div>
                  <span className="text-[13px] text-[] md:text-[14px] text-[#888EAF] md:text-black font-bold">
                    {item.itemQuantity}
                    <span className="mr-1 text-[#888EAF] md:hidden inline">
                      x
                    </span>
                  </span>
                  <span className="text-[13px]  md:text-[14px] text-[#888EAF] md:text-black font-bold">
                    ${item.itemPrice}.00
                  </span>
                </div>
              </div>
              <p className="text-[13px] block md:hidden md:text-[14px] text-right font-bold">
                ${`${(item.itemQuantity ?? 0) * (item.itemPrice ?? 0)}.00`}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-white items-center w-full px-4 py-6 bg-[#373B53] rounded-bl-md rounded-br-md">
          <p className="text-[14px]">Amount Due</p>
          <p className="text-2xl font-bold">
            $
            {invoice?.itemsList?.reduce((acc, item) => {
              return (item?.itemQuantity ?? 0) * (item?.itemPrice ?? 0) + acc;
            }, 0)}
            .00
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsBody;
