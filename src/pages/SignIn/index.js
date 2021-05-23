import React, { useCallback, useState, useContext } from 'react';
import './index.scss';
import useInput from '../../hooks/useInput';
import InputBox from '../../components/InputBox';
import NextButton from '../../components/ButtonTypeOne';
import Loader from '../../components/Loader';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth';
import { postToSignIn } from '../../api';
import logo from '../../assets/images/logo.png';

const SignIn = () => {
  const [userId, setUserId] = useInput('');
  const [password, setPassword] = useInput('');
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);

  const moveTomain = useCallback(async () => {
    setLoading(true);
    const userData = {
      username: userId,
      password: password,
    };
    const { data } = await postToSignIn(userData);
    setToken(data.Token);
    setLoading(false);

    history.push('/');
  }, [userId, password]);

  return (
    <div className="SignIn">
      <img className="logo" src={logo} />
      <p className="title">MUSAGO</p>
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
      <Link to="/signup/1">Sign Up</Link>
      {loading && <Loader />}
    </div>
  );
};

export default SignIn;
