import { fetchData } from "@/utils/fetch";
import { ChartData, ChartParams } from "./types";
import { BASE_URL } from "@/config/apiConfig";

const URL = `${BASE_URL}/assets/`;

// const BASE_URL = "https://api.coincap.io/v2/assets/";

export const getChartData = async ({
  assetId,
  interval,
}: ChartParams): Promise<ChartData[]> => {
  const url = `${URL}${assetId}/history`;

  const params = {
    interval,
  };

  const data = await fetchData<ChartData[], typeof params>(url, params);

  //   return data.map(item => ({
  //     time: new Date(item.time).toLocaleString(),
  //     priceUsd: item.priceUsd,
  //   }));
  return data;
};
