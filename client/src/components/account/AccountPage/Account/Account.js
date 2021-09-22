import './Account.css';
import AccountService from '../../../../services/AccountService';
import { connect } from 'react-redux';
import AccountDetails from '../AccountDetails/AccountDetails';
const { useEffect } = require('react');
const { useHistory } = require('react-router-dom');

const Account = ({ userInfo, setUserInfo, isAuthenticated }) => {
  const history = useHistory();
  
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
      return;
    }
    const accessToken = localStorage.getItem('accessToken');
    (async () => {
      const res = await AccountService.getUserInfo(accessToken);
      if (res.user) {
        setUserInfo(res.user);
      }
    })();
  }, [setUserInfo, isAuthenticated, history]);
  
  return (
    <div className='account-container'>
      <AccountDetails userInfo={userInfo}/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: (userInfo) => dispatch({type: 'SET_INFO', userInfo})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
