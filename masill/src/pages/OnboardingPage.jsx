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
  height: 100%;
  max-width: 430px;
  margin: 0 auto;
  background: #eef3ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const CircleTopRight = styled.div`
  position: absolute;
  top: -11rem;
  right: -12rem;
  width: 22.5rem;
  height: 18.75rem;
  border-radius: 50%;
  transform: rotate(13.409deg);
  background: linear-gradient(
    185deg,
    #4e7aea -21.92%,
    #ffdbac 85.22%,
    #ffbe93 100.53%
  );
`;

const CircleBottomLeft = styled.div`
  position: absolute;
  left: -11rem;
  bottom: 18rem;
  width: 20rem;
  height: 18.75rem;
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
  left: 50%;
  bottom: -5rem;
  transform: translateX(-50%);
  width: 150%;
  height: 63%;
  border-top-left-radius: 50% 99%;
  border-top-right-radius: 50% 83%;
  background: linear-gradient(180deg, #1b409c 0%, #ff7852 100%);
`;

const Bird = styled.img`
  z-index: 1;
  position: absolute;
  width: 50%;
  bottom: 40%;
`;

const Title = styled.p`
  z-index: 1;
  font-weight: 700;
  line-height: 1.5;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  position: absolute;
  bottom: 30%;
  text-align: center;
`;

const IndicatorWrapper = styled.div`
  position: absolute;
  bottom: 18rem;
  display: flex;
  gap: 0.375rem;
  z-index: 2;
`;

const Dot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${({ active }) => (active ? "#fff" : "rgba(255,255,255,0.5)")};
`;

const ArrowRight = styled.img`
  width: 1.375rem;
  height: 1.25rem;
  z-index: 2;
  cursor: pointer;
  position: absolute;
  bottom: 18rem;
  right: 3rem;
`;

const BtnArea = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 2.5rem;
  width: 100%;
  padding: 0 1.25rem;
  display: grid;
  place-items: center;
  row-gap: 0.75rem;
`;

const BaseBtn = styled.button`
  width: 100%;
  max-width: 20.75rem;
  height: 3.125rem;
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
  padding: 0.25rem 0.5rem;
`;
