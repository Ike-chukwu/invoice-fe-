import { Invoice } from "@/services/invoice/types";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  invoice?: Invoice;
  setIsDeleteModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  isDeleteModalActive: boolean;
  deleteInvoice: (id: string) => void;
};

const DeleteInvoiceModal = ({
  invoice,
  id,
  setIsDeleteModalActive,
  isDeleteModalActive,
  deleteInvoice,
}: Props) => {
  const { push } = useRouter();

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={
        "bg-white rounded-lg transition-all duration-800 ease-in flex-col z-50 w-[280px]  md:w-[400px] p-7 lg:p-10 flex gap-4 items-start " +
        (isDeleteModalActive
          ? "translate-y-0 opacity-100 "
          : "translate-y-[200px] opacity-0")
      }
    >
      <h2 className="text-[14px] md:text-[20px] font-bold">Confirm Deletion</h2>
      <p className="text-[12px] md:text-[14px] text-[#000000]">
        {`Are you sure you want to delete invoice ${invoice?.code}? This action cannot
            be undone.`}
      </p>
      <div className="self-end flex gap-2">
        <button
          onClick={() => {
            setIsDeleteModalActive(false);
          }}
          className="text-xs p-4 md:px-6 py-4  capitalize rounded-3xl text-[#7E88C3] bg-[#f9fafe] hover:bg-[#DFE3FA]"
        >
          cancel
        </button>
        <button
          onClick={() => {
            deleteInvoice(id.toString());
            push("/");
          }}
          className="text-xs p-4 md:px-6 py-4 capitalize rounded-3xl bg-red-500 font-bold text-white"
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default DeleteInvoiceModal;
