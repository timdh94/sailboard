const url = 'http://localhost:3005/collection';

const CollectionService = {};

CollectionService.getCollection = async (accessToken) => {
  return fetch(url, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

CollectionService.addKeyboard = async (keyboard, accessToken) => {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(keyboard),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};


module.exports = CollectionService;
