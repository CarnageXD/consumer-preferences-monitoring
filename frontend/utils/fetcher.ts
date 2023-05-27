export const fetcher = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (e) {
    console.log("errror", e);
  }
};
