import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="top-navbar-container">
      <div className="top-navbar"></div>
      <ul className="navbar-list">
        <Link to={'/'} className='top-nav-list active'>home</Link>
        <Link to={'/browse'} className='top-nav-list'>browse</Link>
        <Link to={'/mycollection'} className='top-nav-list'>my collection</Link>
        <Link to={'/mylistings'} className='top-nav-list'>my listings</Link>
        <Link 
          to={'/account'} 
          className='top-nav-list active top-nav-list-right'>
          my account
        </Link>
        <Link
          to={'/login'}
          className='top-nav-list top-nav-list-right'
        >
          login
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;