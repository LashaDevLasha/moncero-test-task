export const fetchData = async <T, P>(url: string, params?: P): Promise<T> => {
  try {
    // Handle query parameters safely
    const queryString = params
      ? `?${new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          )
        ).toString()}`
      : '';

    const fullUrl = url + queryString; // Final URL to log
    console.log("Final URL:");  // Log the final URL for debugging

    // Perform the fetch request
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log raw response
    console.log("Raw response:");

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }

    // Parse JSON response
    const data = await response.json();
    console.log("Parsed data:");

    return data;  // Ensure you're accessing correct data structure
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
