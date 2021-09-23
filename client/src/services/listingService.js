const url = 'http://localhost:3005/listings/'
const ListingService = {};

ListingService.createListing = async (newListing, accessToken) => {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(newListing)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

ListingService.getAllListings = async () => {
  return fetch(url, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export default ListingService;