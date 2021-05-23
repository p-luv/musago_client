import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import './index.scss';
import useInput from '../../hooks/useInput';
import InputBox from '../../components/InputBox';
import NextButton from '../../components/ButtonTypeOne';
import { useHistory, Route, useParams } from 'react-router-dom';
import backIcon from '../../assets/images/arrow_back_ios_black.svg';
import classNames from 'classnames';
import Loader from '../../components/Loader';
import { postToSignIn, postToSignUp } from '../../api';
import { AuthContext } from '../../contexts/Auth';

const Signup = () => {
  const [userId, setUserId] = useInput('');
  const [password, setPassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useInput('');
  const [nickName, setNickName] = useInput('');
  const [vehicleNumber, setVehicleNumber] = useInput('');
  const [level, setLevel] = useState('');
  const drivingLevel = useRef(['Beginner', 'Expert', 'Elderly']);
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);
  

  const onClickMoveToNext = useCallback(() => {
    history.push('/signup/2');
  }, []);

  const onClickMoveToBack = useCallback(() => {
    history.goBack();
  }, []);

  const onClickSubmitUserInfo = useCallback(async () => {
    setLoading(true);
    const userData = {
      username: userId,
      password1: password,
      password2: passwordCheck,
      nickname: nickName,
      carno: vehicleNumber,
      optype: level
    }
    const {data} =  await postToSignUp(userData);
    setToken(data.Token)
    setLoading(false);
    history.push('/');
  }, [userId, password, passwordCheck, nickName, vehicleNumber, level]);

  return (
    <div className="SignUp">
      <header>
        <img src={backIcon} onClick={onClickMoveToBack} />
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: (id / 2) * 100 + '%' }}
          ></div>
        </div>
      </header>
      <div className="description-wrapper">
        <p>Enter Your</p>
        <p>
          {id === 1
            ? 'ID & Password & Nicname'
            : 'vehicle number and driving skills'}
        </p>
      </div>
      <Route exact path="/signup/1">
        <div className="input-wrapper">
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
          <InputBox
            value={passwordCheck}
            setValue={setPasswordCheck}
            id={'password'}
            placeholder="Check Your Password"
            type="password"
          />
          <InputBox
            value={nickName}
            setValue={setNickName}
            id={'nickname'}
            placeholder="Nickname"
            type="text"
          />
        </div>
        <NextButton
          name="Next"
          onClick={onClickMoveToNext}
          isActive={
            userId &&
            password &&
            passwordCheck &&
            nickName &&
            password === passwordCheck
          }
        />
      </Route>
      <Route exact path="/signup/2">
        <div className="input-wrapper">
          <InputBox
            value={vehicleNumber}
            setValue={setVehicleNumber}
            id={'vehicleNumber'}
            placeholder="vehicleNumber"
            type="text"
          />
          <div className="level-wrapper">
            <p className="title">Driving experience</p>
            <div className="button-box">
              {drivingLevel.current.map((value) => (
                <div
                  className={classNames({ active: value === level })}
                  onClick={() => {
                    setLevel(value);
                  }}
                >
                  {value === 'Beginner' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill={value === level ? '#ffffff' : '#000000'}
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
                  )}
                  {value === 'Expert' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill={value === level ? '#ffffff' : '#000000'}
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
                    </svg>
                  )}
                  {value === 'Elderly' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill={value === level ? '#ffffff' : '#000000'}
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
                    </svg>
                  )}
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
        <NextButton
          name="Done"
          onClick={onClickSubmitUserInfo}
          isActive={
            userId &&
            password &&
            passwordCheck &&
            nickName &&
            password === passwordCheck &&
            vehicleNumber &&
            level
          }
        />
      </Route>
      {loading && <Loader />}
    </div>
  );
};

export default Signup;
