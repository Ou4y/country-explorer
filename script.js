const countriesGrid = document.querySelector('.countries-grid');
const searchInput = document.querySelector('#search-name');
const regionSelect = document.querySelector('#region-select');
const populationInput = document.querySelector('#population-input');
const showMore=document.querySelector('.show-more');
let initialCountriesNum=10;

function formatNumber(num) {
    return num.toLocaleString('en-US');
}

function createCountryCard(country) {
    const article=document.createElement('article');
    article.className='country-card';
    const img=document.createElement('img');
    img.className='country-flag';
    img.src=country.flags.png;
    img.alt=`Flag of ${country.name.common}`;
    const nameHeading=document.createElement('h2');
    nameHeading.className='country-name';
    nameHeading.textContent=country.name.official;
    const meta=document.createElement('p');
    meta.className='country-meta';
    meta.innerHTML= `<strong>Population:</strong> ${formatNumber(country.population)}<br>
                    <strong>Region:</strong>${country.region} <br>
                    <strong>Capital:</strong> ${country.capital}`;
    article.appendChild(img);
    article.appendChild(nameHeading);
    article.appendChild(meta);
    article.addEventListener('click', () => {
        const commonName=country.name.common;
        const encodedName=encodeURIComponent(commonName);
        window.location.href=`country.html?name=${encodedName}`;
    });
    return article;
}

function getFilteredCountries(){
    const nameQuery=searchInput.value.trim().toLowerCase();
    const region=regionSelect.value;
    const maxPopulation=Number(populationInput.value);
    return data.filter(country => {
    const commonName = country.name.common.toLowerCase();
    const officialName = country.name.official.toLowerCase();
    const matchesName =
      !nameQuery ||
      commonName.includes(nameQuery) ||
      officialName.includes(nameQuery);

    const matchesRegion =
      region === 'all' || country.region === region;

    const matchesPopulation =
      !maxPopulation || country.population <= maxPopulation;

    return matchesName && matchesRegion && matchesPopulation;
  });
}

// Create the Show Less button once
const paginationDiv = document.querySelector('.pagination');
const showLess = document.createElement('button');
showLess.className = 'show-more';     // reuse same styles
showLess.textContent = 'Show Less';
showLess.style.display = 'none';      // start hidden
paginationDiv.appendChild(showLess);

// Update buttons visibility based on how many we are showing
function updateButtonsVisibility(totalCountries) {
  // Hide "Show More" if we are already showing all
  if (initialCountriesNum >= totalCountries) {
    showMore.disabled = true;
  } else {
    showMore.disabled = false;
  }

  // Show "Show Less" only when we show more than the initial 10
  if (initialCountriesNum > 10) {
    showLess.style.display = 'inline-block';
  } else {
    showLess.style.display = 'none';
  }
}
// Override renderCountries so it also updates button state
function renderCountries() {
  const countriesToShow = getFilteredCountries();

  countriesGrid.innerHTML = '';

  countriesToShow
    .slice(0, initialCountriesNum)
    .forEach(country => {
      const card = createCountryCard(country);
      countriesGrid.appendChild(card);
    });

  updateButtonsVisibility(countriesToShow.length);
}

// Events
searchInput.addEventListener('input', () => {
  initialCountriesNum = 10;   // reset when filters change
  renderCountries();
});

regionSelect.addEventListener('change', () => {
  initialCountriesNum = 10;
  renderCountries();
});

populationInput.addEventListener('input', () => {
  initialCountriesNum = 10;
  renderCountries();
});

showMore.addEventListener('click', () => {
  initialCountriesNum += 10;
  renderCountries();
});

showLess.addEventListener('click', () => {
  initialCountriesNum = Math.max(10, initialCountriesNum - 10);
  renderCountries();
});

renderCountries();



