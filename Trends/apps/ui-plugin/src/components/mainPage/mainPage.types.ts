export type CurrentComponent = 'graph' | 'insights' | 'histogram'

export type PricesData = {
    minPrice: number,
    maxPrice: number,
    averagePrice: number
    standardDeviation: number,
    cheapestStorePrice: number,
    cheapestStoreName: string
}
