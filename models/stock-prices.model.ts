export interface StockPricesModel {
  symbol: string
  name: string
  price: number
  changesPercentage: number
  change: number
  dayLow: number
  dayHigh: number
  yearHigh: number
  yearLow: number
  marketCap: number
  priceAvg50: number
  priceAvg200: number
  volume: number
  avgVolume: number
  exchange: string
  open: number
  previousClose: number
  eps: number
  pe: number
  earningsAnnouncement: string
  sharesOutstanding: number
  timestamp: number
}
export interface StockMarketsMoversModel {
  symbol: string
  companyName: string
  marketCap: number
  sector: string
  industry: string
  beta: number
  price: number
  lastAnnualDividend: number
  volume: number
  exchange: string
  exchangeShortName: string
  country: string
  isEtf: boolean
  isActivelyTrading: boolean
  stockPrice: StockPricesModel
}

export interface StockMarketsModel {
  GSPC: StockPricesModel
  DJI: StockPricesModel
  IXIC: StockPricesModel
  VIX: StockPricesModel
}

export interface StockFinancialRatios {
  dividendYielTTM: number

  dividendYielPercentageTTM: number

  peRatioTTM: number

  pegRatioTTM: number

  payoutRatioTTM: number

  currentRatioTTM: number

  quickRatioTTM: number

  cashRatioTTM: number

  daysOfSalesOutstandingTTM: number

  daysOfInventoryOutstandingTTM: number

  operatingCycleTTM: number

  daysOfPayablesOutstandingTTM: number

  cashConversionCycleTTM: number

  grossProfitMarginTTM: number

  operatingProfitMarginTTM: number

  pretaxProfitMarginTTM: number

  netProfitMarginTTM: number

  effectiveTaxRateTTM: number

  returnOnAssetsTTM: number

  returnOnEquityTTM: number

  returnOnCapitalEmployedTTM: number

  netIncomePerEBTTTM: number

  ebtPerEbitTTM: number

  ebitPerRevenueTTM: number

  debtRatioTTM: number

  debtEquityRatioTTM: number

  longTermDebtToCapitalizationTTM: number

  totalDebtToCapitalizationTTM: number

  interestCoverageTTM: number

  cashFlowToDebtRatioTTM: number

  companyEquityMultiplierTTM: number

  receivablesTurnoverTTM: number

  payablesTurnoverTTM: number

  inventoryTurnoverTTM: number

  fixedAssetTurnoverTTM: number

  assetTurnoverTTM: number

  operatingCashFlowPerShareTTM: number

  freeCashFlowPerShareTTM: number

  cashPerShareTTM: number

  operatingCashFlowSalesRatioTTM: number

  freeCashFlowOperatingCashFlowRatioTTM: number

  cashFlowCoverageRatiosTTM: number

  shortTermCoverageRatiosTTM: number

  capitalExpenditureCoverageRatioTTM: number

  dividendPaidAndCapexCoverageRatioTTM: number

  priceBookValueRatioTTM: number

  priceToBookRatioTTM: number

  priceToSalesRatioTTM: number

  priceEarningsRatioTTM: number

  priceToFreeCashFlowsRatioTTM: number

  priceToOperatingCashFlowsRatioTTM: number

  priceCashFlowRatioTTM: number

  priceEarningsToGrowthRatioTTM: number

  priceSalesRatioTTM: number

  dividendYieldTTM: number

  enterpriseValueMultipleTTM: number

  priceFairValueTTM: number

  dividendPerShareTTM: number

}

export interface FinancialResume {
  ratingScore: number;
  ratingRecommendation: string;
  symbol: string;
  price: number;
  beta: number;
  mktCap: number;
  range: number;
  sector: string;
  targetHigh: number;
  targetLow: number;
  targetConsensus: number;
  roe: number;
  roeRecommendation: string;
  roa: number;
  roaRecommendation: string;
  debtEquity: number;
  debtEquityRecommendation: string;
  pe: number;
  peRecommendation: string;
  pb: number;
  pbRecommendation: string;
}

export interface FinancialBarsValue {
  date: string

  symbol: string

  reportedCurrency: string

  cik: string

  fillingDate: string

  acceptedDate: string

  calendarYear: string

  period: string

  revenue: number

  costOfRevenue: number

  grossProfit: number

  grossProfitRatio: number

  researchAndDevelopmentExpenses: number

  generalAndAdministrativeExpenses: number

  sellingAndMarketingExpenses: number

  sellingGeneralAndAdministrativeExpenses: number

  otherExpenses: number

  operatingExpenses: number

  costAndExpenses: number

  interestIncome: number

  interestExpense: number

  depreciationAndAmortization: number

  ebitda: number

  ebitdaratio: number

  operatingIncome: number

  operatingIncomeRatio: number

  totalOtherIncomeExpensesNet: number

  incomeBeforeTax: number

  incomeBeforeTaxRatio: number

  incomeTaxExpense: number

  netIncome: number

  netIncomeRatio: number

  eps: number

  epsdiluted: number

  weightedAverageShsOut: number

  weightedAverageShsOutDil: number

  link: string

  finalLink: string
}

export interface FinancialBars {
  annual: FinancialBarsValue[]

  quarterly: FinancialBarsValue[]
}

export interface FinancialBubbles {
  date: string;
  symbol: string;
  actualEarningResult: number;
  estimatedEarning: number;
}

export interface FinancialUpgrades {
  symbol: string;
  publishedDate: string;
  newsURL: string;
  newsTitle: string;
  newsBaseURL: string;
  newsPublisher: string;
  newGrade: string;
  previousGrade: string;
  gradingCompany: string;
  action: string;
  priceWhenPosted: number;
}

export interface FinancialPriceArea {
  date: Date;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
}
