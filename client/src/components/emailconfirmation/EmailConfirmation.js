import './EmailConfirmation.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import UserService from '../../services/LoginService';

const EmailConfirmation = () => {
  const { jwt } = useParams();
  const [confirmed, setConfirmed] = useState(true);
  
  useEffect(() => {
    (async () => {
      const res = await UserService.confirmEmail(jwt);
      if (res.message === 'Email confirmed!') setConfirmed(false);
    })();
  }, []);

  
  if (confirmed) {
    return (
      <div className='email-confirmation-page'>
        <div>email confirmed!</div>
        <div>please <a href='http://localhost:3000/login'>login</a> to access your account</div>
      </div>
    )
  }
  return (
    <div>email confirmation works</div>
  );
};

export default EmailConfirmation;