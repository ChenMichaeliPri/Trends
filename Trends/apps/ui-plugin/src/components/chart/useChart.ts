import {averagePriceMock, chartDataMock, maxPriceMock, minPriceMock, varianceMock} from "./chart.mock";
import {Chart} from "./Chart";
import {ComponentProps} from "react";

export const useChart = ():ComponentProps<typeof Chart> => {
  return {
    data:chartDataMock,
    minPrice:minPriceMock,
    maxPrice:maxPriceMock,
    averagePrice:averagePriceMock,
    variance:varianceMock
  }
}
