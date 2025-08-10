// src/components/commons/Wrapper.jsx
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 430px; /* iPhone 14 기준: 393 ~ 430px 정도로 여유 */
  min-height: 100dvh; /* Safari 대응 위한 뷰포트 단위 */
  background: white;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  position: relative;

  /* 아이패드 대응: 양 옆 여백 */
  @media (min-width: 768px) {
    border-radius: 12px;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
  }
`;

export default function Wrapper({ children }) {
  return <Container>{children}</Container>;
}
