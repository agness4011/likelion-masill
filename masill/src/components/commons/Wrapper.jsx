// src/components/commons/Wrapper.jsx

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 393px;
  height: 852px; /* Figma 기준 고정 높이 */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 자식은 스크롤 컨트롤러로 관리 */
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default function Wrapper({ children }) {
  return <Container>{children}</Container>;
}
