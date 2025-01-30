export interface ChartData {
  time: string;
  priceUsd: string;
  date: string;
}

export interface ChartResponse {
  data: ChartData[]; 
  timestamp: number;
}

export interface ChartParams {
  assetId: string;
  interval: "d1" | "h1" | "m1";
  start: number;
  end: number;
}
