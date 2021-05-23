import React, { useCallback, useEffect, useRef, useState } from 'react';
import './index.scss';
import { getGeoLocation } from '../../utils';

const Map = () => {
  const mapRef = useRef();
  const [mapObj, setMapObj] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [tempUser, setTempUser] = useState(null);
  const [tempUserMarker, setTempUserMarker] = useState(null);
  const [alert, setAlert] = useState('');

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
    const imageSrc = '/avatar_m.png', // 마커이미지의 주소입니다
      imageSize = new window.kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
      imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const marker = new window.kakao.maps.Marker({
      position: mapPosition,
      image: markerImage, // 마커이미지 설정
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
        const imageSrc =
            '/avatar_w.png',
          imageSize = new window.kakao.maps.Size(30, 30),
          imageOption = { offset: new window.kakao.maps.Point(27, 69) };
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
        // 마커를 생성합니다
        const tempUserMarker = new window.kakao.maps.Marker({
          position: mapPosition,
          image: markerImage, // 마커이미지 설정
        });
        tempUserMarker.setMap(mapObj);
        setTempUserMarker(tempUserMarker);
        const testInterval = setInterval(function () {
          setTempUser((user) => {
            console.log(user.latitude - userLocation.latitude);
            return { ...user, latitude: user.latitude + 0.0001, longitude: user.longitude + 0.00000002 };
          });
        }, 1000);
        setTimeout(function () {
          clearTimeout(testInterval);
        }, 20000);
      } else {
        if (
          tempUser.latitude - userLocation.latitude >= -0.0008 &&
          tempUser.latitude - userLocation.latitude <= -0.0006
        ) {
          setAlert('bottom red');
          if (window.speechSynthesis) {
            const speechSynthesis = window.speechSynthesis;
            console.log(speechSynthesis)
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
      // tempLocation = getGeoLocation(successCallBack, errorCallBack);
      navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
    }
    // return navigator.geolocation.clearWatch(tempLocation);
  }, [window.kakao]);

  useEffect(() => {}, []);

  return (
    <div className="Map">
      <div className="map-box" ref={mapRef}></div>
      {alert && <div className={`alert ${alert}`}></div>}
    </div>
  );
};

export default Map;
