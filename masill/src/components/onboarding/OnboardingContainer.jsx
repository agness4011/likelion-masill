import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  flex: 1; /*부모(wrapper)높이의 100% 사용*/
  max-width: 393px;
  height: 852px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 20px;
`;

export default function OnboardingContainer({ children }) {
  return <Container>{children}</Container>;
}
