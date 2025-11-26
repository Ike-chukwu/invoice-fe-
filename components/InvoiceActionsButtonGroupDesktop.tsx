import { generatePDF } from "@/app/utils/pdf";
import { useChangeInvoiceStatus } from "@/hooks/useInvoice";
import { Invoice } from "@/services/invoice/types";
import { useNavStore } from "@/stores/nav-store";
import React from "react";
import { toast } from "sonner";

type Props = {
  invoice?: Invoice;
  setIsDeleteModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const InvoiceActionsButtonGroupDesktop = ({
  invoice,
  setIsDeleteModalActive,
  id,
}: Props) => {
  const toggleNav = useNavStore((state) => state.toggleNav);

  const {
    changeInvoiceStatus,
    isPending: isChangingInvoiceStatus,
    isSuccess: isInvoiceStatusChangeSuccess,
  } = useChangeInvoiceStatus({
    onSuccess: () => toast.success("Invoice status successfully updated"),
    onError: () => toast.error("Invoice status update failed"),
    id: id.toString(),
  });

  const changeStatusHandler = () => {
    changeInvoiceStatus({
      ...invoice,
      status: "paid",
    });
  };
  return (
    <div className="hidden md:flex gap-2 items-center">
      {invoice?.status == "draft" && (
        <button
          onClick={toggleNav}
          className="text-xs p-4 md:px-6 py-4 hover:opacity-80  capitalize rounded-3xl text-white  bg-[#8899F3]"
        >
          edit
        </button>
      )}
      <button
        onClick={() => {
          setIsDeleteModalActive(true);
        }}
        className="text-xs p-4 md:px-6 py-4  hover:opacity-80 capitalize rounded-3xl bg-red-500 font-bold text-white"
      >
        delete
      </button>
      {invoice?.status !== "paid" && (
        <button
          className={
            "text-xs p-4 md:px-6 py-4 bg-[#7c5dfa] hover:opacity-80 rounded-3xl font-bold text-white " +
            (invoice?.status == "paid" ? "opacity-45" : "opacity-100")
          }
          onClick={changeStatusHandler}
          disabled={invoice?.status == "paid" || isInvoiceStatusChangeSuccess}
        >
          {isChangingInvoiceStatus ? "Please wait..." : " Mark as Paid"}
        </button>
      )}
      <button
        onClick={() => generatePDF("invoice")}
        className="text-xs p-4 md:px-6 py-4 capitalize hover:opacity-80 rounded-3xl bg-amber-500 text-white font-bold"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default InvoiceActionsButtonGroupDesktop;
