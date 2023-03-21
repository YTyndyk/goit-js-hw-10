import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputSearchEl = document.querySelector('#search-box');
const countryList = document.querySelector('country-list');
const countryCard = document.querySelector('.country-info');

inputSearchEl.addEventListener('input', debounce(onInputEnter, DEBOUNCE_DELAY));

function onInputEnter(e) {
  e.preventDefault();

  const searchCountries = e.target.value.trim();

  if (!searchCountries) {
    countryList.innerHTML = '';
    countryCard.innerHTML = '';
    return;
  }

  fetchCountries(searchCountries)
    .then(country => {
      if (country.length > 10) {
        Notify.info(
          'Too many matches found. Please, enter a more specific name.'
        );
        return;
      }
      renderedCountries(country);
    })
    .catch(error => {
      countriesList.innerHTML = '';
      countryCard.innerHTML = '';
      Notify.failure('Oops, there is no country with that name');
    });
}
function renderedCountries(country) {
  const inputLetters = country.length;

  if (inputLetters === 1) {
    countriesList.innerHTML = '';
    markupCountryList(result);
  }
  if (inputLetters > 1 && inputLetters <= 10) {
    countryCard.innerHTML = '';
    markupCountryList(result);
  }
}

function markupCountryList(countries) {
  const listMarkup = countries
    .map(({ name, flags }) => {
      return `<li>
 <img src="${flags.svg}" alt="${name}" width="40" height="auto">
 <span>${name.official}</span>
 </li>`;
    })
    .join('');
  countriesList.innerHTML = listMarkup;
  return listMarkup;
}

function markupCountryList(countries) {
  const cardMarkup = countries
    .map(({ flags, name, capital, population, languages }) => {
      languages = Object.values(languages).join(',');
      return `<img src="${flags.svg}" alt="${name}" width="60" height="auto">
            <p> ${name.official}</p>
            <p>Capital: <span> ${capital}</span></p>
            <p>Population: <span> ${population}</span></p>
            <p>Languages: <span> ${languages}</span></p>`;
    })
    .join('');
  countryCard.innerHTML = cardMarkup;
  return cardMarkup;
}
