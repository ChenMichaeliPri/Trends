import {DataPoint, HistogramData, StoresData} from "./charts.types";
import {PricesData} from "../mainPage/mainPage.types";

const minPriceMock = 1000;
const maxPriceMock = 3000;
const averagePriceMock = 2000;
const standardDeviationMock = 1000;
const cheapestStoreNameMock = "Amazon"
const cheapestStorePriceMock = 18.05
const ivoryDataMock: DataPoint[] = [
    {date: '01-01-23', price: 120},
    {date: '02-01-23', price: 119},
    {date: '03-01-23', price: 118},
    {date: '04-01-23', price: 117},
    {date: '05-01-23', price: 116},
    {date: '06-01-23', price: 115},
    {date: '07-01-23', price: 114},
    {date: '08-01-23', price: 113},
    {date: '09-01-23', price: 112},
    {date: '10-01-23', price: 110},
    {date: '15-03-23', price: 200}, // Peak
    {date: '16-03-23', price: 145},
    {date: '17-03-23', price: 140},
    {date: '18-03-23', price: 138},
    {date: '19-03-23', price: 136},
    {date: '20-03-23', price: 134},
    {date: '01-06-23', price: 210}, // Peak
    {date: '02-06-23', price: 155},
    {date: '03-06-23', price: 150},
    {date: '04-06-23', price: 148},
    {date: '05-06-23', price: 146},
    {date: '06-06-23', price: 144},
    {date: '10-09-23', price: 200}, // Peak
    {date: '11-09-23', price: 165},
    {date: '12-09-23', price: 60}, //Peak
    {date: '13-09-23', price: 158},
    {date: '14-09-23', price: 156},
    {date: '15-09-23', price: 154},
    {date: '31-12-23', price: 130},
];
const amazonDataMock: DataPoint[] = [
    {date: '01-01-23', price: 220},
    {date: '02-01-23', price: 219},
    {date: '03-01-23', price: 218},
    {date: '04-01-23', price: 217},
    {date: '05-01-23', price: 216},
    {date: '06-01-23', price: 215},
    {date: '07-01-23', price: 214},
    {date: '08-01-23', price: 213},
    {date: '09-01-23', price: 212},
    {date: '10-01-23', price: 210},
    {date: '15-03-23', price: 300}, // Peak
    {date: '16-03-23', price: 145},
    {date: '17-03-23', price: 140},
    {date: '18-03-23', price: 138},
    {date: '19-03-23', price: 136},
    {date: '20-03-23', price: 134},
    {date: '01-06-23', price: 270}, // Peak
    {date: '02-06-23', price: 255},
    {date: '03-06-23', price: 250},
    {date: '04-06-23', price: 248},
    {date: '05-06-23', price: 246},
    {date: '06-06-23', price: 244},
    {date: '10-09-23', price: 200}, // Peak
    {date: '11-09-23', price: 165},
    {date: '12-09-23', price: 60}, //Peak
    {date: '13-09-23', price: 158},
    {date: '14-09-23', price: 156},
    {date: '15-09-23', price: 154},
    {date: '31-12-23', price: 130},
];
const kspDataMock: DataPoint[] = [
    {date: '01-01-23', price: 320},
    {date: '02-01-23', price: 319},
    {date: '03-01-23', price: 318},
    {date: '04-01-23', price: 317},
    {date: '05-01-23', price: 316},
    {date: '06-01-23', price: 315},
    {date: '07-01-23', price: 314},
    {date: '08-01-23', price: 313},
    {date: '09-01-23', price: 312},
    {date: '10-01-23', price: 310},
    {date: '15-03-23', price: 400}, // Peak
    {date: '16-03-23', price: 145},
    {date: '17-03-23', price: 140},
    {date: '18-03-23', price: 138},
    {date: '19-03-23', price: 136},
    {date: '20-03-23', price: 134},
    {date: '01-06-23', price: 350}, // Peak
    {date: '02-06-23', price: 155},
    {date: '03-06-23', price: 150},
    {date: '04-06-23', price: 148},
    {date: '05-06-23', price: 146},
    {date: '06-06-23', price: 144},
    {date: '10-09-23', price: 200}, // Peak
    {date: '11-09-23', price: 165},
    {date: '12-09-23', price: 70}, //Peak
    {date: '13-09-23', price: 158},
    {date: '14-09-23', price: 116},
    {date: '15-09-23', price: 154},
    {date: '31-12-23', price: 130},
];

export const storesDataMock: StoresData = {
    1: amazonDataMock,
    2: kspDataMock,
    3: ivoryDataMock
}

export const pricesDataMock: PricesData = {
    minPrice: minPriceMock,
    maxPrice: maxPriceMock,
    averagePrice: averagePriceMock,
    standardDeviation: standardDeviationMock,
    cheapestStoreName: cheapestStoreNameMock,
    cheapestStorePrice: cheapestStorePriceMock
}

export const histogramDataMock: HistogramData = {
    1: [446, 483, 827, 486, 830, 452, 490, 830, 490, 834, 451, 494, 831, 495, 834, 451, 494, 832, 495, 834, 451, 493, 831, 494, 833, 450, 491, 830, 492, 831, 450, 491, 831, 488, 829, 445, 482, 826, 484, 828, 446, 483, 826, 483, 828, 453, 493, 830, 492, 835, 452, 491, 827, 486, 830, 447, 484, 826, 484, 828, 446, 482, 826, 484, 828, 446, 484, 827, 484, 829, 448, 484, 827, 484, 827, 445, 479, 824, 482, 827, 446, 489, 975, 560, 977, 515, 568, 960, 538, 977, 524, 540, 960, 541, 964, 524, 574, 978, 572, 979, 512, 546, 967, 550, 972, 516, 547, 964, 549, 970, 512, 546, 964, 548, 967, 514, 547, 964, 506, 878, 472, 504, 879, 506, 881, 472, 504, 879, 506, 882, 472, 504, 879, 506, 881, 472, 504, 879, 506, 881, 472, 504, 879, 506, 881, 472, 504, 879, 505, 866, 457, 489, 849, 490, 824, 443, 475, 822, 474, 822, 441, 475, 821, 478, 838, 444, 475, 822, 478, 825, 443, 475, 543, 873, 491, 510, 552, 509, 564, 878, 496, 498, 530, 499, 555, 880, 497, 500, 529, 498, 555, 880, 497, 503, 542, 538, 565, 879, 495, 502, 536, 507, 554, 886, 498, 508, 548, 503, 542, 911, 528, 433, 472, 430, 484, 844, 433, 436, 478, 435, 487, 738, 433, 433, 475, 433, 490, 741, 429, 441, 474, 431, 481, 750, 438, 432, 483, 441, 500, 751, 439, 443, 466, 436, 478, 690, 415, 692, 381, 425, 690, 426, 694, 863],
    2: Array.from({length: 255}, () => Math.floor(Math.random() * 1000)),
    3: Array.from({length: 255}, () => Math.floor(Math.random() * 1000))
}
