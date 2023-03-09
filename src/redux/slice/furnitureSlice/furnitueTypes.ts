export type ParamsType = {
  category: string;
  postLimit: number;
};

type RecomendationItemType = {
  id: string;
  imageUrl: string;
  title: string;
  desc: string;
  category: string;
  price: string;
  oldPrice: string;
  productCode: string;
  itemInStock: boolean;
  rating: string;
  count?: number;
};

export type FurnitureType = {
  id: string;
  imageUrl: string;
  title: string;
  desc: string;
  category: string;
  price: string;
  oldPrice: string;
  productCode: string;
  itemInStock: boolean;
  rating: string;
  recomendation?: RecomendationItemType[];
  count?: number;
};

export interface FurnitureSliceStateType {
  items: FurnitureType[];
  status: "success" | "error" | "loading";
}
