import React from 'react';
import './index.scss';

const Signup = () => {
  return (
    <div className="Signup">
      <InputBox
        value={userId}
        setValue={setUserId}
        id={'userId'}
        placeholder="ID"
        type="text"
      />
      <InputBox
        value={password}
        setValue={setPassword}
        id={'password'}
        placeholder="Password"
        type="password"
      />
      <NextButton
        name="Log-in"
        onClick={moveTomain}
        isActive={userId && password}
      />
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Signup;
