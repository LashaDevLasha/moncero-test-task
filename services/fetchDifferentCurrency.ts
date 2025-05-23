const API_URL = "https://api.freecurrencyapi.com/v1/latest";
export const API_KEY = "fca_live_IOpX3dB4xklI2GdS3KGuaB3o8GQf06Fwrq6dKU18";

interface CurrencyData {
  data: Record<string, number>;
  query: {
    apikey: string;
    base_currency: string;
    timestamp: number;
  };
}

export const fetchCurrency = async (
  retries: number = 3,
  delay: number = 1000
): Promise<CurrencyData | null> => {
  try {
    if (!API_URL || !API_KEY) {
      throw new Error("Missing API URL or API Key");
    }

    const response = await fetch(`${API_URL}?apikey=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch currency data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch attempt failed. Retries left: ${retries}`, error);

    if (retries > 0) {
      await new Promise((res) => setTimeout(res, delay));
      return fetchCurrency(retries - 1, delay * 2);
    } else {
      console.error("Max retries reached. Fetching failed.");
      return null;
    }
  }
};

export default fetchCurrency;
