import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '@components/auth/AuthContainer';
import AuthInput from '@components/auth/AuthInput';
import AuthButton from '@components/auth/AuthButton';

export default function SignCreatePage() {
  const nav = useNavigate();
  const [emailId, setEmailId] = useState('');
  const [nick, setNick]       = useState('');
  const [pw, setPw]           = useState('');
  const [pw2, setPw2]         = useState('');

  const allFilled = emailId && nick && pw && pw2 && pw===pw2;

  return (
    <AuthContainer>
      <div>
        <h2>아이디 생성</h2>
        <AuthInput
          label="이메일"
          placeholder="아이디"
          value={emailId}
          onChange={e=>setEmailId(e.target.value)}
        />
        <AuthInput
          label="닉네임"
          placeholder="닉네임 입력"
          value={nick}
          onChange={e=>setNick(e.target.value)}
        />
        <AuthInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호 입력"
          value={pw}
          onChange={e=>setPw(e.target.value)}
        />
        <AuthInput
          label="비밀번호 재입력"
          type="password"
          placeholder="비밀번호 확인"
          value={pw2}
          onChange={e=>setPw2(e.target.value)}
        />
      </div>
      <AuthButton onClick={()=>nav('/signup/region')} disabled={!allFilled}>
        다음
      </AuthButton>
    </AuthContainer>
  );
}

