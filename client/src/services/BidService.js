const url = 'http://localhost:3005/bid/';

const BidService = {};

BidService.placeBid = async (bid) => {
  const authToken = localStorage.getItem('accessToken');
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
  const accessToken = localStorage.getItem('accessToken');
  return fetch(`${url}${listingId}`, {
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

BidService.getUserBids = async (accessToken) => {
  return fetch('http://localhost:3005/user/bids', {
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

BidService.rejectBid = async (bid) => {
  const accessToken = localStorage.getItem('accessToken');
  
  return fetch(url + 'reject', {
    method: 'PATCH',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(bid)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

BidService.acceptBid =  async(bid) => {
  const accessToken = localStorage.getItem('accessToken');
  
  return fetch(url + 'accept', {
    method: 'PATCH' ,
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(bid)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export default BidService;
