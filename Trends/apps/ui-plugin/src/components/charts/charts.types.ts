export type DataPoint = {
    date: string;
    price: number;
}

export type StoresData = {
    1?: DataPoint[];
    2?: DataPoint[];
    3?: DataPoint[];
}

export type HistogramData = {
    1?: number[];
    2?: number[];
    3?: number[];
}


export type UIStore = {
    storeName: string,
    lineColor: string
}
