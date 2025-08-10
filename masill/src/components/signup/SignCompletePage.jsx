import React from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "@components/auth/AuthContainer";
import styled from "styled-components";
import { CheckCircle } from "lucide-react";

const Wrap = styled.div`
  /* 393x852 캔버스 내부에서 px 기준 레이아웃 */
  position: absolute;
  inset: 0;
  background: #fff;
  padding: 24px 20px 40px;
  display: grid;
  grid-template-rows: 1fr auto; /* 본문(가운데) / 버튼(하단) */
  gap: 16px;
`;

const Complete = styled.div`
  display: grid;
  place-items: center;
  gap: 16px;
  text-align: center;

  p {
    margin: 0;
    font-size: 16px;
    line-height: 1.4;
    color: #222;
    font-weight: 600;
  }
`;

const Controls = styled.div`
  display: grid;

  button {
    height: 50px;
    border-radius: 26px;
    font-weight: 800;
    font-size: 16px;
    border: 0;
    cursor: pointer;
    color: #1d1d1d;
    background: #ffeed0;
  }
`;

export default function SignCompletePage() {
  const nav = useNavigate();
  return (
    <AuthContainer scroll={false}>
      <Wrap>
        <Complete>
          <CheckCircle size={48} color="#4caf50" />
          <p>회원가입이 완료되었습니다!</p>
        </Complete>

        <Controls>
          <button onClick={() => nav("/login")}>로그인</button>
        </Controls>
      </Wrap>
    </AuthContainer>
  );
}
