// src/pages/SignAgreePage.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "@components/auth/AuthContainer";
import styled from "styled-components";

const termsList = [
  { label: "이용약관 동의 (필수)", required: true },
  { label: "개인정보 수집 및 이용 동의 (필수)", required: true },
  { label: "위치기반 서비스 이용약관 동의 (필수)", required: true },
  { label: "마케팅 알림 수신 동의 (선택)", required: false },
];

const Row = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 0;
  cursor: pointer;
  text-align: left;
  background: transparent;
  border: 0;
  outline: none;

  input {
    pointer-events: none; /* 버튼 클릭으로만 토글 */
  }
`;

const Wrap = styled.div`
  /* 393x852 캔버스 안에서 px 좌표/배치 (로그인과 동일 톤) */
  position: absolute;
  inset: 0;
  padding: 24px 20px 40px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
  background: #fff; /* 약관 화면은 화이트가 자연스러움 */
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
`;

const List = styled.div`
  margin-top: 8px;
`;

const NextBtn = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 26px;
  font-weight: 800;
  font-size: 16px;
  border: 0;
  color: #1d1d1d;
  background: ${({ disabled }) => (disabled ? "#E6E6E6" : "#FFEECC")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export default function SignAgreePage() {
  const nav = useNavigate();

  // 체크 상태를 인덱스 -> boolean 맵으로 관리
  const [checked, setChecked] = useState({}); // e.g. {0:true, 1:false, ...}

  const allRequired = useMemo(
    () => termsList.every((t, i) => (t.required ? !!checked[i] : true)),
    [checked]
  );

  const allIncludingOptional = useMemo(
    () => termsList.every((_, i) => !!checked[i]),
    [checked]
  );

  const toggleAll = (on) => {
    // 객체로 통일
    const obj = {};
    termsList.forEach((_, i) => (obj[i] = !!on));
    setChecked(obj);
  };

  const toggleOne = (i) => setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <AuthContainer scroll={false} /* 데스크톱 고정 / 모바일 contain */>
      <Wrap>
        <Title>시작을 위해서는, 약관 동의가 필요해요.</Title>

        <div>
          {/* 전체 동의 (선택 포함) */}
          <Row type="button" onClick={() => toggleAll(!allIncludingOptional)}>
            <input type="checkbox" readOnly checked={allIncludingOptional} />
            <span>전체 동의(선택항목 포함)</span>
          </Row>

          <List>
            {termsList.map((t, i) => (
              <Row key={i} type="button" onClick={() => toggleOne(i)}>
                <input type="checkbox" readOnly checked={!!checked[i]} />
                <span>
                  {t.label} {t.required ? "" : <small>(선택)</small>}
                </span>
              </Row>
            ))}
          </List>
        </div>

        <NextBtn disabled={!allRequired} onClick={() => nav("/signup/phone")}>
          다음
        </NextBtn>
      </Wrap>
    </AuthContainer>
  );
}
