// src/api/userService.ts
import { publicAPI } from './axios';

// 로그인 API
export const login = async (loginData) => {
  try {
    try {
      const { data } = await publicAPI.post('/auth/login', loginData);

      // 서버 응답 키 이름에 맞춰 사용 (필요하면 키명 조정)
      const accessToken = data.accessToken || data.token || null;
      const refreshToken = data.refreshToken || null;
      const user = data.user ?? null;

      if (accessToken) localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      if (user) localStorage.setItem('currentUser', JSON.stringify(user));

      return data;

    } catch (apiError) {
      console.error('API 서버 연결 실패:', apiError);
      console.error('에러 상세:', {
        status: apiError.response?.status,
        statusText: apiError.response?.statusText,
        data: apiError.response?.data,
        headers: apiError.response?.headers,
        message: apiError.message,
        code: apiError.code,
      });

      // === 개발 중 더미 응답 분기 유지 ===
      return await new Promise((resolve) => {
        setTimeout(() => {
          const dummyUsers = JSON.parse(localStorage.getItem('dummyUsers') || '[]');

          const validCredentials = [
            { email: 'jhjk1234@gmail.com', password: 'password123!', nickname: '비쿠' },
            { email: 'ABC123@gmail.com',  password: 'masill@1',     nickname: 'masill_love' },
            ...dummyUsers,
          ];

          const matchedCredential = validCredentials.find(
            (cred) => cred.email === loginData.email && cred.password === loginData.password
          );

          if (matchedCredential) {
            const fake = {
              success: true,
              message: '로그인 성공 (더미)',
              accessToken: 'dummy_access_token_' + Date.now(),
              refreshToken: 'dummy_refresh_token_' + Date.now(),
              user: {
                id: Math.floor(Math.random() * 10000) + 1,
                email: loginData.email,
                nickname: matchedCredential.nickname,
              },
            };
            // 더미도 저장(이후 API에서 Authorization 자동 주입)
            localStorage.setItem('accessToken', fake.accessToken);
            localStorage.setItem('refreshToken', fake.refreshToken);
            localStorage.setItem('currentUser', JSON.stringify(fake.user));
            resolve(fake);
          } else {
            resolve({
              success: false,
              message: '이메일 또는 비밀번호가 올바르지 않습니다.',
            });
          }
        }, 600);
      });
    }
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
};

// 회원가입 API
export const signUp = async (userData) => {
  try {
    try {
      // 백엔드에서 기대하는 데이터 구조를 시도
      const requestData = {
        email: userData.email,
        password: userData.password,
        username: userData.username,
        phoneNumber: userData.phoneNumber || userData.phone || "01012345678"
      };
      
      console.log('백엔드로 전송할 데이터:', requestData);
      
      const { data } = await publicAPI.post('/users/sign-up', requestData);
      // 백엔드가 자동 로그인 토큰을 주면 저장
      if (data?.accessToken) localStorage.setItem('accessToken', data.accessToken);
      if (data?.user) localStorage.setItem('currentUser', JSON.stringify(data.user));
      return data;
    } catch (apiError) {
      console.warn('API 서버 연결 실패, 더미 응답 사용:', apiError);
      console.error('API 오류 상세:', {
        status: apiError.response?.status,
        statusText: apiError.response?.statusText,
        data: apiError.response?.data,
        message: apiError.message,
      });

      // 400 오류인 경우 백엔드 응답 메시지 확인
      if (apiError.response?.status === 400) {
        console.error('400 오류 - 백엔드 응답:', apiError.response?.data);
        console.error('전송한 데이터:', userData);
      }

      if ([400, 500].includes(apiError.response?.status)) {
        return await new Promise((resolve) => {
          setTimeout(() => {
            const dummyUsers = JSON.parse(localStorage.getItem('dummyUsers') || '[]');
            const newUser = {
              email: userData.email,
              password: userData.password,
              nickname: userData.username, // 백엔드에서 username으로 받는 닉네임
            };
            const idx = dummyUsers.findIndex((u) => u.email === newUser.email);
            if (idx >= 0) dummyUsers[idx] = newUser;
            else dummyUsers.push(newUser);

            localStorage.setItem('dummyUsers', JSON.stringify(dummyUsers));

            resolve({
              success: true,
              code: 200,
              message: null,
              data: { nickname: userData.username },
            });
          }, 600);
        });
      }
      throw apiError;
    }
  } catch (error) {
    console.error('회원가입 오류:', error);
    throw error;
  }
};

// 닉네임 중복 확인 API (실제 호출 우선, 실패 시만 더미)
export const checkNicknameDuplicate = async (nickname) => {
  try {
    const { data } = await publicAPI.get('/users/nickname/check', {
      params: { nickname }, // => ?nickname=...
    });
    return data; // { available: boolean, message: string } 형태 가정
  } catch (apiError) {
    const status = apiError.response?.status;
    if (status === 403) {
      console.warn('403: 인증 필요. 백엔드에서 공개 API로 열거나, 프론트는 토큰 포함 호출 필요');
    }
    console.warn('닉네임 중복 확인 API 실패. 더미로 대체:', apiError);

    // === 더미 ===
    return await new Promise((resolve) => {
      setTimeout(() => {
        const reservedNicknames = ['admin', 'test', 'user', '관리자', '테스트'];
        const isDup = reservedNicknames.includes(String(nickname).toLowerCase());
        resolve({
          available: !isDup,
          message: isDup ? '이미 사용 중인 닉네임입니다.' : '사용 가능한 닉네임입니다.',
        });
      }, 300);
    });
  }
};

// 닉네임 변경 API
export const updateNickname = async (nickname) => {
  try {
    const res = await publicAPI.patch('/users/me/nickname', { nickname });
    return {
      success: true,
      code: res.status,
      message: '닉네임이 성공적으로 변경되었습니다.',
      data: { nickname },
    };
  } catch (apiError) {
    console.warn('닉네임 변경 실패. 필요 시 더미 분기:', apiError);
    const status = apiError.response?.status;

    if ([401, 403, 500].includes(status)) {
      // === 더미 ===
      return await new Promise((resolve) => {
        setTimeout(() => {
          const dummyUsers = JSON.parse(localStorage.getItem('dummyUsers') || '[]');
          const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

          if (currentUser.email) {
            const idx = dummyUsers.findIndex((u) => u.email === currentUser.email);
            if (idx >= 0) dummyUsers[idx].nickname = nickname;
            currentUser.nickname = nickname;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
          }
          localStorage.setItem('dummyUsers', JSON.stringify(dummyUsers));

          resolve({
            success: true,
            code: 200,
            message: '닉네임이 성공적으로 변경되었습니다.',
            data: { nickname },
          });
        }, 600);
      });
    }
    throw apiError;
  }
};

// 프로필 이미지 업로드 API
export const uploadProfileImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('profileImage', imageFile);

    // FormData일 땐 Content-Type 수동 지정 불필요(자동 boundary 포함)
    const { data } = await publicAPI.post('/users/me/profile-image', formData);
    return data;
  } catch (error) {
    console.error('프로필 이미지 업로드 API 오류:', error);
    throw error;
  }
};
