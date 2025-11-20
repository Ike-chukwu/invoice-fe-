import { InvoiceService } from "@/services/invoice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { send } from "process";

export const useCreateInvoice = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: async (variables: any) => {
      return InvoiceService.createInvoice(variables);
    },
    mutationKey: ["createInvoice"],
    onSuccess: (data) => {
      onSuccess?.();
      queryClient.refetchQueries({ queryKey: ["fetchListOfInvoices"] });
    },
    onError: (error) => {
      console.log(error);

      onError?.();
    },
  });

  return {
    createInvoice: mutate,
    isError,
    isSuccess,
    isPending,
  };
};

export const useEditInvoice = ({
  onSuccess,
  onError,
  id,
}: {
  onSuccess: () => void;
  onError: () => void;
  id: string;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: (variables: any) => InvoiceService.editInvoice(variables),
    mutationKey: ["editInvoice"],
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["fetchListOfInvoices"] });
      queryClient.refetchQueries({ queryKey: ["fetchListOfInvoices"] });
      queryClient.invalidateQueries({ queryKey: ["getInvoiceById", id] });
    },
    onError: (error) => {
      console.log(error);
      onError?.();
    },
  });

  return { editInvoice: mutate, isError, isPending, isSuccess };
};

export const useGetListOfInvoices = (status: string, page: string) => {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryFn: () => {
      return InvoiceService.fetchListOfInvoices(status, page);
    },
    queryKey: ["fetchListOfInvoices", status, page],
  });
  return {
    invoices: data?.data?.data.invoices,
    page: data?.data?._metadata.page,
    pageCount: data?.data?._metadata.page_count,
    totalCount: data?.data?._metadata.total_count,
    isError,
    isSuccess,
    isPending,
  };
};

export const useGetInvoiceById = (id: string) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => {
      return InvoiceService.fetchInvoiceById(id);
    },
    queryKey: ["getInvoiceById", id],
    enabled: !!id,
  });

  return {
    invoice: data?.data.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useChangeInvoiceStatus = ({
  onSuccess,
  onError,
  id,
}: {
  onSuccess: () => void;
  onError: () => void;
  id: string;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (variables: any) =>
      InvoiceService.changeInvoiceStatus(variables),
    mutationKey: ["changeInvoiceStatus"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchListOfInvoices"] });
      queryClient.refetchQueries({ queryKey: ["fetchListOfInvoices"] });
      queryClient.invalidateQueries({ queryKey: ["getInvoiceById", id] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  return {
    changeInvoiceStatus: mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export const useDeleteInvoice = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: (id: string) => InvoiceService.deleteInvoice(id),
    mutationKey: ["deleteInvoice"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchListOfInvoices"] });
      // queryClient.refetchQueries({ queryKey: ["fetchListOfInvoices"] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  return {
    deleteInvoice: mutate,
    isError,
    isPending,
    isSuccess,
  };
};

export const useSendInvoiceViaEmail = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (variables: {
      invoiceId: string;
      clientEmail: string;
      // businessEmail: string;
    }) => InvoiceService.sendInvoiceViaEmail(variables),
    mutationKey: ["sendInvoiceViaEmail"],
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  return {
    sendMail: mutate,
    isPending,
  };
};
