
import { FurnitureType } from "../furnitureSlice/furnitueTypes";

export interface FilterSliceStateType {
  items: {
    data: FurnitureType[] | null;
    status: "success" | "error" | "loading";
  };
  filter: string;
  category: string;
  currentPage: number;
  installment: boolean;
  manufacturer: string;
  sort: Sort;
}

export type FilterParams = {
  sortBy: string;
  order: string;
  category: string;
  currentPage: number;
  filter: string;
  installment: boolean;
  manufacturer: string;
};

export type Sort = {
  name: string;
  sortBy: string;
};
