import React from "react";
import styled from "styled-components";
import KakaoIcon from "@logo/kakao.svg";
import NaverIcon from "@logo/naver.svg";

const Block = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

const Divider = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  color: #8a8f98;
  font-size: 12px;
  margin: 10px 0 16px;
  &::before,
  &::after {
    content: "";
    height: 1px;
    background: #e5e7eb;
    display: block;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 10px;
`;

const SocialBtn = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const Signup = styled.div`
  text-align: center;
  font-size: 13px;
  color: #6b7280;
  a {
    margin-left: 6px;
    color: #3b82f6;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default function SocialLogin({ onSignup }) {
  const handleKakao = () => {
    // TODO: 카카오/톡 소셜 로그인
    alert("소셜 로그인은 추후 연동");
  };
  const handleNaver = () => {
    // TODO: 네이버 로그인
    alert("네이버 로그인은 추후 연동");
  };

  return (
    <Block>
      <Divider>소셜 로그인</Divider>
      <Row>
        <SocialBtn onClick={handleKakao} aria-label="톡으로 로그인">
          <img src={KakaoIcon} alt="" width="28" height="28" />
        </SocialBtn>
        <SocialBtn onClick={handleNaver} aria-label="네이버로 로그인">
          <img src={NaverIcon} alt="" width="28" height="28" />
        </SocialBtn>
      </Row>
      <Signup>
        아직 회원이 아니신가요?
        <a onClick={onSignup}>회원가입</a>
      </Signup>
    </Block>
  );
}
