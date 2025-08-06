// src/pages/SignPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "@components/auth/AuthContainer";
import AuthButton from "@components/auth/AuthButton";
import styled from "styled-components";
import KakaoIcon from "@logo/kakao.svg";
import NaverIcon from "@logo/naver.svg";
import EmailIcon from "@logo/email.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

const LogoBox = styled.div`
  width: 160px;
  height: 160px;
  background: #eee;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  color: #666;
  font-size: 1rem;
`;

const Title = styled.h2`
  align-self: flex-start;
  margin-left: 20px;
  margin-bottom: 16px;
  font-size: 1rem;
  color: #333;
`;

const ButtonList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 8px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export default function SignPage() {
  const nav = useNavigate();
  return (
    <AuthContainer>
      <Wrapper>
        {/* 로고 및 앱 이름 */}
        <LogoBox>로고 및 앱 이름</LogoBox>

        {/* 섹션 제목 */}
        <Title>회원가입</Title>

        <ButtonList>
          {/* 내부 함수 호출부는 전혀 수정하지 않았습니다 */}
          <AuthButton onClick={() => nav("/signup/agree")} variant="primary">
            <IconWrapper>
              <img src={EmailIcon} alt="이메일 아이콘" />{" "}
            </IconWrapper>
            이메일로 시작하기
          </AuthButton>

          <AuthButton variant="secondary">
            <IconWrapper>
              <img src={KakaoIcon} alt="카카오 아이콘" />{" "}
            </IconWrapper>
            카카오로 시작하기
          </AuthButton>

          <AuthButton variant="secondary">
            <IconWrapper>
              <img src={NaverIcon} alt="네이버 아이콘" />
            </IconWrapper>
            네이버로 시작하기
          </AuthButton>
        </ButtonList>
      </Wrapper>
    </AuthContainer>
  );
}
