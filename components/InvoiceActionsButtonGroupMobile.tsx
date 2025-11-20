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

const InvoiceActionsButtonGroupMobile = ({
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
    <div className="absolute md:hidden bottom-0 bg-white rounded-lg py-6 px-4 md:px-6 w-full flex justify-between items-center">
      <div className="w-full md:w-auto justify-between md:justify-normal flex gap-2 items-center">
        <button
          onClick={toggleNav}
          className="text-xs p-4 md:px-6 py-4  capitalize rounded-3xl text-[#7E88C3] bg-[#DFE3FA]"
        >
          edit
        </button>
        <button
          onClick={() => {
            setIsDeleteModalActive(true);
          }}
          className="text-xs p-4 md:px-6 py-4 capitalize rounded-3xl bg-red-500 font-bold text-white"
        >
          delete
        </button>
        <button
          onClick={changeStatusHandler}
          disabled={invoice?.status == "paid" || isInvoiceStatusChangeSuccess}
          className={
            "text-xs p-4 md:px-6 py-4 rounded-3xl font-bold bg-[#7c5dfa] text-white " +
            (invoice?.status == "paid" ? "opacity-50" : "opacity-100")
          }
        >
          {isChangingInvoiceStatus ? "Please wait..." : " Mark as Paid"}
        </button>
      </div>
    </div>
  );
};

export default InvoiceActionsButtonGroupMobile;
