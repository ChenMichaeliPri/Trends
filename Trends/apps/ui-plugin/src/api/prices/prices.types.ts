export type Price = {
  price:number,
  timestamp:string
}

type ProductPrices ={
  productId:number,
  shopId:number,
  shopName:string,
  prices:Price[]
}

export type FetchedPrices = ProductPrices[]
