import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "@components/auth/AuthContainer";
import AuthInput from "@components/auth/AuthInput";
import styled from "styled-components";

const Wrap = styled.div`
  /* 393x852 캔버스 내부에서 px 좌표로 배치 */
  position: absolute;
  inset: 0;
  background: #fff;
  padding: 24px 20px 40px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
`;

const Form = styled.div`
  display: grid;
  align-content: start;
  gap: 12px;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    height: 50px;
    border-radius: 26px;
    font-weight: 800;
    font-size: 16px;
    border: 0;
    cursor: pointer;
  }

  button.primary {
    color: #1d1d1d;
    background: #ffeed0;
  }

  button[disabled] {
    background: #e6e6e6;
    color: #9a9a9a;
    cursor: not-allowed;
  }
`;

const Timer = styled.div`
  text-align: right;
  font-size: 13px;
  color: #666;
`;

export default function SignPhonePage() {
  const nav = useNavigate();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [time, setTime] = useState(300);

  useEffect(() => {
    if (sent && time > 0) {
      const iv = setInterval(() => setTime((t) => t - 1), 1000);
      return () => clearInterval(iv);
    }
  }, [sent, time]);

  // (선택) 아주 간단한 유효성 — 숫자 10~11자리
  const phoneDigits = phone.replace(/\D/g, "");
  const canSend = !sent && phoneDigits.length >= 10 && phoneDigits.length <= 11;
  const canConfirm = sent && code.trim().length > 0;

  return (
    <AuthContainer scroll={false}>
      <Wrap>
        <Title>휴대폰 번호를 입력해주세요.</Title>

        <Form>
          <AuthInput
            label="휴대폰 번호"
            placeholder="010-1234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {sent && (
            <>
              <AuthInput
                label="인증 번호"
                placeholder="인증번호 입력"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Timer>
                {`${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
                  time % 60
                ).padStart(2, "0")}`}
              </Timer>
            </>
          )}
        </Form>

        <Controls>
          {!sent ? (
            <button
              className="primary"
              disabled={!canSend}
              onClick={() => {
                setSent(true);
                setTime(300);
              }}
            >
              인증번호 보내기
            </button>
          ) : (
            <button
              className="primary"
              disabled={!canConfirm}
              onClick={() => nav("/signup/create")}
            >
              인증 완료
            </button>
          )}
          <button onClick={() => nav("/signup/agree")}>이전</button>
        </Controls>
      </Wrap>
    </AuthContainer>
  );
}
