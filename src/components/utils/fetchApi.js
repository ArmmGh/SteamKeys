const fetchApi = (url, options) => fetch(url, options).then(res => res.json());
export default fetchApi;
