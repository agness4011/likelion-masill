import React from "react";
import styled from "styled-components";

/**
 * 로그인/회원가입 컨테이너
 * RootLayout의 PixelCanvas 안에서만 스타일 적용
 */
export default function AuthContainer({ children, scroll = false }) {
  return <AuthWrap $scroll={scroll}>{children}</AuthWrap>;
}

const AuthWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: ${({ $scroll }) => ($scroll ? "auto" : "hidden")};
  background: #ffffff;
`;
