export type DataPoint ={
  date:string;
  price:number;
}

export type StoresData = {
  1:DataPoint[];
  2:DataPoint[];
  3:DataPoint[];
}

export type UIStore = {
  storeName:string,
  lineColor:string
}
