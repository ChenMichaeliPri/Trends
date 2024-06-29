import {FetchedProduct} from "./product.types";
import {
  averagePriceMock,
  maxPriceMock,
  minPriceMock,
  standardDeviationMock,
  storesDataMock
} from "../../components/chart/chart.mock";
import {insightsMock} from "../../components/insights/insights.mock";

export const productMock:FetchedProduct = {
  productId:1,
  min:minPriceMock,
  max:maxPriceMock,
  average:averagePriceMock,
  standardDeviation:standardDeviationMock,
  data:storesDataMock,
  insights:insightsMock
}
