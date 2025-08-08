// src/components/signup/SignCompletePage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "@components/auth/AuthContainer";
import styled from "styled-components";
import { CheckCircle } from "lucide-react";

const Complete = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export default function SignCompletePage() {
  const nav = useNavigate();
  return (
    <AuthContainer>
      <Complete>
        <CheckCircle size={48} color="#4caf50" />
        <p>회원가입이 완료되었습니다!</p>
      </Complete>
      <button onClick={() => nav("/login")}>로그인</button>
    </AuthContainer>
  );
}
