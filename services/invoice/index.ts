import { ApiResponse, PaginatedApiResponse } from "./../generalType";
import { API_URL_V1, axiosInstance } from "@/constants";
import { Invoice, InvoiceResponse } from "./types";

export class InvoiceService {
  private static INVOICE_URL = `${API_URL_V1}/invoice`;
  private static INVOICE_BY_ID_URL = `${API_URL_V1}/getInvoiceById`;

  public static createInvoice(payload: any) {
    return axiosInstance.post(this.INVOICE_URL, payload);
  }

  public static fetchListOfInvoices(status: String, page: string) {
    return axiosInstance.get<PaginatedApiResponse<InvoiceResponse>>(
      `${this.INVOICE_URL}/?status=${status}&page=${page}`
    );
  }

  public static fetchInvoiceById(id: string) {
    return axiosInstance.get<ApiResponse<Invoice>>(
      `${this.INVOICE_BY_ID_URL}/${id}`
    );
  }
  public static duplicateInvoice(id: string) {
    return axiosInstance.post<ApiResponse<Invoice>>(`/duplicateInvoice/${id}`);
  }

  public static editInvoice(editedInvoice: any) {
    return axiosInstance.patch(this.INVOICE_URL, editedInvoice);
  }

  public static changeInvoiceStatus(editedInvoice: any) {
    return axiosInstance.patch(`/editInvoiceStatus`, editedInvoice);
  }

  public static deleteInvoice(id: string) {
    return axiosInstance.delete(this.INVOICE_URL, { params: { id } });
  }

  public static sendInvoiceViaEmail(payload: {
    invoiceId: string;
    clientEmail: string;
  }) {
    return axiosInstance.post("/sendEmail", payload);
  }
}
