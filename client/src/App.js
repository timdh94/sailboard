import React from 'react';
import './App.css';
import NavBar from './components/nav/NavBar/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './components/login/Login';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Route path='/login' exact component={LoginForm} />
      </div>
    </Router>
  );
}

export default App;
