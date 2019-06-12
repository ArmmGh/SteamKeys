const fetchApi = (url, options) => fetch(`http://localhost:3000${url}`, options).then(res => res.json());
export default fetchApi;
