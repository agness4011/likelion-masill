import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MasilLogo from "@/assets/masill-logo.svg";
import KakaoLogo from "@logo/kakao.svg";
import NaverLogo from "@logo/naver.svg";
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
  bottom: -700px;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 40px;
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

const SocialLoginSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 35px;
`;

const SocialDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #e1e5e9;
  position: relative;
  margin-bottom: 26px;

  &::before {
    content: "소셜 로그인";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    padding: 0 16px;
    font-size: 14px;
    color: #727c94;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 24px;
`;

const SocialButton = styled.button`
  width: 48px;
  height: 49px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const KakaoIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const NaverIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SignupSection = styled.div`
  text-align: center;
  margin-top: -35px;
  margin-bottom: 65px;
  position: relative;
  z-index: 10;
`;

const SignupText = styled.span`
  font-size: 14px;
  color: #727c94;
`;

const SignupLink = styled.span`
  font-size: 14px;
  color: #1b409c;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const { updateNickname } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    if (isLoading) return;

    setIsLoading(true);

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

        alert("로그인 성공!");
        nav("/main");
      } else {
        console.log("[LoginPage] 로그인 실패:", response?.message);
        alert(response?.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("[LoginPage] 로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    nav("/signup");
  };

  return (
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
              <InputField
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
          </InputGroup>
        </InputSection>

        <FormSection>
          <LoginButton onClick={handleLogin}>
            {isLoading ? "로그인 중..." : "로그인"}
          </LoginButton>

          <SocialLoginSection>
            <SocialDivider />
            <SocialButtons>
              <SocialButton>
                <KakaoIcon src={KakaoLogo} alt="카카오" />
              </SocialButton>
              <SocialButton>
                <NaverIcon src={NaverLogo} alt="네이버" />
              </SocialButton>
            </SocialButtons>
          </SocialLoginSection>
        </FormSection>
      </ContentSection>

      <SignupSection>
        <SignupText>아직 회원이 아니신가요?</SignupText>
        <SignupLink onClick={handleSignup}>회원가입</SignupLink>
      </SignupSection>
    </Container>
  );
}
