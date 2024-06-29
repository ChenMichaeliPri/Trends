export type DataPoint ={
  date:string;
  price:number;
  recommendedDate?:boolean;
  avoidDate?:boolean;
}
export type StoresData = {
  amazon:DataPoint[];
  ivory:DataPoint[];
  ksp:DataPoint[];
}
