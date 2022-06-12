export { fetchCountries };
// import renderCountry from './index';
import { Notify } from 'notiflix';

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (response.status === 404) {
      return Promise.reject(new Error());
    } else {
      return response.json();
    }
  });
}
