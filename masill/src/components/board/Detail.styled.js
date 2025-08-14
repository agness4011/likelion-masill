import styled from "styled-components";

export const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const LeftBtn = styled.img`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%) scaleX(-1);
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  cursor: pointer;
  z-index: 2;
`;

export const RightBtn = styled.img`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  cursor: pointer;
  z-index: 2;
`;

export const TopImg = styled.img`
  width: 393px;
  height: 410px;
  object-fit: cover;
  z-index: 1;
`;

export const PageIndicator = styled.div`
  position: absolute;
  bottom: 30px;
  right: 24px;
  z-index: 2;

  display: inline-flex;
  padding: 4px 6px;
  justify-content: center;
  align-items: center;
  gap: 7.317px;
  border-radius: 7.317px;
  border: 0.732px solid var(--Gray-900, #727c94);
  background: rgba(114, 124, 148, 0.8);
  color: var(--BG, #fbfcff);
  text-align: right;
  /* SUB BIG BOLD */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.28px;
`;

export const LowContainer = styled.div`
  position: relative;
  top: -20px; /* 살짝 겹치게 */
  border-radius: 18px 18px 0 0;
  background: var(--BG, #fbfcff);
  z-index: 1;
`;

export const BackBtn = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 13px;
`;

export const PencilBtn = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  margin-top: 20px;
`;

export const LowHeaderContainer = styled.div`
  display: flex;
  gap: 301px;
`;
export const HeartImg = styled.img`
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;
