import AccountService from '../../../../services/AccountService';
import { connect } from 'react-redux';
const { useEffect } = require('react');
// import account details component

const Account = ({ userInfo, setUserInfo }) => {
  
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    (async () => {
      const res = await AccountService.getUserInfo(accessToken);
      if (res.user) {
        setUserInfo(res.user);
      }
    })();
  }, [setUserInfo]);
  
  return (
    <div>
      {userInfo.userName}
      {userInfo.firstName}
      {userInfo.lastName}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: (userInfo) => dispatch({type: 'SET_INFO', userInfo})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
