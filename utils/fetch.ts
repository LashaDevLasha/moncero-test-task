export const fetchData = async <T, P>(
  url: string,
  params?: P,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    const queryString = params
      ? `?${new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          )
        ).toString()}`
      : "";

    const fullUrl = url + queryString;

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Fetch failed. Retrying in ${delay / 1000} seconds...`, error);
      await new Promise(res => setTimeout(res, delay)); 
      return fetchData<T, P>(url, params, retries - 1, delay);
    } else {
      console.error("Max retries reached. Fetching failed.");
      throw error;
    }
  }
};
