export const getCountries = () => {
  return new Promise(resolve => {
    fetch(process.env.API_URL + '/countries').then(
        response => resolve(response.json()));
  })
}