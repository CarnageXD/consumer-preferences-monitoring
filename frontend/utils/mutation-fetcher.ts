type MethodType = "POST" | "PUT" | "PATCH" | "DELETE";

export function mutationFetcher(
  method: MethodType,
  contentType: "JSON" = "JSON"
) {
  //@ts-ignore
  return async function (url: string, { arg }) {
    const response = await fetch(url, {
      method: method,
      body: contentType === "JSON" ? JSON.stringify(arg) : arg,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  };
}

export default mutationFetcher;
