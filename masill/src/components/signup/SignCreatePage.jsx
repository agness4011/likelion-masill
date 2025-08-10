import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "@components/auth/AuthContainer";
import AuthInput from "@components/auth/AuthInput";
import AuthButton from "@components/auth/AuthButton";
import styled from "styled-components";

const Wrap = styled.div`
  /* 393x852 캔버스 내부에서 px 좌표로 레이아웃 */
  position: absolute;
  inset: 0;
  background: #fff;
  padding: 24px 20px 40px;
  display: grid;
  grid-template-rows: auto 1fr auto; /* 제목 / 폼 / 버튼 */
  gap: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
`;

const Form = styled.div`
  display: grid;
  align-content: start;
  gap: 12px;
`;

const Controls = styled.div`
  display: grid;
`;

export default function SignCreatePage() {
  const nav = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [nick, setNick] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const allFilled = emailId && nick && pw && pw2 && pw === pw2;

  return (
    <AuthContainer scroll={false}>
      <Wrap>
        <Title>아이디 생성</Title>

        <Form>
          <AuthInput
            label="이메일"
            placeholder="아이디"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <AuthInput
            label="닉네임"
            placeholder="닉네임 입력"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
          />
          <AuthInput
            label="비밀번호"
            type="password"
            placeholder="비밀번호 입력"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <AuthInput
            label="비밀번호 재입력"
            type="password"
            placeholder="비밀번호 확인"
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
          />
        </Form>

        <Controls>
          <AuthButton
            onClick={() => nav("/signup/region")}
            disabled={!allFilled}
          >
            다음
          </AuthButton>
        </Controls>
      </Wrap>
    </AuthContainer>
  );
}
