import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";
import { FurnitureType, ParamsType } from "./furnitueTypes";

export const fetchFurnitures = createAsyncThunk(
  "furniture/fetchFurnitures",
  async (params: ParamsType) => {
    const { category, postLimit } = params;
    const { data } = await axios.get<FurnitureType[]>(
      `${apiService.getFurniture}${postLimit}${category}`
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
