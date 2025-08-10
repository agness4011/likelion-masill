// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "@components/auth/AuthContainer";
import AuthInput from "@components/auth/AuthInput";
import AuthButton from "@components/auth/AuthButton";
import AuthHeader from "@components/auth/AuthHeader";
import SocialLogin from "@components/auth/SocialLogin";
import styled from "styled-components";
import MasilLogo from "@/assets/masill-logo.svg"; // alias 없으면 ../assets 로

const Wrap = styled.div`
  position: relative;
  min-height: 100dvh;
  background: #fff;
  padding: 16px 20px 32px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 16px;

  > * {
    position: relative;
    z-index: 1; /* 원 위에 내용 올리기 */
  }
`;

/* 상단 오른쪽 원 */
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
  top: 741px;
  background: linear-gradient(180deg, #1b409c 0%, #ff7852 100%);
  filter: blur(2.25px);
  transform: rotate(-95.46deg);
  border-radius: 50%;
  z-index: 0;
`;

const Form = styled.div`
  display: grid;
  align-content: start;
  gap: 14px;
  max-width: 480px;
  margin: 0 auto;
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const nav = useNavigate();

  const handleLogin = () => {
    // TODO: 실제 인증 로직
    nav("/main");
  };

  return (
    <AuthContainer scroll={false}>
      <Wrap>
        {/* 배경 원 2개 */}
        <CircleTopRight />
        <BottomGradient />

        {/* 상단: 뒤로가기 + 로고 */}
        <AuthHeader onBack={() => nav(-1)} logoSrc={MasilLogo} logoAlt="마실" />

        {/* 중간: 폼 */}
        <Form>
          <AuthInput
            label="아이디"
            placeholder="이메일 주소를 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <AuthButton onClick={handleLogin}>로그인</AuthButton>
        </Form>

        {/* 하단: 소셜 로그인 + 회원가입 링크 */}
        <SocialLogin onSignup={() => nav("/signup")} />
      </Wrap>
    </AuthContainer>
  );
}

