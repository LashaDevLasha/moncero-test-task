import { fetchData } from "@/utils/fetch";
import { ChartParams, ChartResponse } from "./types";
import { BASE_URL } from "@/config/apiConfig";

const URL = `${BASE_URL}/assets/`;

export const getChartData = async ({
  assetId,
  interval,
  start,
  end,
}: ChartParams & { start?: number; end?: number }): Promise<
  ChartResponse
> => {
  const url = `${URL}${assetId}/history`;

  const params: { interval: string; start?: number; end?: number } = {
    interval,
  };

  if (start) params.start = start;
  if (end) params.end = end;

  try {
    const data = await fetchData<ChartResponse, typeof params>(url, params);
    return data;
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return { data: [], timestamp: 0 };
  }
};
