// src/pages/Onboarding2.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PixelCanvas from "@/components/commons/PixelCanvas"; // 393x852 스케일 래퍼

import arrowleft from "@logo/arrowleft.png";

export default function OnboardingPage() {
  const nav = useNavigate();

  return (
    <PixelCanvas w={393} h={852}>
      <Wrap>
        <CircleTopRight />
        <CircleBottomLeft />
        <BottomGradient />

        <Title>
          우리 동네 마실,
          <br />
          어디로 가볼까요?
        </Title>

        <IndicatorWrapper>
          <Dot />
          <Dot />
          <Dot active />
        </IndicatorWrapper>

        <Arrowleft
          src={arrowleft}
          alt="arrowleft"
          onClick={() => nav("/onboarding1")}
        />

        <BtnArea>
          <JoinBtn onClick={() => nav("/signup")}>회원가입</JoinBtn>
          <LoginBtn onClick={() => nav("/login")}>로그인</LoginBtn>
          <LookAround onClick={() => nav("/main")}>둘러보기</LookAround>
        </BtnArea>
      </Wrap>
    </PixelCanvas>
  );
}

const Wrap = styled.div`
  position: absolute;
  inset: 0; /* 캔버스 꽉 채움 (좌표계: 393x852) */

  background: #ffffff;
  overflow: hidden;
`;

const CircleTopRight = styled.div`
  transform: rotate(13.409deg);
  flex-shrink: 0;
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

const Arrowleft = styled.img`
  width: 22px;
  height: 20px;
  z-index: 2;
  cursor: pointer;
  position: absolute;
  bottom: 270px;
  left: 50px;
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
