import './css/styles.css';
import debounce from 'lodash.debounce';
//console.log(debounce);
import Notiflix from 'notiflix';
//console.log(Notiflix);
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener(
  'input',
  debounce(e => {
    const trimmedValue = input.value.trim();
    cleanHtml();
    if (trimmedValue !== '') {
      fetchCountries(trimmedValue).then(foundData => {
        if (foundData.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (foundData.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (foundData.length >= 2 && foundData.length <= 10) {
          renderCountryList(foundData);
        } else if (foundData.length === 1) {
          renderOneCountry(foundData);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderOneCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</b></p>
            <p><b>СТОЛИЦЯ</b>: ${country.capital}</p>
            <p><b>НАСЕЛЕННЯ</b>: ${country.population}</p>
            <p><b>МОВА</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

// const country = fetchCountries();
// console.log(country);
// fetchCountries()
//   .then(renderCountryList)
//   .catch(error => console.log(error));
// function fetchCountries(name) {
//   fetch(
//     `https://restcountries.com/v2/all?fields=,name,capital,population,flags,languages`
//   )
//     .then(response => response.json())
//     .then(countries => {
//       console.log(countries);
//     });
// }

// function fetchCountries(name) {
//   fetch(
//     `https://restcountries.com/v2/all?fields=,name,capital,population,flags,languages`
//   ).then(response => response.json());
// }

// input.addEventListener('input', onText);
// function onText() {
//   console.log('work input');
//   console.log(input);
//   const value = input.value;
//   console.log(value);
//   //   if (value !== '') {
//   //   }
//   //   countryListMarkup();
// }
// renderCountryList();

// function renderCountryList(countries) {
//   const markup = countries
//     .map(country => {
//       return `<li>
//       <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
//          <b>${country.name.official}</p>
//                 </li>`;
//     })
//     .join('');
//   countryList.innerHTML = markup;
// }

// function renderOneCountry(countries) {
//   const markup = countries
//     .map(country => {
//       return `<li>
//       <img src="${country.flags.svg}" alt="Flag of ${
//         country.name.official
//       }" width="30" hight="20">
//          <b>${country.name.official}</b></p>
//             <p><b>Capital</b>: ${country.capital}</p>
//             <p><b>Population</b>: ${country.population}</p>
//             <p><b>Languages</b>: ${Object.values(country.languages)} </p>
//                 </li>`;
//     })
//     .join('');
//   countryList.innerHTML = markup;
// }

// /////////////////////////////////////////////
// // function countryListMarkup(countries) {
// //   console.log(countries);
// //   const markup = countries
// //     .map(country => {
// //       return `<li><img src="${country.flag.svg}" alt="Flag of &{country.flag.svg}"/></li>`;
// //     })
// //     .join();
// //   countryList.innerHTML = markup;
// // }
