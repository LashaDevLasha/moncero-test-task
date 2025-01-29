export interface ChartData {
  time: string;
  priceUsd: string;
}

export interface ChartParams {
  assetId: string;
  interval: "d1" | "h1" | "m1";
}
