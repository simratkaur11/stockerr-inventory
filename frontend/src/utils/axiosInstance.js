// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:5000/api', // adjust if needed
// });

// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default instance;


import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // or use import.meta.env.VITE_API_BASE_URL
});

instance.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;

