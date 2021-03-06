import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import './index.scss';
import { AuthContext } from '../../contexts/Auth';
import { getToPoint } from '../../api';
import classNames from 'classnames';
import { getGeoLocation } from '../../utils'; // -> 추후 실시간 watch 로 location 정보 받아올 예정

const Map = () => {
  const mapRef = useRef();
  const [mapObj, setMapObj] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [tempUser, setTempUser] = useState(null);
  const [tempUserMarker, setTempUserMarker] = useState(null);
  const [alert, setAlert] = useState('');
  const { token } = useContext(AuthContext);
  const [pointData, setPointData] = useState({
    interventions: 0,
    score: 0,
    speed: 0,
    speeding: 0,
    user: 10,
  });
  const [scoreModal, setScoreModal] = useState(false);

  useEffect(() => {
    if (token) {
      getToPoint(token).then((data) => {
        setPointData(data.data[0]);
      });
    }
  }, [token]);

  const successCallBack = (position) => {
    const { latitude, longitude } = position.coords;
    const mapPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const options = {
      center: mapPosition,
      level: 0,
    };
    const mapObj = new window.kakao.maps.Map(mapRef.current, options);
    const userObj = {
      level: '0',
      latitude: latitude,
      longitude: longitude,
    };
    setUserLocation(userObj);
    const imageSrc = '/avatar_m.png',
      imageSize = new window.kakao.maps.Size(30, 30),
      imageOption = { offset: new window.kakao.maps.Point(27, 69) };

    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const marker = new window.kakao.maps.Marker({
      position: mapPosition,
      image: markerImage,
    });
    marker.setMap(mapObj);
    setMapObj(mapObj);

    if (!tempUser) {
      const tempUserObj = {
        level: '0',
        latitude: latitude - 0.001,
        longitude: longitude,
      };
      setTimeout(() => {
        setTempUser(tempUserObj);
      }, [2000]);
    }
  };

  useEffect(() => {
    if (tempUser && mapObj) {
      const { latitude, longitude } = tempUser;
      const mapPosition = new window.kakao.maps.LatLng(latitude, longitude);
      if (!tempUserMarker) {
        const imageSrc = '/avatar_w.png',
          imageSize = new window.kakao.maps.Size(30, 30),
          imageOption = { offset: new window.kakao.maps.Point(27, 69) };

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        const tempUserMarker = new window.kakao.maps.Marker({
          position: mapPosition,
          image: markerImage,
        });
        tempUserMarker.setMap(mapObj);
        setTempUserMarker(tempUserMarker);
        const testInterval = setInterval(function () {
          setTempUser((user) => {
            return {
              ...user,
              latitude: user.latitude + 0.0001,
              longitude: user.longitude + 0.00000002,
            };
          });
        }, 1000);
        setTimeout(function () {
          clearTimeout(testInterval);
        }, 20000);
        setTimeout(function () {
          setScoreModal(true);
        }, 23000);
      } else {
        if (
          tempUser.latitude - userLocation.latitude >= -0.0008 &&
          tempUser.latitude - userLocation.latitude <= -0.0006
        ) {
          setAlert('bottom red');
          if (window.speechSynthesis) {
            const speechSynthesis = window.speechSynthesis;
            let utterance = new SpeechSynthesisUtterance('look out');
            speechSynthesis.speak(utterance);
          }
        }
        if (tempUser.latitude - userLocation.latitude >= 0.0007) {
          setAlert('');
        }
        tempUserMarker.setVisible(false);
        tempUserMarker.setPosition(mapPosition);
        tempUserMarker.setVisible(true);
      }
    }
  }, [tempUser, mapObj]);

  const errorCallBack = useCallback(() => {}, []);

  useEffect(() => {
    let tempLocation;
    if (window.kakao) {
      navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
    }
    // 추후 getGeoLocation 로 실시간 데이터 받아올 때 아래 코드 사용 예정
    // return navigator.geolocation.clearWatch(tempLocation);
  }, [window.kakao]);

  useEffect(() => {}, []);

  return (
    <>
      <div className="Map">
        <div className="map-box" ref={mapRef}></div>
        {alert && <div className={`alert ${alert}`}></div>}
      </div>
      <div
        className={classNames('score-modal', { isShown: scoreModal })}
        onClick={() => {
          setScoreModal(false);
        }}
      >
        <div className="modal-title">
          <p>Your</p>
          <p>
            Safety Score <span>is</span>
          </p>
        </div>
        <div className="score">{pointData.score}</div>
        <div className="score-description">
          Your number of interventions has decreased by {pointData.user}%
          compared to last week!
        </div>
        <div className="scores-box">
          <span>Speed {pointData.speed}Km/h</span>
          <span>{pointData.interventions} Interventions</span>
          <span>{pointData.speeding} Speeding</span>
        </div>
      </div>
    </>
  );
};

export default Map;
