export type DataPoint = {
  date: string;
  price: number;
};

export type StoresData = {
  1?: DataPoint[];
  2?: DataPoint[];
  3?: DataPoint[];
};

export type ChartData = {
  currentPrice: number;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  standardDeviation: number;
};

export type UIStore = {
  storeName: string;
  lineColor: string;
};
