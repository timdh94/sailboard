import './EmailConfirmation.css';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import UserService from '../../services/LoginService';

const EmailConfirmation = () => {
  const { jwt } = useParams();
  
  useEffect(() => {
    (async () => {
      const res = await UserService.confirmEmail(jwt);
      console.log(res);
    })();
  }, []);

  return (
    <div>email confirmation works</div>
  );
};

export default EmailConfirmation;