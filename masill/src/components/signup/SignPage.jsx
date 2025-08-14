import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import AuthContainer from "@components/auth/AuthContainer";
import AuthButton from "@components/auth/AuthButton";
import MasilLogo from "@/assets/masill-logo.svg";
import EmailIcon from "@logo/email.svg";
import KakaoIcon from "@logo/kakao.svg";
import NaverIcon from "@logo/naver.svg";
import BirdIcon1 from "@logo/bird1.svg"; //새 아이콘 새로 교체할것//

const TEXT_COLOR_GRADIENT = `linear-gradient(90deg, #4E7AEA 0%, #FF7852 100%)`;

const PageContainer = styled(AuthContainer)`
  padding: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; // 기존 center → flex-start로 변경
  text-align: left;
  margin-top: 17vh;
  padding-left: 20px;
  z-index: 1;
  // 추가: 왼쪽 여백 조정 (원하는 만큼 값 조절)
`;

const LogoImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
  line-height: 1.2;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AnimatedLine = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 2.2rem;
`;

const AnimatedTextWrapper = styled.div`
  position: relative;
  height: 2.6rem;
  overflow: hidden;
  display: inline-block;
  min-width: 150px;
`;

const AnimatedText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: left;
  opacity: ${({ state }) => (state === "enter" ? 1 : 0)};
  transform: translateY(${({ state }) => (state === "enter" ? "0" : "30px")});
  transition: opacity 0.5s, transform 0.5s;
`;

const GradientText = styled.span`
  background: ${TEXT_COLOR_GRADIENT};
  color: #4e7aea;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
`;

const BirdIconImage = styled.img`
  width: 70px;
  height: 70px;
  margin-left: 85px;
`;

const ButtonList = styled.div`
  width: 100%;
  background: rgba(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 25px;
  margin-top: 20vh;
  z-index: 1;
`;

const StyledAuthButton = styled(AuthButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  &:nth-child(1) {
    background-color: rgba(236, 241, 255, 0.2);
    color: #333;
    border: 1px solid #c1cae0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  &:nth-child(2) {
    background-color: rgba(236, 241, 255, 0.2);
    color: #191919;
    border: 1px solid #c1cae0;
  }
  &:nth-child(3) {
    background-color: rgba(236, 241, 255, 0.2);
    color: #000000;
    border: 1px solid #c1cae0;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 8px;

  svg,
  img {
    width: 20px;
    height: 20px;
  }
`;

export default function SignPage() {
  const nav = useNavigate();
  const [textIndex, setTextIndex] = useState(0);
  const [animState, setAnimState] = useState("enter");
  const texts = ["세미나", "단골가게", "축제"];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimState("exit");
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setAnimState("enter");
      }, 500); // transition과 동일하게
    }, 2000);
    return () => clearTimeout(timeout);
  }, [textIndex, texts.length]);

  return (
    <PageContainer>
      <CircleTopLeft />

      
      <Header>
        <LogoImage src={MasilLogo} alt="마실 로고" />
        <Title>
          <span>우리 동네</span>
          <AnimatedLine>
            <AnimatedTextWrapper>
              <AnimatedText state={animState}>
                <GradientText>{texts[textIndex]}</GradientText>
              </AnimatedText>
            </AnimatedTextWrapper>
            <BirdIconImage src={BirdIcon1} alt="새 아이콘" />
          </AnimatedLine>
          <span>함께 마실나가요</span>
        </Title>
      </Header>

      <ButtonList>
        <StyledAuthButton onClick={() => nav("/signup/agree")}>
          <IconWrapper>
            <img src={EmailIcon} alt="이메일 아이콘" />
          </IconWrapper>
          이메일로 시작하기
        </StyledAuthButton>
        <StyledAuthButton onClick={() => console.log("카카오 로그인")}>
          <IconWrapper>
            <img src={KakaoIcon} alt="카카오 아이콘" />
          </IconWrapper>
          카카오로 시작하기
        </StyledAuthButton>
        <StyledAuthButton onClick={() => console.log("네이버 로그인")}>
          <IconWrapper>
            <img src={NaverIcon} alt="네이버 아이콘" />
          </IconWrapper>
          네이버로 시작하기
        </StyledAuthButton>
      </ButtonList>
      <CircleBottomRight />
    </PageContainer>
  );
}

const CircleTopLeft = styled.div`
  position: absolute;
  top: -100px;
  left: -80px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 219, 172, 0.8) 0%, rgba(255, 190, 147, 0.9) 100%);
  z-index: 0;
  filter: blur(2px);
`;

const CircleBottomRight = styled.div`
  position: absolute;
  bottom: -120px;
  right: -200px;
  width: 300px;
  height: 350px;
  border-radius: 50%;
  background: linear-gradient(-15deg, rgba(78, 122, 234, 0.8) 0%, rgba(255, 120, 82, 0.8) 100%);
  z-index: 0;
  filter: blur(2px);
`;
