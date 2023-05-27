export function getUrlParams(params: any) {
  const urlParams = Object.keys(params)
    .map((arg) => (params[arg] ? `${arg}=${params[arg]}` : null))
    .filter((el) => el)
    .join("&");

  return `?${urlParams}`;
}

export function getApiUrl(endpoint: string, queryParams?: any) {
  const urlBase = process.env.NEXT_PUBLIC_API;
  const url = queryParams
    ? `${urlBase}/${endpoint}${getUrlParams(queryParams)}`
    : `${urlBase}/${endpoint}`;

  return url;
}
