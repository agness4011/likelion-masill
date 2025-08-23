import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MasilLogo from "@/assets/masill-logo.svg";
import EyeOff from "@logo/eyeoff.svg";
import EyeOn from "@logo/eyeon.svg";

import { login } from "../api/userService";
import { useUser } from "../contexts/UserContext";

const Container = styled.div`
  width: 100%;
 
  background: #fff;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: visible;
`;

const TopBar = styled.div`
  width: 100%;
  padding: 0 0 0 8px;
  height: 80px;
  display: flex;
  align-items: center;
  position: relative;
  flex-shrink: 0;
`;

const BackBtn = styled.button`
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #222;
  cursor: pointer;
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const CircleTopRight = styled.div`
  position: absolute;
  width: 243px;
  height: 243px;
  left: 147px;
  top: -197px;
  background: linear-gradient(
    185.49deg,
    #4e7aea -21.92%,
    #ffdbac 85.22%,
    #ffbe93 100.53%
  );
  filter: blur(2.25px);
  transform: rotate(-25.45deg);
  border-radius: 50%;
  z-index: 0;
`;

const BottomGradient = styled.div`
  position: absolute;
  width: 674.37px;
  height: 674.37px;
  left: -320px;
  bottom: -850px;
  background: linear-gradient(180deg, #1b409c 0%, #ff7852 100%);
  filter: blur(2.25px);
  transform: rotate(-95.46deg);
  border-radius: 50%;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
`;

const LogoImage = styled.img`
  height: 70px;
  width: auto;
`;

const FormSection = styled.div`
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  overflow: visible;
`;

const InputSection = styled.div`
  width: 100%;
  max-width: 340px;
  margin-bottom: 60px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-size: 14px;
  color: #222;
  margin-bottom: 8px;
  font-weight: 500;
`;

const InputField = styled.input`
  width: 100%;
  height: 48px;
  border: none;
  border-bottom: 1px solid #e1e5e9;
  outline: none;
  font-size: 16px;
  color: #222;
  background: transparent;
  padding: 0;

  &::placeholder {
    color: #b0b4c0;
  }

  &:focus {
    border-bottom-color: #1b409c;
  }
`;

const PasswordInputGroup = styled.div`
  position: relative;
  width: 100%;
  
  /* 전역적으로 비밀번호 입력 필드의 기본 아이콘 제거 */
  input[type="password"]::-ms-reveal,
  input[type="password"]::-ms-clear,
  input[type="password"]::-webkit-credentials-auto-fill-button,
  input[type="password"]::-webkit-contacts-auto-fill-button,
  input[type="password"]::-webkit-strong-password-auto-fill-button {
    display: none !important;
    visibility: hidden !important;
    width: 0 !important;
    height: 0 !important;
  }
`;

const PasswordInput = styled(InputField)`
  width: 100%;
  
  /* 모든 브라우저의 기본 비밀번호 표시/숨기기 버튼 완전 제거 */
  &::-ms-reveal,
  &::-ms-clear,
  &::-webkit-credentials-auto-fill-button,
  &::-webkit-contacts-auto-fill-button,
  &::-webkit-strong-password-auto-fill-button,
  &::-moz-credentials-auto-fill-button {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    position: absolute !important;
    pointer-events: none !important;
  }
  
  /* 추가적인 Webkit 스타일 완전 제거 */
  &::-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
  }
  
  /* Safari 특별 처리 */
  &::-webkit-search-cancel-button,
  &::-webkit-search-decoration {
    display: none !important;
  }
  
  /* Chrome/Safari 비밀번호 표시 버튼 완전 제거 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button,
  &::-webkit-textfield-decoration-container,
  &::-webkit-password-decoration-container {
    display: none !important;
    -webkit-appearance: none !important;
    margin: 0 !important;
  }
  
  /* Firefox 비밀번호 표시 버튼 제거 */
  &::-moz-password-decoration {
    display: none !important;
  }
  
  /* 모든 브라우저에서 기본 스타일 제거 */
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  
  /* 추가 강력한 제거 방법 */
  &::-webkit-password-decoration {
    display: none !important;
  }
  
  &::-webkit-password-decoration-container {
    display: none !important;
  }
  
  &::-webkit-password-decoration-button {
    display: none !important;
  }
  
  &::-webkit-password-decoration-icon {
    display: none !important;
  }
  
  /* Edge 특별 처리 */
  &::-ms-reveal {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  
  &::-ms-clear {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
`;

const TogglePasswordBtn = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  width: 30px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  background: #c1cae0;
  color: #727c94;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 32px;

  &:hover {
    background: #1b409c;
    color: #fff;
  }

  &:active {
    background: #1b409c;
    color: #fff;
  }
`;



const SignupSection = styled.div`
  text-align: center;
  position: fixed;
  bottom: 240px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const SignupText = styled.span`
  font-size: 14px;
  color: #727c94;
  white-space: nowrap;
`;

const SignupLink = styled.span`
  font-size: 14px;
  color: #1b409c;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
  white-space: nowrap;
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  const { updateNickname } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const loginData = { email, password };
      console.log("[LoginPage] 로그인 시도:", loginData);

      const response = await login(loginData); // userService가 토큰 저장함
      console.log("[LoginPage] 로그인 응답:", response);

      if (response?.success) {
        // (보강) 백엔드 스펙 경로만 사용해 재저장 — 잘못된 키로 덮어쓰지 않기!
        const at = response?.data?.accessToken;
        if (at) {
          localStorage.setItem("accessToken", at);
        }

        // 사용자 정보 저장
        const userData = response?.data;
        let currentUser = null;
        if (userData) {
          currentUser = {
            userId: userData.userId,
            nickname: userData.nickname,
            email: userData.email,
            profileImageUrl: userData.profileImageUrl,
            regionId: userData.regionId,
            role: userData.role
          };
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          localStorage.setItem("currentUserId", userData.userId);
          
          // 프로필 이미지가 있으면 별도로 저장
          if (userData.profileImageUrl) {
            localStorage.setItem("userProfileImage", userData.profileImageUrl);
          }
          
          console.log("[LoginPage] 사용자 정보 저장:", currentUser);
        }

        // 닉네임 갱신은 유지 (여러 경로 시도)
        const nick =
          response?.data?.nickname ??
          response?.data?.user?.nickname ??
          JSON.parse(localStorage.getItem("currentUser") || "null")?.nickname ??
          null;

        if (nick) {
          localStorage.setItem("nickname", nick);
          updateNickname(nick);
          console.log("[LoginPage] 닉네임 저장/갱신:", nick);
        }

        // 최종 토큰 확인 로그
        console.log(
          "[LoginPage] 최종 accessToken:",
          localStorage.getItem("accessToken")
        );

        // UserContext 업데이트를 위한 커스텀 이벤트 발생
        window.dispatchEvent(new CustomEvent('userLogin', { 
          detail: { userData: currentUser } 
        }));

        nav("/main");
      } else {
        console.log("[LoginPage] 로그인 실패:", response?.message);
        alert(response?.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("[LoginPage] 로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleSignup = () => {
    nav("/signup");
  };

  return (
    <>
      <Container>
        <CircleTopRight />
        <BottomGradient />

        <TopBar>
          <BackBtn onClick={() => nav(-1)} aria-label="뒤로가기">
            &#8592;
          </BackBtn>
        </TopBar>

        <ContentSection>
          <LogoSection>
            <LogoImage src={MasilLogo} alt="마실" />
          </LogoSection>

          <InputSection>
            <InputGroup>
              <InputContainer>
                <InputLabel htmlFor="email">아이디</InputLabel>
                <InputField
                  id="email"
                  type="email"
                  placeholder="이메일 주소를 입력해주세요."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputContainer>

              <InputContainer>
                <InputLabel htmlFor="password">비밀번호</InputLabel>
                <PasswordInputGroup>
                  <PasswordInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TogglePasswordBtn 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img 
                      src={showPassword ? EyeOn : EyeOff} 
                      alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </TogglePasswordBtn>
                </PasswordInputGroup>
              </InputContainer>
            </InputGroup>
          </InputSection>

          <FormSection>
            <LoginButton onClick={handleLogin}>
              로그인
            </LoginButton>
          </FormSection>
        </ContentSection>
      </Container>

      <SignupSection>
        <SignupText>아직 회원이 아니신가요? </SignupText>
        <SignupLink onClick={handleSignup}>회원가입</SignupLink>
      </SignupSection>
    </>
  );
}
