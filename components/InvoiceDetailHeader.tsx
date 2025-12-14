import Link from "next/link";
import React from "react";
import { ArrowLeftIcon } from "./icons";
// import { generatePDF } from "@/app/utils/pdf";
import { Invoice } from "@/services/invoice/types";
import { useSendInvoiceViaEmail } from "@/hooks/useInvoice";
import { toast } from "sonner";
import { generatePDF } from "@/app/utils/pdf";

type Props = {
  invoice?: Invoice;
  id: string;
};
const InvoiceDetailHeader = ({ id, invoice }: Props) => {
  const { sendMail, isPending: isSendingMail } = useSendInvoiceViaEmail({
    onSuccess: () => toast.success("Invoice sent successfully via email"),
    onError: () => toast.error("Failed to send invoice via email"),
  });
  const sendViaEmail = () => {
    sendMail({
      invoiceId: id,
      clientEmail: invoice?.clientEmail || "",
    });
  };

  return (
    <div className="w-full flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center gap-2 md:gap-4 hover:underline"
      >
        <ArrowLeftIcon />
        <span className="text-[14px] font-bold">Go back</span>
      </Link>
      <button
        onClick={() => generatePDF("invoice")}
        className="block md:hidden hover:opacity-80 text-xs p-4 md:px-6 py-4 capitalize rounded-3xl bg-amber-500 text-white font-bold"
      >
        Export as PDF
      </button>

      {invoice?.status === "pending" && (
        <button
          disabled={isSendingMail}
          onClick={sendViaEmail}
          className={
            "text-xs p-4 md:px-6 py-4 hover:opacity-80 capitalize rounded-3xl bg-blue-600 text-white font-bold " +
            (isSendingMail ? "opacity-50 cursor-not-allowed" : "opacity-100")
          }
        >
          {isSendingMail ? "Sending..." : "Send via Email"}
        </button>
      )}
    </div>
  );
};

export default InvoiceDetailHeader;
