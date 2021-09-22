const url = 'http://localhost:3005/users';

const AccountService = {
  createAccount: async (accountForm) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      crendentials: 'include',
      body: JSON.stringify(accountForm)
    })
      .then(res => res.json())
      .catch(err => console.log(err));
    return res;
  }
};

export default AccountService; 