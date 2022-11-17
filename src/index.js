import './css/styles.css';
import Notiflix from 'notiflix';
import Debounce from 'lodash.debounce';
import { fetchCoutries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchCountry = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchCountry.addEventListener(
  'input',
  Debounce(onSearchCountryInput, DEBOUNCE_DELAY)
);

function onSearchCountryInput(event) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  const countryName = event.target.value.trim();
  if (countryName) {
    fetchCoutries(countryName)
      .then(renderMarkup)
      .catch(err => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}

function renderMarkup(country) {
  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (country.length === 1) {
    renderCountryCard(country);
  } else {
    renderCountryList(country);
  }
}

function renderCountryList(country) {
  countryInfo.innerHTML = '';
  const markupList = country
    .map(({ name, flags }) => {
      return `
        <li class="country-item">
          <img class="country-img" src="${flags.svg}" alt='${name.common}'/>
          <p class= "country-name">${name.common}</p>
        </li>`;
    })
    .join('');

  countryList.innerHTML = markupList;
}

function renderCountryCard(country) {
  countryList.innerHTML = '';
  const { name, capital, population, flags, languages } = country[0];
  const allLanguages = Object.values(languages).join(', ');

  const markupCard = `
  <div class = 'card-wrapper'>
    <img class="country-img" src="${flags.svg}" alt="${name.common}" />
    <h2 class="card-title">${name.common}</h2>
  </div>
    <ul class="card-list">
      <li class="card-item"><span>Capital:</span> ${capital}</li>
      <li class="card-item"><span>Population:</span> ${population}</li>
      <li class="card-item"><span>Languages:</span> ${allLanguages}</li>
    </ul>
  `;

  countryInfo.innerHTML = markupCard;
}
