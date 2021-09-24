const url = 'http://localhost:3005/user';

const AccountService = {};

AccountService.createAccount = async (accountForm) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    crendentials: 'include',
    body: JSON.stringify(accountForm)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
  
AccountService.getUserInfo = async (accessToken) => {
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
};

export default AccountService; 