import axios from "axios";

// API 서버 기본 URL (개발 환경에서는 프록시 사용)
const BASE_URL = process.env.NODE_ENV === 'development' 
  ? "/api"  // 프록시 사용
  : "http://43.202.247.99:8080/api";  // 프로덕션에서는 직접 URL 사용

// --------------------------------------------------
// API 인스턴스 설정
// --------------------------------------------------

// 공용 API 인스턴스 (토큰 불필요)
const publicAPI = axios.create({
  baseURL: BASE_URL,
  headers: { 
    "Content-Type": "application/json"
  },
  // CORS 문제 해결을 위한 설정
  withCredentials: false
});

// 인증 API 인스턴스 (토큰 필요)
const privateAPI = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true를 사용하면 쿠키를 포함한 요청을 보낼 수 있습니다.
  // false로 설정되어 있어 주석 처리합니다.
  // withCredentials: true,
});

// --------------------------------------------------
// 인터셉터 설정 (요청/응답 가로채기)
// --------------------------------------------------

// privateAPI 요청 인터셉터: 토큰 자동 추가
privateAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// privateAPI 응답 인터셉터: 에러 처리 및 토큰 갱신
privateAPI.interceptors.response.use(
  (response) => {
    // 응답이 성공하면 응답 객체를 그대로 반환
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // HTTP 상태 코드가 401이고, 이전에 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // (가정) 리프레시 토큰을 사용하여 새로운 액세스 토큰을 받아오는 API 호출
        // 이 로직은 백엔드 구현에 따라 달라집니다.
        // const newAccessToken = await refreshAccessToken(); 
        // localStorage.setItem("accessToken", newAccessToken);
        // 새로운 토큰으로 헤더를 업데이트하고 원래 요청을 재시도합니다.
        // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // return axios(originalRequest);
        
        // 여기서는 토큰 만료 시 로그인 페이지로 리디렉션하는 예시를 보여줍니다.
        console.warn("액세스 토큰이 만료되었습니다. 다시 로그인해주세요.");
        // window.location.href = "/login"; // 예시
        
      } catch (refreshError) {
        // 리프레시 토큰도 만료되었거나 갱신 실패 시
        console.error("토큰 갱신 실패:", refreshError);
        // window.location.href = "/login"; // 예시
        return Promise.reject(refreshError);
      }
    }
    // 기타 에러는 그대로 반환
    return Promise.reject(error);
  }
);

// --------------------------------------------------
// API 서비스 객체 (개선)
// --------------------------------------------------

/**
 * API 서비스 객체
 * 응답 전체 객체를 반환하도록 수정 (데이터, 상태 코드, 헤더 등 모두 접근 가능)
 */
export const APIService = {
  // 공용 API 메서드 (토큰 불필요)
  public: {
    get: async (url, config = {}) => publicAPI.get(url, config),
    post: async (url, data = {}, config = {}) => publicAPI.post(url, data, config),
    put: async (url, data = {}, config = {}) => publicAPI.put(url, data, config),
    delete: async (url, config = {}) => publicAPI.delete(url, config),
    patch: async (url, data = {}, config = {}) => publicAPI.patch(url, data, config),
  },

  // 인증 API 메서드 (토큰 필요)
  private: {
    get: async (url, config = {}) => privateAPI.get(url, config),
    post: async (url, data = {}, config = {}) => privateAPI.post(url, data, config),
    put: async (url, data = {}, config = {}) => privateAPI.put(url, data, config),
    delete: async (url, config = {}) => privateAPI.delete(url, config),
    patch: async (url, data = {}, config = {}) => privateAPI.patch(url, data, config),
  },
};

export { publicAPI, privateAPI };