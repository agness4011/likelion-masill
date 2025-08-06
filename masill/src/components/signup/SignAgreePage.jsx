import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '@components/auth/AuthContainer';
import styled from 'styled-components';

const termsList = [
  { label: '이용약관 동의 (필수)', required: true },
  { label: '개인정보 수집 및 이용 동의 (필수)', required: true },
  { label: '위치기반 서비스 이용약관 동의 (필수)', required: true },
  { label: '마케팅 알림 수신 동의 (선택)', required: false },
];

const TermRow = styled.div`
  display:flex; align-items:center; margin:12px 0; cursor:pointer;
  input { margin-right:8px; }
`;

export default function SignAgreePage() {
  const nav = useNavigate();
  const [checked, setChecked] = useState({});
  const all = termsList.every((t,i) => t.required ? checked[i] : true);

  return (
    <AuthContainer>
      <div>
        <h2>시작을 위해서는, 약관 동의가 필요해요.</h2>
        <TermRow onClick={() => {
          const on = !all;
          setChecked(termsList.map(() => on));
        }}>
          <input type="checkbox" checked={all} readOnly />
          <span>전체 동의(선택항목 포함)</span>
        </TermRow>
        {termsList.map((t,i)=>(
          <TermRow key={i} onClick={()=> setChecked({...checked, [i]:!checked[i]})}>
            <input type="checkbox" checked={!!checked[i]} readOnly/>
            <span>{t.label}</span>
          </TermRow>
        ))}
      </div>
      <button disabled={!all} onClick={()=> nav('/signup/phone')}>
        다음
      </button>
    </AuthContainer>
  );
}
