import { FurnitureType } from "../furnitureSlice/furnitueTypes";

export type FilterParamsType = {
  category?: string;
  installment?: string;
  page: string;
};

export interface FilterSliceStateType {
  items: {
    data: FurnitureType[] | null;
    status: "success" | "error" | "loading";
 
  };
}
