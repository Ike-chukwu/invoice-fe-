"use client";
import { invoicePayload } from "@/types/schema";
import { v4 as uuidv4 } from "uuid";
import Form from "@/components/Form";
import { addDays, generateCode } from "@/helper";
import WithAuth from "@/components/ProtectedRoute";
import { useCreateInvoice, useGetListOfInvoices } from "@/hooks/useInvoice";
import { toast } from "sonner";
import { useNavStore } from "../../stores/nav-store";
import { useEffect, useRef, useState } from "react";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { SeachParams } from "@/constants/index";
import Loader from "@/components/Loader";
import InvoiceHeader from "@/components/InvoiceHeader";
import InvoiceEmptyState from "@/components/InvoiceEmptyState";
import InvoiceList from "@/components/InvoiceList";
import Pagination from "@/components/Pagination";

const Home = () => {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const { getQuery, changeQueries } = useRouterQuery();
  const currentFilter = getQuery(SeachParams.STATUS) || "all";
  const page = getQuery(SeachParams.PAGE) || "1";
  const [showFilters, setShowFilters] = useState(false);
  const isNavActive = useNavStore((state) => state.isNavActive);
  const toggleNav = useNavStore((state) => state.toggleNav);

  const {
    invoices,
    isPending: isListOfIvoicesLoading,
    page: currentPage,
    pageCount,
    totalCount
  } = useGetListOfInvoices(currentFilter, page);

  const { createInvoice, isPending: isCreating } = useCreateInvoice({
    onSuccess: () => toast.success("Invoice successfully created"),
    onError: () => toast.error("Invoice cannot be created"),
  });

  const onSubmit = (values: invoicePayload) => {
    const randomCode = generateCode();
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

    createInvoice({
      id: uuidv4(),
      code: randomCode,
      ...values,
      invoiceDate: values.invoiceDate,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      itemsList: formatedItemsList,
      status: "pending",
    });
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        showFilters &&
        bodyRef.current &&
        !bodyRef.current.contains(e.target as Node)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showFilters]);

  useEffect(() => {
    changeQueries({ [SeachParams.STATUS]: "all", page: "1" });
  }, []);

  if (isListOfIvoicesLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#F8F8FB] w-full min-h-[100vh] flex justify-center ">
      <div className="pt-[7.5rem] relative pb-[4rem] px-4 lg:px-10 lg:py-20 w-full lg:w-[800px] mx-auto flex md:gap-10 flex-col items-start">
        <InvoiceHeader
          length={totalCount}
          setShowFilters={setShowFilters}
          showFilters={showFilters}
          ref={bodyRef}
        />
        <div className="flex flex-col gap-4 w-full">
          {invoices?.length == 0 ? (
            <InvoiceEmptyState />
          ) : (
            <InvoiceList invoices={invoices} />
          )}
        </div>
        <Pagination currentPage={currentPage} pageCount={pageCount} />
      </div>
      <div
        className={
          "bg-overlay-color transition-all duration-1000 fixed inset-0 min-h-[100vh] w-full z-20 " +
          (isNavActive ? "opacity-100 block" : "opacity-0 hidden")
        }
        onClick={toggleNav}
      ></div>
      <Form submitFormHandler={onSubmit} />
    </div>
  );
};

export default WithAuth(Home);
