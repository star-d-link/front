import axios from "axios";

const ApiClient = axios.create({
  baseURL: "http://localhost:8080/", // 서버의 baseURL
});

// 요청 인터셉터 추가
ApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 토큰 가져오기
    if (token) {
      config.headers.Authorization = `${token}`; // 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiClient;
