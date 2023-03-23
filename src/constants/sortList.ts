import { Sort } from "store/slice/filterSlice/filterTypes";

export const sortList: Sort[] = [
  { name: "Популярности (Более)", sortBy: "rating" },
  { name: "Популярности (Менее)", sortBy: "-rating" },
  { name: "Цене (Убыванию)", sortBy: "price" },
  { name: "Цене (Возрастанию)", sortBy: "-price" },
  { name: "Алфавиту (А-Я)", sortBy: "title" },
  { name: "Алфавиту (Я-А)", sortBy: "-title" },
];
