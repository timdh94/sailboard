import './Account.css';
import AccountService from '../../../../services/AccountService';
import { useSelector, useDispatch } from 'react-redux';
import AccountDetails from '../AccountDetails/AccountDetails';
const { useEffect } = require('react');
const { useHistory } = require('react-router-dom');

const Account = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userInfo = useSelector(state => state.auth.userInfo);
  
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
      return;
    }
    if (userInfo) return;
    const accessToken = localStorage.getItem('accessToken');
    (async () => {
      console.log('Account fetching details');
      const res = await AccountService.getUserInfo(accessToken);
      if (res.user) {
        dispatch(({ type: 'LOGIN', payload: res.user }));
      }
    })();
  }, [isAuthenticated, userInfo, history, dispatch]);
  
  return (
    <div className='account-container'>
      <AccountDetails userInfo={userInfo}/>
    </div>
  );
};

export default Account;
