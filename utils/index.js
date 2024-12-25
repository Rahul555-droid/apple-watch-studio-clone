// Utility functions to encode and decode to Base64
export const encodeToBase64 = (value) => btoa(value);
export const decodeFromBase64 = (encodedValue) => atob(encodedValue);

// Helper function to get the query parameter from the URL, decode it, or return a default value
export const getParamFromURL = (param, defaultValue) => {
  const paramValue = new URLSearchParams(window.location.search).get(param);
  const value = paramValue ? decodeFromBase64(paramValue) : defaultValue
  console.log({param , value})
  return value;
};

// Helper function to update the URL with Base64 encoded params
export const updateURLWithParams = (params) => {
  const url = new URL(window.location.href);
  Object.keys(params).forEach((key) => {
    url.searchParams.set(key, encodeToBase64(params[key]));
  });
  window.history.replaceState(null, "", url.toString());
};
