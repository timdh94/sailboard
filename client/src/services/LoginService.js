const url = 'http://localhost:3005/';

const UserService = {
  login: async(userInfo) => {
    const res = await fetch(url + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .catch(err => console.log(err));
    return res;
  },
};

export default UserService;