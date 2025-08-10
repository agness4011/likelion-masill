// src/components/auth/AuthHeader.jsx
import React from "react";
import styled from "styled-components";

const TopBar = styled.div`
  position: relative;
  height: 44px;
  display: flex;
  align-items: center;
`;

const BackBtn = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  height: 44px;
  width: 44px;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const LogoWrap = styled.div`
  display: grid;
  place-items: center;
  padding: 8px 0 4px;
`;

const LogoImg = styled.img`
  width: 180px; /* 스샷 비율 감안 */
  height: auto;
  user-select: none;
`;

export default function AuthHeader({ onBack, logoSrc, logoAlt = "Logo" }) {
  return (
    <div>
      <TopBar>
        <BackBtn aria-label="뒤로가기" onClick={onBack}>
          {/* 심볼 화살표 (SVG) */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="#111"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BackBtn>
      </TopBar>

      <LogoWrap>{logoSrc && <LogoImg src={logoSrc} alt={logoAlt} />}</LogoWrap>
    </div>
  );
}
