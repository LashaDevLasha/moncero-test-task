import { fetchData } from "@/utils/fetch";
import { BASE_URL, COINCAP_API_KEY } from "@/config/apiConfig";
import { CryptoAsset } from "./types";

export const getCryptoAssets = async (): Promise<CryptoAsset[]> => {
  const url = `${BASE_URL}/assets`;

  const params = {
    apikey: COINCAP_API_KEY,
  };

  try {
    const response = await fetchData<{ data: CryptoAsset[] }, typeof params>(
      url,
      params,
      COINCAP_API_KEY 
    );
    return response?.data ?? [];
  } catch (error) {
    console.error("Error fetching crypto assets:", error);
    return [];
  }
};

