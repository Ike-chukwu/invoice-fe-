export enum STATUS {
  draft = "draft",
  pending = "pending",
  paid = "paid",
}

export enum SeachParams {
  STATUS = "status",
  PAGE = "page",
}

export const filterTexts = [
  {
    id: 0,
    title: "draft",
  },
  {
    id: 1,
    title: "pending",
  },
  {
    id: 2,
    title: "paid",
  },
  {
    id: 3,
    title: "unpaid",
  },
];
