import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bird from "@logo/bird.svg"; // 경로 확인
import arrowright from "@logo/arrowright.png";

export default function OnboardingPage() {
  const nav = useNavigate();

  return (
    <Wrap>
      <CircleTopRight />
      <CircleBottomLeft />
      <BottomGradient />

      {/* 새 */}
      <Bird src={bird} alt="bird" />

      {/* 문구 */}
      <Title>
        우리 동네 가볍게
        <br />
        마실갈 곳 쏙쏙 골라보기
      </Title>

      {/* 점 3개 */}
      <IndicatorWrapper>
        <Dot active />
        <Dot />
        <Dot />
      </IndicatorWrapper>

      {/* 오른쪽 화살표 이미지 클릭 시 페이지 이동 */}
      <ArrowRight
        src={arrowright}
        alt="arrowright"
        onClick={() => nav("/onboarding1")}
      />

      {/* 버튼 영역 */}
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
  flex-shrink: 0;
  position: absolute;
  top: -19.94vh; /* -170px */
  right: -33.07vw; /* -130px */
  width: 91.6vw; /* 360px */
  height: 37.55vh; /* 320px */
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
  left: -30.53vw; /* -120px */
  bottom: 31.69vh; /* 270px */
  width: 81.42vw; /* 320px */
  height: 37.55vh; /* 320px */
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
  bottom: -10.56vh; /* -90px */
  transform: translateX(-50%);
  width: 150%;
  height: 63%;
  border-top-left-radius: 50% 99%;
  border-top-right-radius: 50% 83%;
  background: linear-gradient(180deg, #1b409c 0%, #ff7852 100%);
`;

const Bird = styled.img`
  z-index: 1;
  width: 56.49vw; /* 222px */
  position: absolute;
  bottom: 43.43vh; /* 370px */
`;

const Title = styled.p`
  z-index: 1;
  font-size: clamp(1rem, 5vw, 1.25rem); /* 20px 기준 */
  font-weight: 700;
  line-height: 1.5;
  position: absolute;
  bottom: 35.21vh; /* 300px */
  text-align: center;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
`;

const IndicatorWrapper = styled.div`
  position: absolute;
  bottom: 31.69vh; /* 270px */
  display: flex;
  gap: 1.52vw; /* 6px */
  z-index: 2;
`;

const Dot = styled.div`
  width: 2.03vw; /* 8px */
  height: 2.03vw; /* 8px */
  border-radius: 50%;
  background: ${({ active }) => (active ? "#fff" : "rgba(255,255,255,0.5)")};
`;

const ArrowRight = styled.img`
  width: 5.6vw; /* 22px */
  height: 2.35vh; /* 20px */
  z-index: 2;
  cursor: pointer;
  position: absolute;
  bottom: 31.69vh; /* 270px */
  right: 12.72vw; /* 50px */
`;

const BtnArea = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 4.7vh; /* 40px */
  width: 100%;
  padding: 0 5.09vw; /* 20px */
  display: grid;
  place-items: center;
  row-gap: 1.41vh; /* 12px */
`;

const BaseBtn = styled.button`
  width: 100%;
  max-width: 84.48vw; /* 332px */
  height: 5.87vh; /* 50px */
  border-radius: 26px;
  font-size: clamp(0.875rem, 4vw, 1rem);
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
  font-size: clamp(0.75rem, 3vw, 0.8125rem);
  text-decoration: underline;
  cursor: pointer;
  padding: 0.47vh 2.03vw; /* 4px 8px */
`;

