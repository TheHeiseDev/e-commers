import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";
import { FurnitureType } from "../furnitureSlice/furnitueTypes";
import { FilterParams } from "./filterTypes";

// ! Don't use the axios structure in the following format.
// axios({
//   params: {}
//   }
//   )
// In this case, such an unclean way of constructing
// url parameters is used due to mockapi limitations

export const fetchAllFurnitures = createAsyncThunk(
  "filter/fetchAllFurnitures",
  async (params: FilterParams) => {
    const { sortBy, order, category, currentPage, filter, installment, manufacturer } =
      params;
    const { data } = await axios.get<FurnitureType[]>(
      `${apiService.baseUrl}${
        manufacturer ? `&Manufacturer=${manufacturer}` : ""
      }&page=${currentPage}&limit=4&filter=${filter}&category=${category}&sortBy=${sortBy}&order=${order}${
        installment ? `&Installment=${installment}` : ""
      }`
    );
    return data;
  }
);
