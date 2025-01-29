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

  try {
    // Fetch data
    const data = await fetchData<ChartData[], typeof params>(url, params);

    // Log the raw data to inspect it
    console.log("Raw data:", data);

    // Ensure data is an array
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return [];
    }

    // Map over the data if it's an array
    return data.map(item => ({
      time: new Date(item.time).toLocaleString(),
      priceUsd: item.priceUsd,
    }));
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return [];
  }
};
