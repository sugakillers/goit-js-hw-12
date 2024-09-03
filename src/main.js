import { fetchPhotos } from "./js/pixabay-api";
import { createGalleryCard } from "./js/render-functions";
import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector(".search-form");
const cardsList = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more-btn");

let page = 1;
const perPage = 15;
let query = '';

const gallery = new SimpleLightbox(".gallery li a", {
    captions: true,
    captionClass: "style-caption",
    captionsData: 'alt',
    captionDelay: 250,
    disableRightClick: true,
});

loadMoreBtn.classList.add('is-hidden');

const showElement = (element) => element.classList.remove('is-hidden');
const hideElement = (element) => element.classList.add('is-hidden');

const showError = (message, title = "Error") => {
    iziToast.error({
        message,
        position: "topCenter",
        title,
        timeout: 4000,
    });
};

const clearPage = () => {
    cardsList.innerHTML = '';
    hideElement(loadMoreBtn);
};

const onSearchFormSubmit = async (event) => {
    event.preventDefault();
    loader.classList.add("is-open");
    page = 1;
    query = searchForm.elements.user_query.value.trim();
    clearPage();

    if (!query) return;

    try {
        showElement(loader);
        const data = await fetchPhotos(query, page, perPage);
        
        if (data.hits.length === 0) {
            showError("Sorry, there are no images matching your search query. Please try again!", "Attention");
            loader.classList.remove("is-open");
            return;
        }

        renderGallery(data.hits);
        loader.classList.remove("is-open");

        if (data.hits.length < perPage) {
            iziToast.info({
                message: "You've reached the end of search results.",
                position: "topCenter",
                title: "Info",
                timeout: 4000,
            });
        } else {
            showElement(loadMoreBtn);
        }
    } catch (err) {
        console.error(err);
        loader.classList.remove("is-open");
        showError("An error occurred while fetching images. Please try again.");
    } finally {
        hideElement(loader);
        searchForm.reset();
    }
};

const onLoadMoreClick = async () => {
    page += 1;

    try {
        loader.classList.add("is-open");
        const data = await fetchPhotos(query, page, perPage);
        renderGallery(data.hits);
        loader.classList.remove("is-open");

        const { height: cardHeight } = cardsList.firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });

        if (data.hits.length < perPage) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topCenter",
                title: "Info",
                timeout: 4000,
            });
            loadMoreBtn.classList.add('is-hidden');
        }
    } catch (err) {
        console.error(err);
        showError("An error occurred while loading more images. Please try again.");
    } finally {
        hideElement(loader);
    }
};

const renderGallery = (photos) => {
    const markup = photos.map(createGalleryCard).join("");
    cardsList.insertAdjacentHTML('beforeend', markup);
    gallery.refresh();
};

searchForm.addEventListener("submit", onSearchFormSubmit);
loadMoreBtn.addEventListener("click", onLoadMoreClick);
