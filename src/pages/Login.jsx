import React from 'react';
import Button from '../components/common/Button';

const Login = () => {
  const handleLoginClick = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginClick} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
        <div>
          <label>email</label>
          <input type="text" name="email"></input>
        </div>
        <div>
          <label>password</label>
          <input type="password" name="password"></input>
        </div>
        <Button>login</Button>
      </form>
    </div>
  );
};

export default Login;
