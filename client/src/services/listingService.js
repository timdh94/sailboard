const url = 'http://localhost:3005/listing/'
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

ListingService.getUserListings = async (accessToken) => {
  return fetch(url + 'userListings', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
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

ListingService.getListing = async (id) => {
  return fetch(url + id, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

ListingService.getUserHistory = async () => {
  const accessToken = localStorage.getItem('accessToken');
  return (fetch('http://localhost:3005/userHistory', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }))
    .then(res => res.json())
    .catch(err => console.log(err));
};

export default ListingService;
