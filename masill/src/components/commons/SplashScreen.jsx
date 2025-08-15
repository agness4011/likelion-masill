import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import MasilLogoIcon from '../../assets/masill-logo.svg';

const SplashContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%);
    pointer-events: none;
  }
`;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;
  opacity: 0;
  transform: scale(0.5);
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
`;

const LogoText = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: white;
  margin: 0;
  opacity: 0;
  transform: translateY(30px);
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  opacity: 0;
  transform: translateY(20px);
  text-align: center;
  line-height: 1.6;
  font-weight: 300;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 40px;
  opacity: 0;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  opacity: 0.6;
`;

const SplashScreen = ({ onComplete }) => {
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const dotsRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // 스플래시 완료 후 바로 온보딩으로 전환
        onComplete();
      }
    });

    // 초기 상태 설정
    gsap.set([logoRef.current, textRef.current, subtitleRef.current, dotsRef.current], {
      opacity: 0
    });

    // 로고 애니메이션 (더 자연스러운 바운스 효과)
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)"
    })
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .to(dotsRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

    // 로딩 점 애니메이션 (더 부드러운 효과)
    const dots = dotsRef.current?.children;
    if (dots) {
      gsap.to(dots, {
        scale: 1.3,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // 배경 그라데이션 애니메이션 (더 부드러운 전환)
    gsap.to(containerRef.current, {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      duration: 4,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });

    // 추가적인 시각적 효과
    gsap.to(logoRef.current, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });

  }, [onComplete]);

  return (
    <SplashContainer ref={containerRef}>
      <LogoContainer>
        <Logo ref={logoRef} src={MasilLogoIcon} alt="마실 로고" />
        <LogoText ref={textRef}>마실</LogoText>
        <Subtitle ref={subtitleRef}>
          당신의 일상에 마실을 더하세요
        </Subtitle>
        <LoadingDots ref={dotsRef}>
          <Dot />
          <Dot />
          <Dot />
        </LoadingDots>
      </LogoContainer>
    </SplashContainer>
  );
};

export default SplashScreen;
