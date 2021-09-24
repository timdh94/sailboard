const url = 'http://localhost:3005/bid';

const BidService = {};

BidService.placeBid = async (bid) => {
  const authToken = localStorage.getItem('accessToken');
  console.log(authToken);
  if (!authToken) return {
    message: 'Not authenticated, please log in'
  };
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(bid)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

BidService.getListingBids = async (listingId) => {
  const authToken = localStorage.getItem('accessToken');
  return fetch(`${url}/${listingId}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export default BidService;
