export const getQueryParam = (param: string) => {
  const params = new URLSearchParams(window.location.search);

  return params.get(param);
};
