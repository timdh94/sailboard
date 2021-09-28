const url = 'http://localhost:3005/';

const UserService = {};

UserService.login = async(userInfo) => {
  return await fetch(url + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(userInfo)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

UserService.confirmEmail = async(jwt) => {
  return await fetch(`${url}confirmation/${jwt}`, {
    method: 'GET',
    credentials: 'include'
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export default UserService;