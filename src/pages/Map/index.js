import React, { useEffect, useRef } from 'react';
import './index.scss';
import { getGeoLocation } from '../../utils';
import avatarW from '../../assets/images/avatar_m.png';

const Map = () => {
  const mapRef = useRef();

  useEffect(() => {
    let tempLocation;
    if (window.kakao) {
      const kakao = window.kakao;
      // tempLocation = getGeoLocation();
      // console.log('map', tempLocation)
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 0,
          };

          const map = new kakao.maps.Map(mapRef.current, options);
          const imageSrc =
              'https://storage.googleapis.com/saathi_admin/avatar_m.png', // 마커이미지의 주소입니다
            imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          const markerImage = new kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imageOption
            ),
            markerPosition = new kakao.maps.LatLng(latitude, longitude); // 마커가 표시될 위치입니다

          // 마커를 생성합니다
          const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage, // 마커이미지 설정
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);
          // const map = new naver.maps.Map(mapRef.current, {
          //   center: new naver.maps.LatLng(latitude, longitude),
          //   zoom: 25,
          // });
          // const marker = new naver.maps.Marker({
          //   position: new naver.maps.LatLng(latitude, longitude),
          //   map: map,
          //   icon: {
          //     url: 'https://storage.googleapis.com/saathi_admin/avatar_m.png'
          //   }
          // });
        },
        (error) => {}
      );
    }
    // return navigator.geolocation.clearWatch(tempLocation);
  }, [window.kakao]);

  useEffect(() => {
    // if(window.speechSynthesis){
    //   const speechSynthesis = window.speechSynthesis;
    //   let utterance = new SpeechSynthesisUtterance('Hello world!');
    //   speechSynthesis.speak(utterance);
    // }
  }, []);
  return (
    <div className="Map">
      <div className="map-box" ref={mapRef}></div>
      <div className="alert yellow bottom"></div>
    </div>
  );
};

export default Map;
