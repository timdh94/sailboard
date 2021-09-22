import React from 'react';
import './App.css';
import NavBar from './components/nav/NavBar/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './components/login/Login';
import CreateAccount from './components/account/CreateAccount/CreateAccount';
import Account from './components/account/AccountPage/Account/Account';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Route path='/login' exact component={LoginForm} />
        <Route path='/createaccount' exact component={CreateAccount} />
        <Route path='/account' exact component={Account} />
      </div>
    </Router>
  );
}

export default App;
