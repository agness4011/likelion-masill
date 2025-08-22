// src/pages/Onboarding2.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import PixelCanvas from "@/components/commons/PixelCanvas"; // 393x852 스케일 래퍼

// 실제 이미지 import
import onbg1 from "@logo/onboarding2/onbg1.svg";
import onbg2 from "@logo/onboarding2/onbg2.svg";
import onbg3 from "@logo/onboarding2/onbg3.svg";
import onbg4 from "@logo/onboarding2/onbg4.svg";
import onbg5 from "@logo/onboarding2/onbg5.svg";
import arrowleft from "@logo/arrowleft.png";

// 캐러셀 데이터
const carouselData = [
  {
    id: 1,
    image: onbg1
  },
  {
    id: 2,
    image: onbg2
  },
  {
    id: 3,
    image: onbg3
  },
  {
    id: 4,
    image: onbg4
  },
  {
    id: 5,
    image: onbg5
  }
];

export default function OnboardingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nav = useNavigate();

  // 자동 슬라이드 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    }, 3000); // 3초마다 자동 전환

    return () => clearInterval(interval);
  }, []);

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < carouselData.length; i++) {
      const index = (currentIndex + i) % carouselData.length;
      cards.push({
        ...carouselData[index],
        position: i,
        isActive: i === 0
      });
    }
    return cards;
  };

  // 페이지네이션 점 계산 (3개 고정)
  const getPaginationIndex = () => {
    return currentIndex % 3;
  };

  return (
    <div>
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
          <Dot active={false} />
          <Dot active={false} />
          <Dot active={true} />
        </IndicatorWrapper>

        <Arrowleft
          src={arrowleft}
          alt="arrowleft"
          onClick={() => nav("/onboarding1")}
        />

        <CarouselContainer>
          <CarouselWrapper>
            {getVisibleCards().map((card) => (
              <CarouselCard key={card.id} position={card.position} isActive={card.isActive}>
                <CardImage src={card.image} alt="이벤트 이미지" />
              </CarouselCard>
            ))}
          </CarouselWrapper>
        </CarouselContainer>

        <BtnArea>
          <JoinBtn onClick={() => nav("/signup")}>회원가입</JoinBtn>
          <LoginBtn onClick={() => nav("/login")}>로그인</LoginBtn>
        </BtnArea>
      </Wrap>
    </div>
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
  transition: background 0.3s ease;
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

const CarouselContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselCard = styled.div`
  position: absolute;
  width: 200px;
  height: 280px;
  
  border-radius: 16px;
 
  overflow: hidden;
  transition: all 0.5s ease;
  transform: ${({ position, isActive }) => {
    if (isActive) return 'scale(1) translateX(0)';
    if (position === 1) return 'scale(0.8) translateX(120px)';
    if (position === 2) return 'scale(0.8) translateX(-120px)';
    return 'scale(0.6) translateX(0)';
  }};
  filter: ${({ isActive }) => isActive ? 'blur(0px)' : 'blur(2px)'};
  opacity: ${({ position }) => {
    if (position === 0) return 1;
    if (position === 1 || position === 2) return 0.7;
    return 0.3;
  }};
  z-index: ${({ isActive }) => isActive ? 3 : 2};
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
