import styled from "styled-components";

export default function Wrapper({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  min-width: 360px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
`;
