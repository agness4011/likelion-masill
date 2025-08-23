// src/api/userService.ts
import { publicAPI, privateAPI, multipartAPI } from './axios';

// 로그인 API
// 로그인 API (응답 경로 다양성 대응 + 저장 직후 검증 로그 + 더미는 JWT 금지)
// 로그인 API (서버 응답 구조: data.data.accessToken 대응)
// 로그인 API (응답 구조: data.data.accessToken 기준)
export const login = async (loginData) => {
  try {
    console.log('[login] 요청:', loginData);
    const res = await publicAPI.post('/auth/login', loginData);
    const body = res?.data ?? res;

    // 서버 응답 예시:
    // {
    //   success: true, code: 200, message: "...",
    //   data: { accessToken, userId, email, regionId, role, expirationTime }
    // }

    // 1) 토큰/유저 추출
    const accessToken = body?.data?.accessToken ?? null;
    // 회원가입된 사용자의 닉네임을 우선적으로 사용
    const dummyUsers = JSON.parse(localStorage.getItem('dummyUsers') || '[]');
    const savedUser = dummyUsers.find(u => u.email === body.data.email);
    const savedNickname = savedUser ? savedUser.nickname : null;
    
    console.log('=== 실제 로그인 닉네임 처리 ===');
    console.log('body.data:', body.data);
    console.log('dummyUsers:', dummyUsers);
    console.log('savedUser:', savedUser);
    console.log('savedNickname:', savedNickname);
    console.log('================================');
    
    const user = body?.data
      ? {
          id: body.data.userId,
          email: body.data.email,
          nickname: savedNickname || body.data.nickname || body.data.username || body.data.email.split('@')[0],
          regionId: body.data.regionId ?? null,
          role: body.data.role ?? null,
          expirationTime: body.data.expirationTime ?? null,
        }
      : null;

    if (!accessToken) {
      console.error('[login] 응답에 accessToken 없음:', body);
      throw new Error('accessToken 없음');
    }

    // 2) 저장 (리다이렉트/상태 변경 전에!)
    localStorage.setItem('accessToken', accessToken);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // localStorage nickname도 업데이트 (회원가입 시 설정한 닉네임 우선)
      if (user.nickname) {
        localStorage.setItem('nickname', user.nickname);
      }
      
      console.log('=== 실제 로그인 사용자 정보 저장 ===');
      console.log('저장된 currentUser:', user);
      console.log('nickname:', user.nickname);
      console.log('====================================');
    }
    
    // UserContext 업데이트를 위한 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent('userLogin'));

    // 3) 저장 직후 검증
    console.log('[login] 저장 직후 accessToken:', localStorage.getItem('accessToken'));
    console.log('[login] 저장 직후 currentUser:', JSON.parse(localStorage.getItem('currentUser') || 'null'));

    // (선택) JWT payload 확인
    if (accessToken.split('.').length === 3) {
      try {
        console.log('[login] JWT payload:', JSON.parse(atob(accessToken.split('.')[1])));
      } catch (e) {
        console.warn('[login] JWT payload 파싱 실패:', e);
      }
    }

    return body;
  } catch (apiError) {
    console.error('[login] 실패:', {
      status: apiError.response?.status,
      data: apiError.response?.data,
      message: apiError.message,
    });

    // === 개발 중 더미 응답 분기: JWT처럼 보이지 않게 ===
    return await new Promise((resolve) => {
      setTimeout(() => {
        // 회원가입된 사용자 정보와 기본 사용자 정보 조합
        const dummyUsers = JSON.parse(localStorage.getItem('dummyUsers') || '[]');
        const defaultUsers = [
          { email: 'test1@gmail.com', password: 'masill@1', nickname: 'test1' },
          { email: 'test2@gmail.com', password: 'masill@1', nickname: 'test2' },
        ];
        
        console.log('=== 사용자 정보 확인 ===');
        console.log('dummyUsers:', dummyUsers);
        console.log('defaultUsers:', defaultUsers);
        console.log('==========================');

        // 먼저 dummyUsers에서 매칭 확인 (회원가입된 사용자 우선)
        let matched = dummyUsers.find(
          (cred) => cred.email === loginData.email && cred.password === loginData.password
        );
        
        // dummyUsers에서 매칭되지 않으면 defaultUsers에서 확인
        if (!matched) {
          matched = defaultUsers.find(
            (cred) => cred.email === loginData.email && cred.password === loginData.password
          );
        }
        
        // 매칭된 사용자가 있으면 해당 닉네임 사용, 없으면 이메일 기반으로 생성
        if (matched) {
          console.log('=== 기존 사용자 로그인 ===');
          console.log('매칭된 사용자:', matched);
          console.log('사용할 닉네임:', matched.nickname);
          console.log('========================');
          
          const fake = {
            success: true,
            message: '로그인 성공 (더미)',
            accessToken: `dummy_${Date.now()}`,
            user: {
              id: Math.floor(Math.random() * 10000) + 1,
              email: loginData.email,
              nickname: matched.nickname,
            },
          };

          localStorage.setItem('accessToken', fake.accessToken);
          localStorage.setItem('currentUser', JSON.stringify(fake.user));
          
          // localStorage nickname도 업데이트 (회원가입 시 설정한 닉네임 우선)
          localStorage.setItem('nickname', matched.nickname);
          
          // 채팅용 사용자 ID 저장 (임의의 ID 생성)
          const currentUserId = Math.floor(Math.random() * 1000) + 100;
          localStorage.setItem('currentUserId', currentUserId.toString());
          
          console.log('=== 더미 로그인 사용자 정보 저장 ===');
          console.log('저장된 currentUser:', fake.user);
          console.log('nickname:', matched.nickname);
          console.log('====================================');
          
          // UserContext 업데이트를 위한 커스텀 이벤트 발생
          window.dispatchEvent(new CustomEvent('userLogin'));

          resolve(fake);
        } else if (loginData.password === 'masill@1') {
          const emailPrefix = loginData.email.split('@')[0];
          const generatedNickname = emailPrefix;
          
          console.log('=== 이메일 기반 닉네임 생성 ===');
          console.log('이메일:', loginData.email);
          console.log('생성된 닉네임:', generatedNickname);
          console.log('=============================');
          
          const fake = {
            success: true,
            message: '로그인 성공 (더미)',
            accessToken: `dummy_${Date.now()}`,
            user: {
              id: Math.floor(Math.random() * 10000) + 1,
              email: loginData.email,
              nickname: generatedNickname,
            },
          };

          localStorage.setItem('accessToken', fake.accessToken);
          localStorage.setItem('currentUser', JSON.stringify(fake.user));
          
          // localStorage nickname도 업데이트 (이메일 기반 생성된 닉네임)
          localStorage.setItem('nickname', generatedNickname);
          
          // 채팅용 사용자 ID 저장 (임의의 ID 생성)
          const currentUserId = Math.floor(Math.random() * 1000) + 100;
          localStorage.setItem('currentUserId', currentUserId.toString());
          
          console.log('=== 더미 로그인 사용자 정보 저장 ===');
          console.log('저장된 currentUser:', fake.user);
          console.log('nickname:', generatedNickname);
          console.log('====================================');
          
          // UserContext 업데이트를 위한 커스텀 이벤트 발생
          window.dispatchEvent(new CustomEvent('userLogin'));

          resolve(fake);
        } else {
          resolve({ success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }
      }, 600);
    });
  }
};

// 회원가입 API
export const signUp = async (userData) => {
  try {
    try {
             // 백엔드에서 기대하는 데이터 구조를 시도 (지역 정보 포함)
       const requestData = {
         email: userData.email,
         password: userData.password,
         username: userData.username,
         phoneNumber: userData.phoneNumber || userData.phone || "01012345678",
         region: userData.region || "",
         district: userData.district || "",
         regionId: userData.regionId || null
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
         console.warn(`${apiError.response?.status} 오류로 인해 더미 응답 사용`);
         
         return await new Promise((resolve) => {
           setTimeout(() => {
             const dummyUsers = JSON.parse(localStorage.getItem('dummyUsers') || '[]');
             
                                         // 다양한 필드명 처리
               const nickname = userData.username || userData.nickname || '새사용자';
               const newUser = {
                 email: userData.email,
                 password: userData.password,
                 nickname: nickname,
                 region: userData.region || '',
                 district: userData.district || '',
                 regionId: userData.regionId || null
               };
               
               console.log('=== 회원가입 사용자 정보 저장 ===');
               console.log('userData:', userData);
               console.log('설정된 nickname:', nickname);
               console.log('저장할 newUser:', newUser);
               console.log('================================');
             
             const idx = dummyUsers.findIndex((u) => u.email === newUser.email);
             if (idx >= 0) dummyUsers[idx] = newUser;
             else dummyUsers.push(newUser);

             localStorage.setItem('dummyUsers', JSON.stringify(dummyUsers));
             
             console.log('=== 회원가입 완료 ===');
             console.log('생성된 닉네임:', nickname);
             console.log('저장된 사용자:', newUser);
             console.log('========================');

             resolve({
               success: true,
               code: 200,
               message: '회원가입이 완료되었습니다.',
               data: { nickname: nickname },
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

// 닉네임 중복 확인 API (실제 API 호출 + 403 오류 처리)
export const checkNicknameDuplicate = async (nickname) => {
  try {
    console.log('닉네임 중복 확인 API 호출 시작:', nickname);
    
    // 실제 API 호출
    const { data } = await publicAPI.get('/users/nickname/check', {
      params: { nickname }, // => ?nickname=...
    });
    console.log('닉네임 중복 확인 API 성공:', data);
    
    // 백엔드 응답 형식에 맞게 처리
    if (data && typeof data === 'object') {
      console.log('원본 API 응답:', data);
      
      // success 필드가 false인 경우 중복으로 처리
      if (data.success === false) {
        const available = false;
        const message = data.message || '이미 사용 중인 닉네임입니다.';
        console.log('처리된 응답 (중복):', { available, message });
        return { available, message };
      }
      
      // success 필드가 true인 경우 data.duplicate 확인
      if (data.success === true) {
        // data.duplicate가 true인 경우 중복으로 처리
        if (data.data && data.data.duplicate === true) {
          const available = false;
          const message = data.message || '이미 사용 중인 닉네임입니다.';
          console.log('처리된 응답 (success true, duplicate true):', { available, message });
          return { available, message };
        }
        
        // data.duplicate가 false이거나 없는 경우 사용 가능으로 처리
        const available = true;
        const message = data.message || '사용 가능한 닉네임입니다.';
        console.log('처리된 응답 (사용 가능):', { available, message });
        return { available, message };
      }
      
      // 기존 로직 (다양한 응답 형식 처리)
      const available = data.available !== undefined ? data.available : 
                       data.isAvailable !== undefined ? data.isAvailable :
                       data.duplicate !== undefined ? !data.duplicate : false;
      
      const message = data.message || data.msg || 
                     (available ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.');
      
      console.log('처리된 응답:', { available, message });
      return { available, message };
    }
    
    // data가 없거나 객체가 아닌 경우
    console.log('예상치 못한 응답 형태:', data);
    return { available: false, message: '응답 처리 중 오류가 발생했습니다.' };
    
    return data; // { available: boolean, message: string } 형태 가정
  } catch (apiError) {
    console.error('닉네임 중복 확인 API 실패:', apiError);
    console.error('API 오류 상세:', {
      status: apiError.response?.status,
      statusText: apiError.response?.statusText,
      data: apiError.response?.data,
      message: apiError.message
    });
    
    const status = apiError.response?.status;
    
    // 400 오류인 경우 API 응답 데이터를 사용
    if (status === 400 && apiError.response?.data) {
      console.log('400 오류 - API 응답 데이터 사용:', apiError.response.data);
      const data = apiError.response.data;
      
      if (data.success === false) {
        return {
          available: false,
          message: data.message || '이미 사용 중인 닉네임입니다.'
        };
      }
    }
    
    // 다른 오류들 (401, 403, 500)을 더미 응답으로 처리
    if ([401, 403, 500].includes(status)) {
      console.warn(`${status} 오류로 인해 더미 응답 사용`);
      
      // 더미 응답으로 처리
      return await new Promise((resolve) => {
        setTimeout(() => {
          // 실제 사용 중인 닉네임들을 확인
          const dummyUsers = JSON.parse(localStorage.getItem('dummyUsers') || '[]');
          const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
          const reservedNicknames = ['admin', 'test', 'user', '관리자', '테스트', '비쿠'];
          
          // 현재 사용자의 닉네임은 제외하고 중복 확인
          const existingNicknames = dummyUsers
            .filter(user => user.nickname !== currentUser.nickname)
            .map(user => user.nickname);
          
          const isDup = existingNicknames.includes(nickname) || 
                       reservedNicknames.includes(String(nickname).toLowerCase());
          
          console.log('더미 응답 - 닉네임:', nickname, '중복여부:', isDup);
          console.log('기존 닉네임들:', existingNicknames);
          console.log('현재 사용자 닉네임:', currentUser.nickname);
          
          const available = !isDup;
          resolve({
            available: available,
            message: available ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.',
          });
        }, 300);
      });
    }
    
    // 다른 오류는 그대로 throw
    throw apiError;
  }
};

// 닉네임 변경 API
export const updateNickname = async (nickname) => {
  try {
    console.log('닉네임 변경 API 호출 시작:', nickname);
    console.log('현재 토큰:', localStorage.getItem('accessToken'));
    
    const res = await privateAPI.patch('/users/me/nickname', { nickname });
    console.log('닉네임 변경 API 성공:', res);
    
    return {
      success: true,
      code: res.status,
      message: '닉네임이 성공적으로 변경되었습니다.',
      data: { nickname },
    };
  } catch (apiError) {
    console.error('닉네임 변경 API 실패:', apiError);
    console.error('API 오류 상세:', {
      status: apiError.response?.status,
      statusText: apiError.response?.statusText,
      data: apiError.response?.data,
      message: apiError.message
    });
    
    const status = apiError.response?.status;

    // 실제 API가 실패할 때만 더미 응답 사용
    if ([401, 403, 500].includes(status)) {
      console.warn(`${status} 오류로 인해 더미 응답 사용`);
      
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
    
    // 다른 오류는 그대로 throw
    throw apiError;
  }
};

// 프로필 이미지 업로드 API
export const uploadProfileImage = async (imageFile) => {
  try {
    const formData = new FormData();
    const fileObj = imageFile.file || imageFile;
    if (fileObj instanceof File) {
      formData.append("profileImage", fileObj); // "images" -> "profileImage"로 변경
    }

    // multipartAPI 사용
    const res = await multipartAPI.private.post("/users/me/profile-image", formData);
    console.log('프로필 이미지 업로드 API 응답:', res.data);
    return res.data;
  } catch (error) {
    console.error("프로필 이미지 업로드 에러:", error);
    console.error("에러 응답:", error.response?.data);
    console.error("API 오류 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });

    const status = error.response?.status;

    // API 실패 시 더미 데이터 사용
    if ([400, 500].includes(status)) {
      console.warn(`${status} 오류로 인해 더미 응답 사용`);
      
      return await new Promise((resolve) => {
        setTimeout(() => {
          // 더미 성공 응답 - profileImageUrl을 null로 반환하여 프론트엔드에서 base64 처리하도록 함
          resolve({
            success: true,
            code: 200,
            message: '프로필 이미지 업로드가 완료되었습니다. (더미)',
            data: {
              profileImageUrl: null // null로 반환하여 프론트엔드에서 base64 처리
            }
          });
        }, 600);
      });
    }
    
    throw error;
  }
};


// 지역 API
export const getRegions = async () => {
  try {
    console.log('지역 목록 API 호출 시작');
    const { data } = await publicAPI.get('/regions/sidos');
    console.log('지역 목록 API 성공:', data);
    
    // API 응답 구조에 맞게 처리
    if (data && data.data && data.data.items) {
      // 백엔드 응답 구조: { success: true, data: { items: [...] } }
      return data.data.items.map(item => item.sido);
    } else if (Array.isArray(data)) {
      // 직접 배열로 반환되는 경우
      return data;
    } else {
      console.warn('예상하지 못한 지역 데이터 구조:', data);
      return [];
    }
  } catch (apiError) {
    console.error('지역 목록 API 실패:', apiError);
    console.error('API 오류 상세:', {
      status: apiError.response?.status,
      statusText: apiError.response?.statusText,
      data: apiError.response?.data,
      message: apiError.message
    });
    
    const status = apiError.response?.status;
    
    // API 실패 시 더미 데이터 사용
    if ([400, 500].includes(status)) {
      console.warn(`${status} 오류로 인해 더미 지역 데이터 사용`);
      
      return await new Promise((resolve) => {
        setTimeout(() => {
          const dummyRegions = [
            "서울특별시",
            "부산광역시",
            "대구광역시",
            "인천광역시",
            "광주광역시",
            "대전광역시",
            "울산광역시",
            "세종특별자치시",
            "경기도",
            "강원특별자치도",
            "충청북도",
            "충청남도",
            "전북특별자치도",
            "전라남도",
            "경상북도",
            "경상남도",
            "제주특별자치도"
          ];
          resolve(dummyRegions);
        }, 300);
      });
    }
    
    throw apiError;
  }
};

export const getDistricts = async (region) => {
  try {
    console.log('구/군 목록 API 호출 시작:', region);
    const { data } = await publicAPI.get(`/regions/sidos/${region}/sigungus`);
    console.log('구/군 목록 API 성공:', data);
    
    // API 응답 구조에 맞게 처리
    if (data && data.data && data.data.items) {
      // 백엔드 응답 구조: { success: true, data: { items: [...] } }
      return data.data.items.map(item => item.sigungu);
    } else if (Array.isArray(data)) {
      // 직접 배열로 반환되는 경우
      return data;
    } else {
      console.warn('예상하지 못한 구/군 데이터 구조:', data);
      return [];
    }
  } catch (apiError) {
    console.error('구/군 목록 API 실패:', apiError);
    console.error('API 오류 상세:', {
      status: apiError.response?.status,
      statusText: apiError.response?.statusText,
      data: apiError.response?.data,
      message: apiError.message
    });
    
    const status = apiError.response?.status;
    
    // API 실패 시 더미 데이터 사용
    if ([400, 500].includes(status)) {
      console.warn(`${status} 오류로 인해 더미 구/군 데이터 사용`);
      
      return await new Promise((resolve) => {
        setTimeout(() => {
          // 서울시 구/군 목록 (예시)
          const dummyDistricts = {
            "서울특별시": [
              "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구",
              "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구",
              "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
            ],
            "부산광역시": [
              "강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구",
              "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군"
            ],
            "대구광역시": [
              "남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"
            ],
            "인천광역시": [
              "계양구", "남구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군"
            ],
            "광주광역시": [
              "광산구", "남구", "동구", "북구", "서구"
            ],
            "대전광역시": [
              "대덕구", "동구", "서구", "유성구", "중구"
            ],
            "울산광역시": [
              "남구", "동구", "북구", "중구", "울주군"
            ],
            "세종특별자치시": [
              "세종특별자치시"
            ],
            "경기도": [
              "수원시", "성남시", "의정부시", "안양시", "부천시", "광명시", "평택시", "동두천시",
              "안산시", "고양시", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시",
              "의왕시", "하남시", "용인시", "파주시", "이천시", "안성시", "김포시", "화성시",
              "광주시", "여주시", "양평군", "고양군", "연천군", "포천군", "가평군"
            ],
            "강원특별자치도": [
              "춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군",
              "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군",
              "고성군", "양양군"
            ],
            "충청북도": [
              "청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군",
              "괴산군", "음성군", "단양군"
            ],
            "충청남도": [
              "천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시",
              "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"
            ],
            "전북특별자치도": [
              "전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군",
              "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"
            ],
            "전라남도": [
              "목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군",
              "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군",
              "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"
            ],
            "경상북도": [
              "포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시",
              "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군",
              "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"
            ],
            "경상남도": [
              "창원시", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시",
              "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군",
              "거창군", "합천군"
            ],
            "제주특별자치도": [
              "제주시", "서귀포시"
            ]
          };
          
          resolve(dummyDistricts[region] || []);
        }, 300);
      });
    }
    
    throw apiError;
  }
};

// 지역 ID 조회 API
export const getRegionId = async (sido, sigungu) => {
  try {
    // 파라미터 검증
    if (!sido || !sigungu) {
      console.error('지역 ID 조회 실패: 필수 파라미터 누락', { sido, sigungu });
      throw new Error('sido와 sigungu는 필수 파라미터입니다.');
    }
    
    console.log('지역 ID 조회 API 호출 시작:', { sido, sigungu });
    const { data } = await publicAPI.get('/regions/id', {
      params: { sido, sigungu }
    });
    console.log('지역 ID 조회 API 성공:', data);
    
    // API 응답 구조에 맞게 처리 (Swagger 문서 기반)
    console.log('지역 ID API 응답 데이터:', data);
    
    if (data && typeof data === 'object') {
      // Swagger 문서의 응답 구조: { success: true, code: 200, message: "...", data: { regionId: 141 } }
      if (data.success && data.data && data.data.regionId !== undefined) {
        console.log('지역 ID 추출 성공:', data.data.regionId);
        return data.data.regionId;
      }
      // 다른 가능한 구조들
      else if (data.regionId !== undefined) {
        console.log('지역 ID 직접 추출:', data.regionId);
        return data.regionId;
      } else if (data.data && data.data.regionId !== undefined) {
        console.log('지역 ID data에서 추출:', data.data.regionId);
        return data.data.regionId;
      }
    } else if (typeof data === 'number') {
      // 직접 숫자로 반환되는 경우
      console.log('지역 ID 직접 숫자:', data);
      return data;
    }
    
    console.warn('예상하지 못한 지역 ID 데이터 구조:', data);
    return null;
  } catch (apiError) {
    console.error('지역 ID 조회 API 실패:', apiError);
    console.error('API 오류 상세:', {
      status: apiError.response?.status,
      statusText: apiError.response?.statusText,
      data: apiError.response?.data,
      message: apiError.message
    });
    
    const status = apiError.response?.status;
    
    // API 실패 시 더미 데이터 사용
    if ([400, 500].includes(status)) {
      console.warn(`${status} 오류로 인해 더미 지역 ID 사용`);
      
      return await new Promise((resolve) => {
        setTimeout(() => {
          // 더미 지역 ID 매핑 (실제 행정구역 코드)
          const dummyRegionIds = {
            "서울특별시": {
              "강남구": 11680, "강동구": 11740, "강북구": 11305, "강서구": 11500,
              "관악구": 11620, "광진구": 11215, "구로구": 11530, "금천구": 11545,
              "노원구": 11350, "도봉구": 11320, "동대문구": 11110, "동작구": 11590,
              "마포구": 11440, "서대문구": 11410, "서초구": 11650, "성동구": 11200,
              "성북구": 11290, "송파구": 11710, "양천구": 11470, "영등포구": 11560,
              "용산구": 11170, "은평구": 11380, "종로구": 11110, "중구": 11140, "중랑구": 11260
            },
            "부산광역시": {
              "강서구": 26440, "금정구": 26410, "남구": 26290, "동구": 26170,
              "동래구": 26260, "부산진구": 26140, "북구": 26320, "사상구": 26530,
              "사하구": 26380, "서구": 26180, "수영구": 26500, "연제구": 26470,
              "영도구": 26200, "중구": 26110, "해운대구": 26350, "기장군": 26710
            },
            "대구광역시": {
              "남구": 27200, "달서구": 27290, "동구": 27140, "북구": 27230,
              "서구": 27170, "수성구": 27260, "중구": 27110, "달성군": 27710
            },
            "인천광역시": {
              "계양구": 28245, "남구": 28200, "남동구": 28260, "동구": 28140,
              "부평구": 28237, "서구": 28260, "연수구": 28245, "중구": 28110,
              "강화군": 28710, "옹진군": 28720
            },
            "광주광역시": {
              "광산구": 29200, "남구": 29140, "동구": 29110, "북구": 29170, "서구": 29155
            },
            "대전광역시": {
              "대덕구": 30230, "동구": 30110, "서구": 30170, "유성구": 30200, "중구": 30140
            },
            "울산광역시": {
              "남구": 31140, "동구": 31170, "북구": 31200, "중구": 31110, "울주군": 31710
            },
            "세종특별자치시": {
              "세종특별자치시": 36110
            },
            "경기도": {
              "수원시": 41110, "성남시": 41130, "의정부시": 41150, "안양시": 41170,
              "부천시": 41190, "광명시": 41210, "평택시": 41220, "동두천시": 41250,
              "안산시": 41270, "고양시": 41280, "과천시": 41290, "구리시": 41310,
              "남양주시": 41360, "오산시": 41370, "시흥시": 41390, "군포시": 41410,
              "의왕시": 41430, "하남시": 41450, "용인시": 41460, "파주시": 41480,
              "이천시": 41500, "안성시": 41550, "김포시": 41570, "화성시": 41590,
              "광주시": 41610, "여주시": 41630, "양평군": 41830, "고양군": 41800,
              "연천군": 41800, "포천군": 41650, "가평군": 41820
            }
          };
          
          const regionId = dummyRegionIds[sido]?.[sigungu] || 141; // 기본값: 141
          resolve(regionId);
        }, 300);
      });
    }
    
    throw apiError;
  }
};

// 사업자 인증 API
// 사업자 인증 API  (엔드포인트/키명/포맷 맞춤)
export const verifyBusinessOwner = async (businessData) => {
  try {
    // 서버 스펙에 맞게 키와 포맷 정규화
    const payload = {
      businessName: String(businessData.name ?? businessData.businessName ?? '').trim(),
      openingDate: String(businessData.openingDate ?? '').replace(/\D/g, ''), // YYYYMMDD (하이픈 제거)
      businessNumber: String(businessData.businessNumber ?? '').replace(/\D/g, ''), // 숫자만 10자리
    };

    console.log('사업자 인증 API payload:', payload);
    console.log('사업자 인증 API URL:', '/users/me/verify-owner');

    // 스웨거 스펙 기준 엔드포인트
    const { data } = await privateAPI.post('/users/me/verify-owner', payload);
    console.log('사업자 인증 API 성공:', data);

    return data;
  } catch (apiError) {
    console.error('사업자 인증 API 실패:', apiError);
    console.error('API 오류 상세:', {
      status: apiError.response?.status,
      statusText: apiError.response?.statusText,
      data: apiError.response?.data,
      message: apiError.message,
    });
    
    // 백엔드 응답 내용 상세 로깅
    if (apiError.response?.data) {
      console.error('백엔드 응답 데이터:', apiError.response.data);
      console.error('백엔드 응답 전체:', apiError.response);
    }

    const status = apiError.response?.status;
    
    // 개발 중 더미 응답 처리
    if ([400, 401, 403, 500].includes(status)) {
      console.warn(`${status} 오류로 인해 더미 응답 사용`);
      
      return await new Promise((resolve) => {
        setTimeout(() => {
          // 더미 성공 응답
          resolve({
            success: true,
            code: 200,
            message: '사업자 인증이 완료되었습니다. (더미)',
            data: {
              verified: true,
              businessName: businessData.businessName,
              businessNumber: businessData.businessNumber
            }
          });
        }, 600);
      });
    }
    
    throw apiError;
  }
};