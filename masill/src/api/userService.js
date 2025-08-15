// src/api/userService.ts
import { publicAPI, privateAPI } from "./axios";

// 로그인 API
export const login = async (loginData) => {
  try {
    try {
      console.log("로그인 API 호출 시작:", loginData);
      const { data } = await publicAPI.post("/auth/login", loginData);
      console.log("로그인 API 성공:", data);

      // 서버 응답 키 이름에 맞춰 사용 (필요하면 키명 조정)
      const accessToken = data.accessToken || data.token || null;
      const refreshToken = data.refreshToken || null;
      const user = data.user ?? null;

      console.log("추출된 토큰:", { accessToken, refreshToken });

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        console.log("실제 토큰 저장됨:", accessToken);
      }
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
      if (user) localStorage.setItem("currentUser", JSON.stringify(user));

      return data;
    } catch (apiError) {
      console.error("API 서버 연결 실패:", apiError);
      console.error("에러 상세:", {
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
          const dummyUsers = JSON.parse(
            localStorage.getItem("dummyUsers") || "[]"
          );

          const validCredentials = [
            {
              email: "jhjk1234@gmail.com",
              password: "password123!",
              nickname: "비쿠",
            },
            {
              email: "ABC123@gmail.com",
              password: "masill@1",
              nickname: "masill_love",
            },
            ...dummyUsers,
          ];

          const matchedCredential = validCredentials.find(
            (cred) =>
              cred.email === loginData.email &&
              cred.password === loginData.password
          );

          if (matchedCredential) {
            // 새로운 유효한 토큰 생성 (현재 시간 기준)
            const now = Math.floor(Date.now() / 1000);
            const exp = now + 60 * 60 * 24; // 24시간 후 만료

            // 새로운 토큰 생성 (더미이지만 유효한 형식)
            const newToken = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqaGprMTIzNEBnbWFpbC5jb20iLCJqdGkiOiJqaGprMTIzNEBnbWFpbC5jb20iLCJpYXQiOi${now}LCJleHAiOi${exp}}.newSignature_${Date.now()}`;

            const fake = {
              success: true,
              message: "로그인 성공 (더미)",
              accessToken: newToken,
              refreshToken: "dummy_refresh_token_" + Date.now(),
              user: {
                id: Math.floor(Math.random() * 10000) + 1,
                email: loginData.email,
                nickname: matchedCredential.nickname,
              },
            };
            // 새로운 토큰 저장
            localStorage.setItem("accessToken", newToken);
            localStorage.setItem("refreshToken", fake.refreshToken);
            localStorage.setItem("currentUser", JSON.stringify(fake.user));
            console.log("더미 로그인에서 새 토큰 저장됨:", newToken);
            resolve(fake);
          } else {
            resolve({
              success: false,
              message: "이메일 또는 비밀번호가 올바르지 않습니다.",
            });
          }
        }, 600);
      });
    }
  } catch (error) {
    console.error("로그인 오류:", error);
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
        phoneNumber: userData.phoneNumber || userData.phone || "01012345678",
      };

      console.log("백엔드로 전송할 데이터:", requestData);

      const { data } = await publicAPI.post("/users/sign-up", requestData);
      // 백엔드가 자동 로그인 토큰을 주면 저장
      if (data?.accessToken)
        localStorage.setItem("accessToken", data.accessToken);
      if (data?.user)
        localStorage.setItem("currentUser", JSON.stringify(data.user));
      return data;
    } catch (apiError) {
      console.warn("API 서버 연결 실패, 더미 응답 사용:", apiError);
      console.error("API 오류 상세:", {
        status: apiError.response?.status,
        statusText: apiError.response?.statusText,
        data: apiError.response?.data,
        message: apiError.message,
      });

      // 400 오류인 경우 백엔드 응답 메시지 확인
      if (apiError.response?.status === 400) {
        console.error("400 오류 - 백엔드 응답:", apiError.response?.data);
        console.error("전송한 데이터:", userData);
      }

      if ([400, 500].includes(apiError.response?.status)) {
        return await new Promise((resolve) => {
          setTimeout(() => {
            const dummyUsers = JSON.parse(
              localStorage.getItem("dummyUsers") || "[]"
            );
            const newUser = {
              email: userData.email,
              password: userData.password,
              nickname: userData.username, // 백엔드에서 username으로 받는 닉네임
            };
            const idx = dummyUsers.findIndex((u) => u.email === newUser.email);
            if (idx >= 0) dummyUsers[idx] = newUser;
            else dummyUsers.push(newUser);

            localStorage.setItem("dummyUsers", JSON.stringify(dummyUsers));

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
    console.error("회원가입 오류:", error);
    throw error;
  }
};

// 닉네임 중복 확인 API (실제 호출 우선, 실패 시만 더미)
export const checkNicknameDuplicate = async (nickname) => {
  try {
    console.log("닉네임 중복 확인 API 호출 시작:", nickname);
    console.log("현재 토큰:", localStorage.getItem("accessToken"));

    const { data } = await privateAPI.get("/users/nickname/check", {
      params: { nickname }, // => ?nickname=...
    });
    console.log("닉네임 중복 확인 API 성공:", data);

    // 백엔드 응답 형식에 맞게 처리
    if (data && typeof data === "object") {
      // 다양한 응답 형식 처리
      const available =
        data.available !== undefined
          ? data.available
          : data.isAvailable !== undefined
          ? data.isAvailable
          : data.duplicate !== undefined
          ? !data.duplicate
          : data.success !== undefined
          ? data.success
          : true;

      const message =
        data.message ||
        data.msg ||
        (available
          ? "사용 가능한 닉네임입니다."
          : "이미 사용 중인 닉네임입니다.");

      console.log("처리된 응답:", { available, message });
      return { available, message };
    }

    return data; // { available: boolean, message: string } 형태 가정
  } catch (apiError) {
    console.error("닉네임 중복 확인 API 실패:", apiError);
    console.error("API 오류 상세:", {
      status: apiError.response?.status,
      statusText: apiError.response?.statusText,
      data: apiError.response?.data,
      message: apiError.message,
    });

    const status = apiError.response?.status;

    // 실제 API가 실패할 때만 더미 응답 사용
    if ([401, 403, 500].includes(status)) {
      console.warn(`${status} 오류로 인해 더미 응답 사용`);

      // === 더미 ===
      return await new Promise((resolve) => {
        setTimeout(() => {
          // 실제로는 중복되지 않은 닉네임들을 사용가능하게 처리
          const reservedNicknames = [
            "admin",
            "test",
            "user",
            "관리자",
            "테스트",
            "비쿠",
          ];
          const isDup = reservedNicknames.includes(
            String(nickname).toLowerCase()
          );
          console.log("더미 응답 - 닉네임:", nickname, "중복여부:", isDup);

          // 대부분의 닉네임을 사용가능하게 처리 (테스트용)
          const available = !isDup;
          resolve({
            available: available,
            message: available
              ? "사용 가능한 닉네임입니다."
              : "이미 사용 중인 닉네임입니다.",
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
    console.log("닉네임 변경 API 호출 시작:", nickname);
    console.log("현재 토큰:", localStorage.getItem("accessToken"));

    const res = await privateAPI.patch("/users/me/nickname", { nickname });
    console.log("닉네임 변경 API 성공:", res);

    return {
      success: true,
      code: res.status,
      message: "닉네임이 성공적으로 변경되었습니다.",
      data: { nickname },
    };
  } catch (apiError) {
    console.error("닉네임 변경 API 실패:", apiError);
    console.error("API 오류 상세:", {
      status: apiError.response?.status,
      statusText: apiError.response?.statusText,
      data: apiError.response?.data,
      message: apiError.message,
    });

    const status = apiError.response?.status;

    // 실제 API가 실패할 때만 더미 응답 사용
    if ([401, 403, 500].includes(status)) {
      console.warn(`${status} 오류로 인해 더미 응답 사용`);

      // === 더미 ===
      return await new Promise((resolve) => {
        setTimeout(() => {
          const dummyUsers = JSON.parse(
            localStorage.getItem("dummyUsers") || "[]"
          );
          const currentUser = JSON.parse(
            localStorage.getItem("currentUser") || "{}"
          );

          if (currentUser.email) {
            const idx = dummyUsers.findIndex(
              (u) => u.email === currentUser.email
            );
            if (idx >= 0) dummyUsers[idx].nickname = nickname;
            currentUser.nickname = nickname;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
          }
          localStorage.setItem("dummyUsers", JSON.stringify(dummyUsers));

          resolve({
            success: true,
            code: 200,
            message: "닉네임이 성공적으로 변경되었습니다.",
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
    formData.append("profileImage", imageFile);

    // FormData일 땐 Content-Type 수동 지정 불필요(자동 boundary 포함)
    const { data } = await publicAPI.post("/users/me/profile-image", formData);
    return data;
  } catch (error) {
    console.error("프로필 이미지 업로드 API 오류:", error);
    throw error;
  }
};
