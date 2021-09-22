import { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import UserService from '../../services/LoginService';

const formInitialState = {
  nameOrEmail: '',
  password: '',
};

const LoginForm = () => {
  const history = useHistory();
  const [loginForm, setLoginForm] = useState(formInitialState);
  const [serverRes, setServerRes] = useState('');
  
  // TODO: use effect to check if user is already logged in from 
  // store info
  
  const checkLogin = async (e) => {
    e.preventDefault();
    const res = await UserService.login(loginForm);
    if (res && res.message) setServerRes(res.message);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }
  
  return (
    <div className='login-form-container'>
      <form onSubmit={checkLogin} className='login-form'>
        <label htmlFor='userNameInput'>username or email</label>
          <input
            type='text'
            name='nameOrEmail'
            id='userNameInput'
            value={loginForm.nameOrEmail}
            required={true}
            onChange={handleChange}
            spellCheck='false'
          />
        <label htmlFor='userPassword'>password</label>
          <input
            type='password'
            name='password'
            value={loginForm.Password}
            required={true}
            onChange={handleChange}
            spellCheck='false'
          />
        {serverRes}
        <input
          type='submit'
          name='login'
          id='loginButton'
          value='login'
        />
      </form>
      <Link to={'/createaccount'} className='create-account-link'>
        No account? Create one here
      </Link>
    </div>
  );
};

export default LoginForm;