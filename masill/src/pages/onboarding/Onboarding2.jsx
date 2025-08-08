import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import arrowleft from "@logo/arrowleft.png";

export default function OnboardingPage() {
  const nav = useNavigate();

  return (
    <Wrap>
      <CircleTopRight />
      <CircleBottomLeft />
      <BottomGradient />

      {/* 새 */}

      {/* 문구 */}
      <Title>
        우리 동네 마실,
        <br />
        어디로 가볼까요?
      </Title>

      {/* 점 3개 */}
      <IndicatorWrapper>
        <Dot />
        <Dot />
        <Dot active />
      </IndicatorWrapper>

      {/* 오른쪽 화살표 이미지 클릭 시 페이지 이동 */}
      <Arrowleft
        src={arrowleft}
        alt="arrowleft"
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
  top: -170px;
  right: -130px;
  width: 360px;
  height: 320px;
  border-radius: 50%;
  background: var(
    --Accent-GD-01,
    linear-gradient(185deg, #4e7aea -21.92%, #ffdbac 85.22%, #ffbe93 100.53%)
  );
`;

const CircleBottomLeft = styled.div`
  position: absolute;
  left: -120px;
  bottom: 270px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: var(
    --Accent-GD-01,
    linear-gradient(185deg, #4e7aea -21.92%, #ffdbac 85.22%, #ffbe93 100.53%)
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
  background: var(
    --Accent-GD-02,
    linear-gradient(180deg, #1b409c 0%, #ff7852 100%)
  );
`;

const Bird = styled.img`
  z-index: 1;
  width: 222px;
  position: absolute;
  bottom: 294px;
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

/* 점 3개 */
const IndicatorWrapper = styled.div`
  position: absolute;
  bottom: 270px; /* 위치 자유롭게 조정 가능 */
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

/* 화살표 이미지 */
const Arrowleft = styled.img`
  width: 22px;
  height: 20px;
  z-index: 2;
  cursor: pointer;
  position: absolute;
  bottom: 270px; /* 점과 별개로 위치 조정 가능 */
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
