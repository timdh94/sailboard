import './NavBar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// TODO: redirect to home on logout
const NavBar = ({ isAuthenticated, setUserInfo, setIsAuthenticated }) => {
  return (
    <div className="top-navbar-container">
      <div className="top-navbar"></div>
      <ul className="navbar-list">
        <Link to={'/'} className='top-nav-list active'>home</Link>
        <Link to={'/browse'} className='top-nav-list'>browse</Link>
        <Link to={'/mycollection'} className='top-nav-list'>my collection</Link>
        <Link to={'/mylistings'} className='top-nav-list'>my listings</Link>
        {isAuthenticated ? 
          <Link 
            to={'/account'} 
            className='top-nav-list active top-nav-list-right'>
            my account
          </Link>
        : <></>}
        {isAuthenticated?
          <div 
            onClick={() => {
              setUserInfo();
              setIsAuthenticated();
              localStorage.setItem('accessToken', null);
            }}
            className='top-nav-list top-nav-list-right'
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: () => dispatch({ type: 'SET_INFO', userInfo: null}),
    setIsAuthenticated: () => dispatch({ type: 'SET_AUTH', status: false })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);