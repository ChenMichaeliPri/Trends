import {
  averagePriceMock,
  maxPriceMock,
  minPriceMock,
  standardDeviationMock,
  storesDataMock
} from "./chart.mock";
import {Chart} from "./Chart";
import {ComponentProps} from "react";

export const useChart = ():ComponentProps<typeof Chart> => {
  return {
    minPrice:minPriceMock,
    maxPrice:maxPriceMock,
    averagePrice:averagePriceMock,
    standardDeviation:standardDeviationMock,
    storesData:storesDataMock
  }
}
