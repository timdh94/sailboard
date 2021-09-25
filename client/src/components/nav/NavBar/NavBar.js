import './NavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// TODO: redirect to home on logout
const NavBar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();
  
  // need to do more here
  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOGOUT' })
    dispatch({ type: 'SET_BOARDS', payload: [] });
    dispatch({ type: 'SET_USER_LISTINGS', payload: [] });
    history.push('/');
  };

  return (
    <div className="top-navbar-container">
      <div className="top-navbar"></div>
      <ul className="navbar-list">
        <Link to={'/'} className='top-nav-list active'>home</Link>
        <Link to={'/browse'} className='top-nav-list'>browse</Link>
        {isAuthenticated && <Link to={'/mycollection'} className='top-nav-list'>my collection</Link>}
        {isAuthenticated && <Link to={'/mylistings'} className='top-nav-list'>my listings</Link>}
        {isAuthenticated &&
          <Link 
            to={'/account'} 
            className='top-nav-list active top-nav-list-right'>
            my account
          </Link>
        }
        {isAuthenticated ?
          <div 
            className='top-nav-list top-nav-list-right'
            onClick={logout}
          >logout</div>
        :
        <Link
         to={'/login'}
         className='top-nav-list top-nav-list-right'
         >login</Link>}
      </ul>
    </div>
  );
};
export default NavBar;