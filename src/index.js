import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

// console.log(BASE_URL);
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onNameInput, DEBOUNCE_DELAY));

function onNameInput(e) {
  e.preventDefault();
  const inputValue = e.target.value.trim();
  if (!inputValue) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(inputValue)
    .then(data => {
      console.log(data);
      if (data.length > 10) {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        renderCountry(data);
      }
    })
    .catch(error => {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountry(data) {
  if (data.length === 1) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = countryMarkup(data[0]);
  } else {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = countryMarkupList(data);
  }
  //   const markup = countryMarkup(country[0]);
  //   refs.countryInfo.innerHTML = markup;
}
function countryMarkup({ flags, name, capital, population, languages }) {
  const language = Object.values(languages);
  return `<h2 class="country">
        <img class="flag" src="${flags.svg}" alt="flag" width="30px" />${name.official}
      </h2>
      <ul class="desc-list">
        <li class="desc">Capital: ${capital}</li>
        <li class="desc">Population: ${population}</li>
        <li class="desc">Languages: ${language}</li>
      </ul>`;
}

function countryMarkupList(data) {
  return data
    .map(
      ({ flags, name }) =>
        `<li class = 'country-item'><img src="${flags.png}" alt="${name.official}" width="50" height="30"class = 'country-img'>${name.official}</li>
      `
    )
    .join('');
}
// {
//   return `<h2 class="country">
//         <img class="flag" src="${flags.svg}" alt="flag" width="30px" />${name.official}
//       </h2>`;
// }

// Notify.failure();
// Notify.info();
