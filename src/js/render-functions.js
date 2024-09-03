
export function createGalleryCard (imgData) {
    return `
    <li class="gallery-item">
    <a class="gallery-link" href="${imgData.largeImageURL}">
        <img src="${imgData.webformatURL}" alt="${imgData.tags}" class="gallery-img" />
        </a>
        <ul class="img-list">
        <li class="img-item">
            <h3 class="img-title">Likes</h3>
            <p class="img-text">${imgData.likes}</p>
        </li>
        <li class="img-item">
            <h3 class="img-title">Views</h3>
            <p class="img-text">${imgData.views}</p>
        </li>
        <li class="img-item">
            <h3 class="img-title">Comments</h3>
            <p class="img-text">${imgData.comments}</p>
        </li>
        <li class="img-item">
            <h3 class="img-title">Downloads</h3>
            <p class="img-text">${imgData.downloads}</p>
        </li>
        </ul>
    </li>
    `
}