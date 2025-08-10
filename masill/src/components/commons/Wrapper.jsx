import React from "react";
import styled from "styled-components";

const Container = styled.div`
  /* 카드 기준 사이즈 */
  --w: 393px;
  --h: 852px;

  /* 화면에서 허용하는 최대 스케일 계산 */
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: transparent;

  & > .canvas {
    width: var(--w);
    height: var(--h);
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: #fff;
    overflow-y: auto;
    /* 데스크톱: 뷰포트에 맞게 축소/확대 */
    transform: scale(
      min(calc((100vw - 24px) / var(--w)), calc((100vh - 24px) / var(--h)))
    );
    transform-origin: center;
  }

  /* 모바일(≤430px)은 축소/확대 없이 가로 꽉 채우기 */
  @media (max-width: 430px) {
    position: static;
    display: block;
    & > .canvas {
      transform: none;
      width: 100vw;
      height: calc(100vw * (852 / 393));
      border-radius: 0;
      box-shadow: none;
    }
  }
`;

export default function Wrapper({ children }) {
  return (
    <Container>
      <div className="canvas">{children}</div>
    </Container>
  );
}
