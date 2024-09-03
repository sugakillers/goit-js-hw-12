import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export const fetchPhotos = (searchedQuery, page, perPage) => {
const asyncParams = {
    params: {
    key: '45468562-3d934deccae668c7d7f46b2f1',
    q: searchedQuery,
    page: page,
    per_page: perPage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    },
};
return axios.get('/api/', asyncParams).then(response => response.data);
};