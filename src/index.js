
import { fetchBreeds } from './api.js';
import { fetchCatByBreed } from './api.js';



const selectEl = document.querySelector('.breed-select');
const catContainer = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

window.addEventListener('load', onLoad);

function onLoad() {
    fetchBreeds('cats')
        .then(resp => {
            const markup = makeSelectMarkup(resp);
            addMarkup(selectEl, markup);
            new SlimSelect({
                select: selectEl,
            });
        })
        .catch(error => console.log(error.message));
}

function makeSelectMarkup(items) {
    return items
    .map(({ id, name }) => {

            return `<option value="${id}">🐈‍⬛ - ${name}</option>`;
        })
        .join('');
}

function addMarkup(ref, markup) {


    ref.innerHTML = markup;

}

selectEl.addEventListener('change', onChange);

function onChange(event) {
    const id = event.target.value;
    loaderEl.classList.add('display');

    fetchCatByBreed(id)
        .then(response => {
            const catInfo = response[0];
            const catMarkup = createCatMarkup(catInfo);
            catContainer.innerHTML = catMarkup;
            loaderEl.classList.remove('display');

        })
        .catch(() => {
            Notiflix.Notify.failure(
                'Oops! Something went wrong! Try reloading the page!'
            );
        });
}

function createCatMarkup(catInfo) {
    return `
<div class="js-part">
<div class="img-part">
  <img src="${catInfo.url}" alt="${catInfo.breeds[0].name}" class="cat-img"/>
</div>
  <div class="info-part">
    <h2>🐈‍⬛ ${catInfo.breeds[0].name}</h2>
    <p class="cat-text">${catInfo.breeds[0].description}</p>
    <p>
      <span class="temperament">🐈 Temperament: </span>
      ${catInfo.breeds[0].temperament}
    </p>
  </div>
</div>
`;
}
