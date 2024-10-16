import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import "./css/styles.css";

import { searchPhotos } from "./js/pixabay-api.js";
import { createGallery } from "./js/render-functions.js";

// Ініціалізація SimpleLightbox
const sLightbox = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.8,
  className: 'gallery-wrapper',
  captionsData: 'alt',
  captionDelay: 250,
});

iziToast.settings({
  class: "toast",
  position: "topRight",
  drag: false,
});

// DOM елементи
const theLoader = document.getElementById("loading-spinner"); // Індикатор завантаження
const theGallery = document.querySelector('.gallery');

// Обробка форми пошуку
document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const queryStr = form.elements.queryStr.value.trim();

  if (queryStr === "") {
    form.reset();
    return; // Нічого не робимо для порожнього запиту
  }

  // Показуємо індикатор завантаження перед запитом
  theLoader.classList.add("is-loading");
  theGallery.innerHTML = ''; // Очищуємо галерею

  searchPhotos(queryStr)
    .then((data) => {
      if (data.total == 0) {
        iziToast.error({
          message: "Sorry, there are no images matching your search query. Please try again!",
        });
      } else {
        theGallery.innerHTML = createGallery(data.hits); // Рендеримо галерею
        sLightbox.refresh(); // Оновлюємо SimpleLightbox
      }
    })
    .catch((err) => {
      iziToast.error({
        message: err.message,
      });
    })
    .finally(() => {
      // Приховуємо індикатор після завершення запиту
      theLoader.classList.remove("is-loading");
      form.reset(); // Очищуємо форму
    });
});
