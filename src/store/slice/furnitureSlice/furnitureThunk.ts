import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";
import { FurnitureType, ParamsType } from "./furnitueTypes";

export const fetchFurnitures = createAsyncThunk(
  "furniture/fetchFurnitures",
  async (params: ParamsType) => {
    const { category, postLimit, installment } = params;

    const { data } = await axios.get<FurnitureType[]>(
      `${apiService.getFurniture}${postLimit}${category}${installment ? installment : ""}`
    );
    return data;
  }
);
export const fetchFurnitureById = createAsyncThunk(
  "furniture/fetchFurnitureById",
  async (id: string) => {
    const { data } = await axios.get<FurnitureType>(
      `${apiService.getFurnitureById}${id}`
    );

    return data;
  }
);
