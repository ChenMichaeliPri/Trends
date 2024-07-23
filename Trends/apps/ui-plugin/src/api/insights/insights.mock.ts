import {FetchedInsights} from "./insights.types";

export const fetchedInsightsMock:FetchedInsights ={
  productId: 1,
  min: 15.01,
  max: 56.83,
  average: 611,
  standardDeviation:1041,
  shopToCurrentPriceData:{
    1:{id:1, productId:1, shopId:1, price:18.05, timestamp: new Date('2024-07-21T12:00:00Z')},
    2:{id:2, productId:1, shopId:2, price:18.05, timestamp: new Date('2024-07-21T12:00:00Z')},
    3:{id:3, productId:1, shopId:3, price:18.05, timestamp: new Date('2024-07-21T12:00:00Z')}
  },
  insights:"According to our data, the current best price is in Amazon - approximately 18.05$.\n    This is lower than the average price of 611$.\n    This week the price is lower than 100% of the weeks for the past 2 years.\n    With a standard deviation of 1041$ from average, determine whether its worth waiting for a better deal.\n    Usually the best time for purchase is beginning of April in Amazon with prices around 15$.\n    Its advisable to avoid purchasing at the beginning of November.\n ",
  histogramData:{
    1:[446,483,827,486,830,452,490,830,490,834,451,494,831,495,834,451,494,832,495,834,451,493,831,494,833,450,491,830,492,831,450,491,831,488,829,445,482,826,484,828,446,483,826,483,828,453,493,830,492,835,452,491,827,486,830,447,484,826,484,828,446,482,826,484,828,446,484,827,484,829,448,484,827,484,827,445,479,824,482,827,446,489,975,560,977,515,568,960,538,977,524,540,960,541,964,524,574,978,572,979,512,546,967,550,972,516,547,964,549,970,512,546,964,548,967,514,547,964,506,878,472,504,879,506,881,472,504,879,506,882,472,504,879,506,881,472,504,879,506,881,472,504,879,506,881,472,504,879,505,866,457,489,849,490,824,443,475,822,474,822,441,475,821,478,838,444,475,822,478,825,443,475,543,873,491,510,552,509,564,878,496,498,530,499,555,880,497,500,529,498,555,880,497,503,542,538,565,879,495,502,536,507,554,886,498,508,548,503,542,911,528,433,472,430,484,844,433,436,478,435,487,738,433,433,475,433,490,741,429,441,474,431,481,750,438,432,483,441,500,751,439,443,466,436,478,690,415,692,381,425,690,426,694,863]
  }
}
