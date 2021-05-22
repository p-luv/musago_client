import React, { useCallback, useState } from 'react';
import './index.scss';
import useInput from '../../hooks/useInput';
import InputBox from '../../components/InputBox';
import NextButton from '../../components/ButtonTypeOne';
import Loader from '../../components/Loader';
import { useHistory, Link } from 'react-router-dom';

const SignIn = () => {
  const [userId, setUserId] = useInput('');
  const [password, setPassword] = useInput('');
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const moveTomain = useCallback(() => {
    history.push('/main')
  }, [])

  return <div className="SignIn">
    <InputBox value={userId} setValue={setUserId} id={'userId'} placeholder='ID' type='text'  />
    <InputBox value={password} setValue={setPassword} id={'password'} placeholder='Password' type='password'  />
    <NextButton name='Log-in' onClick={moveTomain} isActive={userId && password}  />
    <Link to="/signup/1">Sign Up</Link>
    {loading && <Loader />}
  </div>;
};

export default SignIn;


// import React from 'react';
// import './index.scss';

// const SignIn = () => {
//   return <div className="SignIn">
    
//   </div>;
// };

// export default SignIn;