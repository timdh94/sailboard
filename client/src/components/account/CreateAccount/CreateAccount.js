import './CreateAccount.css';
import React, { useState } from 'react';
import AccountService from '../../../services/AccountService';
import { connect } from 'react-redux';
const { useHistory } = require('react-router-dom');

const formDefault = {
  userName: '',
  email: '',
  password: '',
  country: ''
};

// TODO: ADD CONFIRM PASSWORD FIELD AND PASSWORD STRENGTH INDICATOR
// TODO: ADD COUNTRY DROP DROP SELECTOR

const CreateAccount = ({ setIsAuthenticated }) => {
  const [form, setForm] = useState(formDefault);
  const [serverRes, setServerRes] = useState('');
  const history = useHistory();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const submitAccount = async (e) => {
    e.preventDefault();
    const res = await AccountService.createAccount(form);
    if (res && res.message) setServerRes(res.message);
    setForm(formDefault);
    if (res.message === 'Account created') {
      setIsAuthenticated();
      history.push('/login');
    }
  };

  return (
    <div className='create-account-form-container'>
      <h1 className='form-title'>create account</h1>
      {serverRes}
      <form className='create-account-form' onSubmit={submitAccount}>
        <label htmlFor='userNameInput'>username</label>
        <input
          type='text'
          name='userName'
          id='userNameInput'
          value={form.userName}
          required={true}
          autoComplete='off'
          onChange={handleChange}
          spellCheck='false'
          minLength={3}
          maxLength={15}
        />
        <label htmlFor='userEmailInput'>email</label>
        <input
          type='email'
          name='email'
          id='userEmailInput'
          value={form.email}
          required={true}
          autoComplete='off'
          onChange={handleChange}
          spellCheck='false'
        />
        <label htmlFor='countryInput'>country</label>
        <input
          type='text'
          name='country'
          id='countryInput'
          value={form.country}
          required={true}
          autoComplete='off'
          onChange={handleChange}
          spellCheck='false'
          maxLength={30}
        />
        <label htmlFor='userPasswordInput'>password</label>
        <input
          type='password'
          name='password'
          id='userPasswordInput'
          value={form.password}
          autoComplete='off'
          onChange={handleChange}
          minLength={8}
        />
        <input
          type='submit'
          name='createAccount'
          id='createAccountButton'
          value='create account'
        />
      </form>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsAuthenticated: () => dispatch({ type: 'SET_AUTH', status: true })
  };
};

export default connect(null, mapDispatchToProps)(CreateAccount);
