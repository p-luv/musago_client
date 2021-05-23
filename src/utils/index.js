export const getGeoLocation = (successCallBack, errorCallback) => {
  let temp;


  const options = {
    enableHighAccuracy: true,
    maximumAge: 0
  };

  if (navigator.geolocation) {
    temp = navigator.geolocation.watchPosition(
      successCallBack,
      errorCallback,
      options
    );
  }

  return temp;
};

export const getDistance = (lat1, lng1, lat2, lng2) => {
  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };
  const r = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = r * c;
  return Math.round(d * 1000);
};
