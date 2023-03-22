import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";
import { FurnitureType } from "../furnitureSlice/furnitueTypes";
import { FilterParamsType } from "./filterTypes";

export const fetchAllFurnitures = createAsyncThunk(
  "filter/fetchAllFurnitures",
  async (params: FilterParamsType) => {
    const { page, category, installment } = params;

    const { data } = await axios.get<FurnitureType[]>(
      `${apiService.baseUrl}${page}${category ? category : ""}${
        installment ? installment : ""
      }`
    );
    return data;
  }
);
