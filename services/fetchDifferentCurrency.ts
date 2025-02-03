const API_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = "fca_live_IOpX3dB4xklI2GdS3KGuaB3o8GQf06Fwrq6dKU18";

export const fetchCurrency = async () => {
  try {
    if (!API_URL || !API_KEY) {
      throw new Error("Missing API URL or API Key");
    }

    const response = await fetch(`${API_URL}?apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch currency data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    return null;
  }
};

export default fetchCurrency;
