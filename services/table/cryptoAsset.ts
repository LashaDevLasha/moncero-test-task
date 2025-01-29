import { fetchData } from "@/utils/fetch";
import { BASE_URL } from "@/config/apiConfig";
import { CryptoAsset } from "./types";


export const getCryptoAssets = async (): Promise<CryptoAsset[]> => {
  const url = `${BASE_URL}/assets`;
  try {
    const response = await fetchData<{ data: CryptoAsset[] }, unknown>(url);
    return response?.data ?? [];
  } catch (error) {
    console.error("Error fetching crypto assets:", error);
    return [];
  }
};
