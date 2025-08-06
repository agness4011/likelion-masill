import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "@components/auth/AuthContainer";
import AuthHeader from "@components/auth/AuthHeader";
import AuthInput from "@components/auth/AuthInput";
import AuthButton from "@components/auth/AuthButton";
import SocialLogin from "@components/auth/SocialLogin";
import "@pages/LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const nav = useNavigate();

  const handleLogin = () => {
    // TODO: 실제 인증 로직 후
    nav("/main");
  };
  const goSignup = () => nav("/signup");

  return (
    <AuthContainer>
      <div>
        <AuthHeader />
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
        <AuthButton variant="secondary" onClick={goSignup}>
          회원가입
        </AuthButton>
      </div>
      <SocialLogin />
    </AuthContainer>
  );
}
