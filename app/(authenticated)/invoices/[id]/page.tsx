"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Form from "@/components/Form";
import { addDays } from "@/helper";
import { invoicePayload } from "@/types/schema";
import WithAuth from "@/components/ProtectedRoute";
import { useNavStore } from "@/stores/nav-store";
import {
  useDeleteInvoice,
  useEditInvoice,
  useGetInvoiceById,
} from "@/hooks/useInvoice";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import InvoiceDetailHeader from "@/components/InvoiceDetailHeader";
import InvoiceStatus from "@/components/InvoiceStatus";
import InvoiceActionsButtonGroupDesktop from "@/components/InvoiceActionsButtonGroupDesktop";
import InvoiceDetailsBody from "@/components/InvoiceDetailsBody";
import InvoiceActionsButtonGroupMobile from "@/components/InvoiceActionsButtonGroupMobile";
import ModalBackdrop from "@/components/UI/Modal";
import DeleteInvoiceModal from "@/components/DeleteModal";

const ReceiptPage = () => {
  const { id } = useParams();
  const { invoice, isLoading: isInvoiceLoading } = useGetInvoiceById(
    id.toString() || ""
  );
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const isNavActive = useNavStore((state) => state.isNavActive);
  const toggleNav = useNavStore((state) => state.toggleNav);
  const { editInvoice } = useEditInvoice({
    onSuccess: () => toast.success("Invoice has been edited successfully"),
    onError: () => toast.error("Invoice could not be edited"),
    id: id.toString(),
  });
  const { deleteInvoice, isPending: isDeletePending } = useDeleteInvoice({
    onSuccess: () => toast.success("Invoice successfully deleted"),
    onError: () => toast.error("Invoice failed to delete"),
  });

  const onSubmit = (values: invoicePayload) => {
    const formatedItemsList = values.itemsList?.map((item) => {
      return {
        ...item,
        total: (item.itemPrice ?? 0) * (item.itemQuantity ?? 0),
      };
    });
    let dueDate;
    const selectedPaymentTerm = values.paymentTerms;
    dueDate = addDays(values.invoiceDate, parseInt(selectedPaymentTerm));
    if (dueDate) {
      const date = new Date(dueDate);

      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "2-digit",
      };
      dueDate = date.toLocaleDateString("en-US", options);
    }

    editInvoice({
      _id: id.toString(),
      code: invoice?.code,
      ...values,
      invoiceDate: values.invoiceDate,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      itemsList: formatedItemsList,
      status: invoice?.status,
    });
  };

  //ADD ON HOVER EFFECT TO ALL BUTTONS AND ELEMENTS THAT REQUIRE IT
  //RESTYLE LOGIN AND SIGNUP PAGES
  if (isInvoiceLoading || isDeletePending) return <Loader />;

  return (
    <>
      <div className="bg-[#F8F8FB] px-4 md:px-10 w-full min-h-[100vh] flex justify-center ">
        <div className="py-[7.5rem] relative lg:py-20 w-[800px] mx-auto flex gap-10 flex-col items-start">
          <InvoiceDetailHeader id={id.toString()} invoice={invoice} />

          <div className="flex flex-col items-start gap-7 w-full">
            <div className="bg-white rounded-lg py-6 px-4 md:px-6 w-full flex justify-between items-center">
              <InvoiceStatus invoice={invoice} />
              <InvoiceActionsButtonGroupDesktop
                setIsDeleteModalActive={setIsDeleteModalActive}
                id={id.toString()}
                invoice={invoice}
              />
            </div>
            <InvoiceDetailsBody invoice={invoice} />
          </div>
          <InvoiceActionsButtonGroupMobile
            setIsDeleteModalActive={setIsDeleteModalActive}
            id={id.toString()}
            invoice={invoice}
          />
        </div>
      </div>
      <div
        className={
          "bg-overlay-color  transition-all duration-300 fixed inset-0 min-h-[100vh] w-full z-20 " +
          (isNavActive ? "opacity-100 block" : "opacity-0 hidden")
        }
        onClick={toggleNav}
      ></div>
      <ModalBackdrop
        isModalActive={isDeleteModalActive}
        setIsModalActive={setIsDeleteModalActive}
      >
        <DeleteInvoiceModal
          deleteInvoice={deleteInvoice}
          isDeleteModalActive={isDeleteModalActive}
          setIsDeleteModalActive={setIsDeleteModalActive}
          id={id.toString()}
          invoice={invoice}
        />
      </ModalBackdrop>
      <Form invoice={invoice} submitFormHandler={onSubmit} />
    </>
  );
};

export default WithAuth(ReceiptPage);
