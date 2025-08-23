import React, { useEffect, useState } from "react";
import styled from "styled-components";

/**
 * 통합 PixelCanvas
 * - 데스크톱/모바일 모드별 스케일 방식 선택
 *
 * props
 *  - w, h: 기준 해상도 (기본 393x852)
 *  - desktopMode: "fixed" | "contain"
 *      fixed   : 데스크톱 1배 고정(창이 더 작으면 축소만)
 *      contain : 데스크톱도 화면 안에 맞춰 축소/확대(고정X)
 *  - mobileMode: "contain" | "cover"
 *      contain : 크롭 없음, 레터박스 가능
 *      cover   : 여백 없음, 일부 크롭
 *  - pad: 데스크톱 여백(픽셀) — fixed/contain 모두 스케일 계산에 반영
 *  - showFrame: 데스크톱에서 카드 프레임(라운드+그림자) 표시 여부
 *  - contentScrollable: 내부 스크롤 허용 여부 (메인처럼 컨텐츠 많은 화면)
 *  - bg: 바깥(Stage) 배경색 (레터박스 컬러)
 *  - canvasBg: 캔버스 내부 배경색
 */
export default function PixelCanvas({
  w = 393,
  h = 852,
  desktopMode = "fixed",
  mobileMode = "contain",
  pad = 24,
  showFrame = true,
  contentScrollable = false,
  bg = "#ffffff",
  canvasBg = "#ffffff",
  children,
}) {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw <= 768;
      setIsMobile(mobile);

      if (mobile) {
        const sContain = Math.min(vw / w, vh / h);
        const sCover = Math.max(vw / w, vh / h);
        setScale(mobileMode === "cover" ? sCover : sContain);
      } else {
        const ratioW = (vw - pad) / w;
        const ratioH = (vh - pad) / h;
        if (desktopMode === "fixed") {
          // 1배 넘지 않음(=고정). 창이 더 작으면 축소.
          setScale(Math.min(1, ratioW, ratioH));
        } else {
          // 화면 크기에 맞춰 축소/확대
          setScale(Math.min(ratioW, ratioH));
        }
      }
    };

    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [w, h, pad, desktopMode, mobileMode]);

  return (
    <Stage $bg={bg}>
      <Canvas
        $showFrame={showFrame && !isMobile && desktopMode === "fixed"}
        $canvasBg={canvasBg}
        style={{
          width: `${w}px`,
          height: `${h}px`,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <Inner $scroll={contentScrollable}>{children}</Inner>
      </Canvas>
    </Stage>
  );
}

const Stage = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: ${({ $bg }) => $bg};
  margin: auto;
`;

const Canvas = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  background: ${({ $canvasBg }) => $canvasBg};
  overflow: hidden;
  border-radius: ${({ $showFrame }) => ($showFrame ? "12px" : "0")};
  box-shadow: ${({ $showFrame }) =>
    $showFrame ? "0 10px 30px rgba(0,0,0,.12)" : "none"};
  margin: auto;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: ${({ $scroll }) => ($scroll ? "auto" : "hidden")};
  -webkit-overflow-scrolling: touch;
`;
