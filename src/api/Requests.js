export const getCountries = async () => {
  return await fetch(process.env.API_URL + '/countries').then(
    response => response.json());
}

export const getBook = async (country) => {
  return await fetch(process.env.API_URL + '/books/' + country).then(
    response => response.json());
}

export const getBooks = async token => {
  const response = await fetch(process.env.API_URL + '/books', {
    headers: { Authorization: "token" }
  });

  if (response.ok) return response.json();
  throw response;
}

export const createBook = async (book, token) => {
  return await fetch(process.env.API_URL + '/books', {
    method: "POST",
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(book)
  }).then(response => response.json());
}

export const getAllCountries = async () => {
  return await fetch('https://restcountries.eu/rest/v2/all').then(
    response => response.json());
}