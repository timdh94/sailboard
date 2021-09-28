import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import UserService from '../../services/LoginService';
import { useDispatch } from 'react-redux';

const formInitialState = {
  nameOrEmail: '',
  password: '',
};

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState(formInitialState);
  const [serverRes, setServerRes] = useState('');
  
  const checkLogin = async (e) => {
    e.preventDefault();
    const res = await UserService.login(loginForm);
    if (res && res.message) setServerRes(res.message);
    setLoginForm(formInitialState);
    if (res.accessToken) {
      localStorage.setItem('accessToken', res.accessToken);
      dispatch({ type: 'LOGIN', payload: res.user });
      history.push('/');
    }
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
            autoComplete='off'
            value={loginForm.nameOrEmail}
            required={true}
            onChange={handleChange}
            spellCheck='false'
          />
        <label htmlFor='userPassword'>password</label>
          <input
            type='password'
            name='password'
            value={loginForm.password}
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
