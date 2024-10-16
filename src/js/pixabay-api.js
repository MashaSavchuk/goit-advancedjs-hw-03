const API_KEY = '46556948-bd2679cce083bd479fad12d62';
const BASE_URL = 'https://pixabay.com/api/';
const BASE_PARAMS = '&image_type=photo&orientation=horizontal&safesearch=true';

function searchPhotos(queryStr) {
    return fetch(`${BASE_URL}?key=${API_KEY}${BASE_PARAMS}&q=` + encodeURIComponent(queryStr))
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json();
        });
 }

export { searchPhotos }
