import React from 'react';
import './App.css';
import NavBar from './components/nav/NavBar/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './components/login/Login';
import CreateAccount from './components/account/CreateAccount/CreateAccount';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Route path='/login' exact component={LoginForm} />
        <Route path='/createaccount' exact component={CreateAccount} />
      </div>
    </Router>
  );
}

export default App;
