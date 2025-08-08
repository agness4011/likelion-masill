import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '@components/auth/AuthContainer';
import AuthInput from '@components/auth/AuthInput';
import styled from 'styled-components';

const Controls = styled.div`
  display:flex; flex-direction:column; gap:8px;
`;
const Timer = styled.div`
  text-align:right; font-size:0.875rem; color:#666;
`;

export default function SignPhonePage() {
  const nav = useNavigate();
  const [phone, setPhone] = useState('');
  const [code, setCode]   = useState('');
  const [sent, setSent]   = useState(false);
  const [time, setTime]   = useState(300);

  useEffect(()=>{
    if(sent && time>0){
      const iv = setInterval(()=> setTime(t=>t-1),1000);
      return ()=> clearInterval(iv);
    }
  },[sent,time]);

  return (
    <AuthContainer>
      <div>
        <h2>휴대폰 번호를 입력해주세요.</h2>
        <AuthInput
          label="휴대폰 번호"
          placeholder="010-1234-5678"
          value={phone}
          onChange={e=>setPhone(e.target.value)}
        />
        {sent && (
          <>
            <AuthInput
              label="인증 번호"
              placeholder="인증번호 입력"
              value={code}
              onChange={e=>setCode(e.target.value)}
            />
            <Timer>
              {`${String(Math.floor(time/60)).padStart(2,'0')}:${String(time%60).padStart(2,'0')}`}
            </Timer>
          </>
        )}
      </div>
      <Controls>
        {!sent 
          ? <button onClick={()=>setSent(true)}>인증번호 보내기</button>
          : <button disabled={!code} onClick={()=>nav('/signup/create')}>인증 완료</button>
        }
        <button onClick={()=>nav('/signup/agree')}>이전</button>
      </Controls>
    </AuthContainer>
  );
}
