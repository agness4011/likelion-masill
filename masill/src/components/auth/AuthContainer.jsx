import React from "react";
import PixelCanvas from "@/components/commons/PixelCanvas";

/**
 * 로그인/회원가입 컨테이너
 * - 데스크톱: 393x852 고정(창이 작을 때만 축소)
 * - 모바일: contain(크롭 없음, 비율 유지)
 * - 스크롤: 기본 없음(필요하면 contentScrollable=true)
 * - 배경: 흰색 캔버스
 */
export default function AuthContainer({
  children,
  width = 393,
  height = 852,
  scroll = false, // 필요시 true로 바꿔 사용
}) {
  return (
    <PixelCanvas
      w={width}
      h={height}
      desktopMode="fixed"
      mobileMode="contain"
      showFrame={true} // 온보딩처럼 카드 프레임
      contentScrollable={scroll}
      bg="#ffffff" // 레터박스(바깥) 배경
      canvasBg="#ffffff" // 캔버스 내부 배경(로그인엔 흰색이 어울림)
    >
      {children}
    </PixelCanvas>
  );
}
