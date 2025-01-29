export const fetchData = async <T, P>(url: string, params?: P): Promise<T> => {
  try {
    const queryString = params
      ? `?${new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          )
        ).toString()}`
      : "";

    const response = await fetch(url + queryString, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    // console.log(data);
    
    return (data?.data ?? data) as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
