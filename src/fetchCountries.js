const BASE_URL = 'https://restcountries.com/v3.1/name';
export const fetchCoutries = countryName => {
  return fetch(
    `${BASE_URL}/${countryName}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      console.log(response.statusText);
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
