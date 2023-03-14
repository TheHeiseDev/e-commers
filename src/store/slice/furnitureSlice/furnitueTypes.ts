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
  rating: Float32Array;
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
  rating: Float32Array;
  recomendation?: RecomendationItemType[] | null;
  count?: number;
};

// export interface FurnitureSliceStateType {
//   items: FurnitureType[] | null;
//   item: FurnitureType | null;
//   status: "success" | "error" | "loading";
// }
export interface FurnitureSliceStateType {
  items: {
    data: FurnitureType[] | null;
    status: "success" | "error" | "loading";
  } ,
  item: {
    data: FurnitureType | null;
    status: "success" | "error" | "loading";
  } ;
}
