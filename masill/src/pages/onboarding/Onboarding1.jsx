// src/pages/Onboarding1.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import PixelCanvas from "@/components/commons/PixelCanvas"; // 393x852 스케일 래퍼
import arrowright from "@logo/arrowright.png";
import arrowleft from "@logo/arrowleft.png";
import chatonboarding1 from "@logo/chatonboarding1.svg";
import chatonboarding2 from "@logo/chatonboarding2.svg";

export default function OnboardingPage() {
  const nav = useNavigate();
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSecond(prev => !prev);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Wrap>
        <CircleTopRight />
        <CircleBottomLeft />

        {/* 조건부 렌더링으로 이미지 전환 */}
        {!showSecond && (
          <ChatImage
            src={chatonboarding1}
            alt="chatonboarding1"
          />
        )}
        {showSecond && (
          <ChatImage
            src={chatonboarding2}
            alt="chatonboarding2"
          />
        )}

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
    </div>
  );
}

/* 393x852 캔버스(픽셀 좌표계) 안을 꽉 채움 */
const Wrap = styled.div`
  position: absolute;
  inset: 0;
  background: #ffffff;
  overflow: hidden;
`;

const CircleTopRight = styled.div`
  position: absolute;
  transform: rotate(13.409deg);
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
  bottom: 330px;
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

/* 이미지 스타일 */
const ChatImage = styled.img`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  pointer-events: none;
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 300px;

  z-index: 1;
  text-align: center;
  font-family: "Pretendard Variable", system-ui, -apple-system, "Segoe UI",
    Roboto, sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.5;
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
  left: 50%;
  transform: translateX(-50%);
  bottom: 270px;
  display: flex;
  gap: 6px;
  z-index: 2;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "#fff" : "rgba(255,255,255,0.5)")};
`;

const ArrowLeft = styled.img`
  position: absolute;
  bottom: 270px;
  left: 50px;
  width: 22px;
  height: 20px;
  z-index: 2;
  cursor: pointer;
`;

const ArrowRight = styled.img`
  position: absolute;
  bottom: 270px;
  right: 50px;
  width: 22px;
  height: 20px;
  z-index: 2;
  cursor: pointer;
`;

const BtnArea = styled.div`
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 100%;
  padding: 0 20px;
  display: grid;
  place-items: center;
  row-gap: 12px;
  z-index: 1;
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
