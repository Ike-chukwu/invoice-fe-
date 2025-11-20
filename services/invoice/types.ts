export type InvoiceResponse = {
  invoices: Invoice[];
};

export type Invoice = {
  code: string;
  streetAddressOfBusinessOwner: string;
  cityOfBusinessOwner: string;
  postCodeOfBusinessOwner: string;
  countryOfBusinessOwner: string;
  clientName: string;
  clientEmail: string;
  streetAddressOfClient: string;
  cityOfClient: string;
  postCodeOfClient: string;
  countryOfClient: string;
  dueDate: string;
  invoiceDate: string;
  paymentTerms: string;
  projectDescription: string;
  itemsList: Item[];
  status: string;
  _id: string;
  userId: string;
};

export type Item = {
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
  total?: number;
  _id: string;
  invoiceId: string;
};
