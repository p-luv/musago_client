import axios from 'axios';

const baseUrl =
  'http://ec2-54-180-115-221.ap-northeast-2.compute.amazonaws.com:8080/account';

export const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const postToSignUp = (data) => {
  return api.post('/signup', data, {});
};

export const postToSignIn = (data) => {
  return api.post('/login/', data, {});
};

export const getToPoint = (token) => {
  return api.get('/point/', {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
