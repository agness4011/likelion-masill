// src/components/onboarding/OnboardingSlide.jsx

import React from "react";
import styled from "styled-components";

export default function OnboardingSlide({ image, title, subtitle }) {
  return (
    <Slide>
      <ImageWrapper>{image}</ImageWrapper>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Slide>
  );
}

// styled-components 정의

const Slide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  background: #eee;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #666;
`;
