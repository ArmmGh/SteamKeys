const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const fetchApi = (url, options) =>
  fetch(`http://${host}:${port}${url}`, options).then(res => res.json());
export default fetchApi;
