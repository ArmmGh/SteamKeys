const host = process.env.HOST || 'localhost';
const port = process.env.PORT || ':3000';
const ref = process.env.REF || 'http';
const fetchApi = (url, options) =>
  fetch(`${ref}://${host}${port}${url}`, options).then(res => res.json());
export default fetchApi;
