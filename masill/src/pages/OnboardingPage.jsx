// src/pages/Onboarding.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PixelCanvas from "@/components/commons/PixelCanvas";
import bird from "@logo/bird.svg";
import arrowright from "@logo/arrowright.png";

export default function OnboardingPage() {
  const nav = useNavigate();
  return (
    <div>
      <Wrap>
        <CircleTopRight />
        <CircleBottomLeft />
        <BottomGradient />

        <Bird src={bird} alt="bird" />

        <Title>
          우리 동네 가볍게
          <br />
          마실갈 곳 쏙쏙 골라보기
        </Title>

        <IndicatorWrapper>
          <Dot active />
          <Dot />
          <Dot />
        </IndicatorWrapper>

        <ArrowRight
          src={arrowright}
          alt="arrowright"
          onClick={() => nav("/onboarding1")}
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

const Wrap = styled.div`
  position: absolute;
  inset: 0;
  background: #ffffff;
  overflow: hidden;
`;

/* 모든 좌표와 크기는 Figma px 값 그대로 */
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
const Bird = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 222px;
  bottom: 370px;
  z-index: 1;
`;
const Title = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 300px;
  z-index: 1;
  font: bold;
  text-align: center;
  color: #fff;
  font-family: "Pretendard Variable", system-ui, -apple-system, "Segoe UI",
    Roboto, sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.5;
  letter-spacing: 0;
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
const ArrowRight = styled.img`
  position: absolute;
  bottom: 270px;
  right: 50px;
  z-index: 2;
  width: 22px;
  height: 20px;
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
  font-weight: 800;
  font-size: 16px;
`;
const JoinBtn = styled(BaseBtn)`
  background: #fff;
  color: #1d1d1d;
  border: none;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
`;
const LoginBtn = styled(BaseBtn)`
  background: transparent;
  color: #fff;
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
  cursor: pointer;
  font-size: 13px;
  text-decoration: underline;
  padding: 4px 8px;
`;
