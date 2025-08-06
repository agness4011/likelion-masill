import styled from "styled-components";

export default function Wrapper({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 430px; /* 모바일 기준 최대 너비 */
  background: white;
  overflow-y: auto;

  /* 모바일: 꽉 채움 */
  @media (max-width: 768px) {
    margin: 0 auto;
  }

  /* PC: 화면 중앙에 고정 */
  @media (min-width: 769px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
`;
