import {
  useChangeInvoiceStatus,
  useDuplicateInvoice,
} from "@/hooks/useInvoice";
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

  const { duplicateInvoice, isPending: isDuplicatingInvoice } =
    useDuplicateInvoice({
      onSuccess: () =>
        toast.success("Invoice has successfully been duplicated"),
      onError: (err) => toast.error(err),
    });

  const duplicateInvoiceHandler = () => {
    invoice && duplicateInvoice(invoice?._id);
  };

  const changeStatusHandler = () => {
    changeInvoiceStatus({
      ...invoice,
      status: "paid",
    });
  };
  return (
    <div className="absolute md:hidden bottom-0 bg-white rounded-lg py-6 px-4 md:px-6 w-full flex justify-between items-center">
      <div className="w-full md:w-auto justify-between md:justify-normal flex gap-2 items-center">
        {invoice?.status == "draft" && (
          <button
            onClick={toggleNav}
            className="text-xs p-4 md:px-6 py-4  capitalize rounded-3xl text-white bg-[#8899F3]"
          >
            edit
          </button>
        )}
        <button
          onClick={() => {
            setIsDeleteModalActive(true);
          }}
          className="text-xs p-4 md:px-6 py-4 capitalize rounded-3xl bg-red-500 font-bold text-white"
        >
          delete
        </button>
        {invoice?.status !== "paid" && (
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
        )}
        {invoice?.status == "paid" && (
          <button
            onClick={duplicateInvoiceHandler}
            disabled={isDuplicatingInvoice}
            className="text-xs p-4 md:px-6 py-4  capitalize rounded-3xl text-white bg-[#33D69F]"
          >
            {isDuplicatingInvoice ? "Duplicating..." : "Duplicate Invoice"}
          </button>
        )}
      </div>
    </div>
  );
};

export default InvoiceActionsButtonGroupMobile;
