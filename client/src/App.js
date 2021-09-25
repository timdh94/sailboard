import React from 'react';
import './App.css';
import NavBar from './components/nav/NavBar/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useEffect } from 'react';
import AccountService from './services/AccountService';
import { useDispatch } from 'react-redux';
import LoginForm from './components/login/Login';
import CreateAccount from './components/account/CreateAccount/CreateAccount';
import Account from './components/account/AccountPage/Account/Account';
import Collection from './components/collection/KeyboardCollection/KeyboardCollection';
import UserListings from './components/userListings/UserListings/UserListings';
import BrowseAll from './components/browse/BrowseAll/BrowseAll';
import ListingDetails from './components/browse/ListingDetails/ListingDetails';
//import BidService from './services/BidService';
//import ListingService from './services/listingService';


// TODO: get listings on page load <--- check for pending bids


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check auth status
    (async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) return;
      const res = await AccountService.getUserInfo(accessToken);
      if (res.user) {
        dispatch({ type: 'LOGIN', payload: res.user });
      }
    })();
  }, [dispatch]);

  return (
    <Router>
      <div>
        <NavBar />
        <Route path='/login' exact component={LoginForm} />
        <Route path='/createaccount' exact component={CreateAccount} />
        <Route path='/account' exact component={Account} />
        <Route path='/mycollection' exact component={Collection} />
        <Route path='/mylistings' exact component={UserListings} />
        <Route path='/browse' exact component={BrowseAll} />
        <Route path='/listing/:id' exact component={ListingDetails} />
      </div>
    </Router>
  );
}

export default App;
