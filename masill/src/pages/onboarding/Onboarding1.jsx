import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import arrowright from "@logo/arrowright.png";
import arrowleft from "@logo/arrowleft.png";
import chatonboarding1 from "@logo/chatonboarding1.svg";
import chatonboarding2 from "@logo/chatonboarding2.svg";

export default function OnboardingPage() {
  const nav = useNavigate();
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecond(true);
    }, 2000); // 2초 후 전환
    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrap>
      <CircleTopRight />
      <CircleBottomLeft />

      {/* 같은 위치에서 이미지 전환 (교차 페이드) */}
      <ChatImage
        src={chatonboarding1}
        alt="chatonboarding1"
        style={{ opacity: showSecond ? 0 : 1 }}
      />
      <ChatImage
        src={chatonboarding2}
        alt="chatonboarding2"
        style={{ opacity: showSecond ? 1 : 0 }}
      />

      <BottomGradient />

      <Title>
        <AccentText>masill_bird</AccentText>에게
        <br />
        추천받는 맞춤 마실
      </Title>

      <IndicatorWrapper>
        <Dot />
        <Dot active />
        <Dot />
      </IndicatorWrapper>

      <ArrowLeft src={arrowleft} alt="arrowleft" onClick={() => nav("/")} />
      <ArrowRight
        src={arrowright}
        alt="arrowright"
        onClick={() => nav("/onboarding2")}
      />

      <BtnArea>
        <JoinBtn onClick={() => nav("/signup")}>회원가입</JoinBtn>
        <LoginBtn onClick={() => nav("/login")}>로그인</LoginBtn>
        <LookAround onClick={() => nav("/main")}>둘러보기</LookAround>
      </BtnArea>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #eef3ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const CircleTopRight = styled.div`
  transform: rotate(13.409deg);
  position: absolute;
  top: -170px;
  right: -130px;
  width: 360px;
  height: 320px;
  border-radius: 50%;
  background: linear-gradient(
    185deg,
    #4e7aea -21.92%,
    #ffdbac 85.22%,
    #ffbe93 100.53%
  );
`;

const CircleBottomLeft = styled.div`
  position: absolute;
  left: -120px;
  bottom: 270px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: linear-gradient(
    185deg,
    #4e7aea -21.92%,
    #ffdbac 85.22%,
    #ffbe93 100.53%
  );
`;

/* 전환 애니메이션 */
const ChatImage = styled.img`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  opacity: ${(props) => (props.$fadeIn ? 1 : 0)};
  transition: opacity 0.8s ease-in-out;
`;

const BottomGradient = styled.div`
  position: absolute;
  left: 53.5%;
  bottom: -90px;
  transform: translateX(-50%);
  width: 150%;
  height: 63%;
  border-top-left-radius: 50% 99%;
  border-top-right-radius: 50% 83%;
  background: linear-gradient(180deg, #1b409c 0%, #ff7852 100%);
`;

const Title = styled.p`
  z-index: 1;
  font: bold 24px "Pretendard Variable", sans-serif;
  position: absolute;
  bottom: 300px;
  text-align: center;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
`;
const AccentText = styled.span`
  background: linear-gradient(
    90deg,
    #4e7aea -21.92%,
    #ffdbac 85.22%,
    #ffbe93 100.53%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
`;

const IndicatorWrapper = styled.div`
  position: absolute;
  bottom: 270px;
  display: flex;
  gap: 6px;
  z-index: 2;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  /* 위치 자유롭게 조정 가능 */
  border-radius: 50%;
  background: ${({ active }) => (active ? "#fff" : "rgba(255,255,255,0.5)")};
`;

const ArrowLeft = styled.img`
  width: 22px;
  height: 20px;
  z-index: 2;
  cursor: pointer;
  position: absolute;
  bottom: 270px;
  left: 50px;
`;

const ArrowRight = styled.img`
  width: 22px;
  height: 20px;
  z-index: 2;
  cursor: pointer;
  position: absolute;
  bottom: 270px;
  right: 50px;
`;

const BtnArea = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 40px;
  width: 100%;
  padding: 0 20px;
  display: grid;
  place-items: center;
  row-gap: 12px;
`;

const BaseBtn = styled.button`
  width: 100%;
  max-width: 332px;
  height: 50px;
  border-radius: 26px;
  font-size: 16px;
  font-weight: 800;
`;

const JoinBtn = styled(BaseBtn)`
  background: #ffffff;
  color: #1d1d1d;
  border: none;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
`;

const LoginBtn = styled(BaseBtn)`
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.95);
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.14),
      rgba(255, 255, 255, 0.06)
    );
  }
`;

const LookAround = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
  padding: 4px 8px;
`;
