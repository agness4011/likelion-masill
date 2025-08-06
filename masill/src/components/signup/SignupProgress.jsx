import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// 각 단계에 대응하는 URL 순서대로 나열
const steps = [
  '/signup',         // SignPage (이메일/소셜 선택)
  '/signup/agree',   // 약관 동의
  '/signup/phone',   // 휴대폰 인증
  '/signup/create',  // 아이디 생성
  '/signup/region',  // 지역 선택
];

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;
const Back = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;
const Bar = styled.div`
  flex: 1;
  display: flex;
  gap: 4px;
  margin-left: 16px;
`;
const Segment = styled.div`
  flex: 1;
  height: 4px;
  background: ${({ active }) => (active ? '#333' : '#eee')};
`;

export default function SignupProgress() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const idx = steps.indexOf(pathname);

  return (
    <Header>
      {idx > 0 && <Back onClick={() => nav(steps[idx - 1])}>←</Back>}
      <Bar>
        {steps.map((_, i) => (
          <Segment key={i} active={i <= idx} />
        ))}
      </Bar>
    </Header>
  );
}
