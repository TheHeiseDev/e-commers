export const categories = [
  {
    key: "",
    name: "Всё",
  },
  {
    key: "chairs",
    name: "Стулья",
  },
  {
    key: "tables",
    name: "Столы",
  },
  {
    key: "sofa",
    name: "Диваны",
  },
];

export type PopulaCategoryType = {
  id: number;
  imageUrl: string;
  title: string;
  variable: string[];
};
export const populaCategoryBig: PopulaCategoryType[] = [
  {
    id: 1,
    imageUrl:
      "https://mnogomebeli.com/upload/resize_cache/iblock/36d/hq4eh5egjeg8l937b4q086dp5osutgad/950_450_1/2560kh1188_0000_INT_Boss_XL_alkantara_orange_00.jpg",
    title: "Диваны",
    variable: ["Все диваны", "Угловые диваны", "Модульные диваны", "Прямые диваны"],
  },
  {
    id: 2,
    imageUrl:
      "https://mnogomebeli.com/upload/resize_cache/iblock/10d/lr4e208zfykf2w8psg687z7ov9bokxhs/950_450_1/2560kh1188_0001_INT_Olaf_tv_tumba_samdal_grafit_vitrina_55_samdal_grafit_vitrina_80_samdal_grafit_0001.jpg",
    title: "Стенки",
    variable: ["Для гостиной", "Модульные стенки", "Под телевизор ", "Все стенки"],
  },
];

export const populaCategoryAll: PopulaCategoryType[] = [
  {
    id: 1,
    imageUrl:
      "https://mnogomebeli.com/upload/resize_cache/iblock/85c/1hs622agl8lr04rmxvdt5q8x0a50tta4/950_450_1/1284kh1000_0001_INT_shkaf_Boss_rasp_180_kraft_grey.jpg",
    title: "Шкафы",
    variable: ["  Шкафы-купе", " Распашные шкафы", " Прямые шкафы", " Все шкафы"],
  },
  {
    id: 2,
    imageUrl:
      "https://mnogomebeli.com/upload/resize_cache/iblock/83c/lub2jn446kx5ju18qq0snsasxzildvk5/950_450_1/1284kh1000_0009_INT_Bella_monolith_bej_2_0001.jpg",
    title: "Кровати",
    variable: ["Двуспальные кровати", "Односпальные кровати ", "Все кровати"],
  },
  {
    id: 3,
    imageUrl:
      "https://mnogomebeli.com/upload/resize_cache/iblock/c88/2xhim5htea6v8d1f5atp3lrqh896xklx/950_450_1/1284kh1000_0007_INT_chair_3_monolith_blue_0000.jpg",
    title: "Столы",
    variable: ["Журнальные столы", "Обеденные столы", "Столы-трансформеры ", "Все столы"],
  },
  {
    id: 4,
    imageUrl:
      "https://mnogomebeli.com/upload/resize_cache/iblock/22d/t452l0e1nso6vw8oweuqhsj4q93boarg/950_450_1/INT_Kitchen_2021_sonoma_white_0001_1280kh1000.jpg",
    title: "Кухни",
    variable: ["Кухни Люкс", "Все кухни"],
  },
];
