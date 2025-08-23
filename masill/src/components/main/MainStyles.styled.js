import styled from "styled-components";

export const CategoryBarDiv = styled.div``;

export const BoardData = styled.div`
  display: flex; /* flex 사용 */
  flex-direction: row; /* 가로 방향 정렬 (기본값이라 생략 가능) */
  gap: 16px; /* 아이템 사이 간격 (선택) */
  align-items: center; /* 수직 정렬 (선택) */
`;

export const MoveToInterest = styled.img`
  position: sticky;
  bottom: 20px;

  left: 400px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 9999;
`;

export const LocationDiv = styled.div`
  display: flex;
  gap: 2px;
  width: auto;
`;
export const LocationImg = styled.img`
  display: flex;
  width: 20px;
  height: 20px;
  padding: 0.354px 1.652px 0.355px 1.771px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 0;
  margin-top: -2px;
`;
export const LocationP = styled.p`
  color: var(--Dark-Text, #060d1d);
  /* 카테고리 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
  letter-spacing: -0.14px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: 25%; /* 3.5px */
  text-underline-position: from-font;

  margin: 0;

  white-space: pre;
`;
export const ToggleDiv = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateX(-30px); /* 오른쪽으로 10px 이동 */
  width: 109px;
  height: 130px;
  border-radius: 8px;
  border: 1px solid var(--Blur-gary-400, #cddbff);
  background: rgba(251, 252, 255, 0.85);
  backdrop-filter: blur(2px);
  flex-shrink: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 100;
  margin-top: 4px;
  text-align: center;
`;

export const BoardTitleH1 = styled.p`
  color: #000;

  /* 말줄임 설정 */
  overflow: hidden;
  white-space: nowrap; /* 한 줄로 표시 */
  text-overflow: ellipsis;

  /* Heading 02 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 25.2px */
  letter-spacing: 0.36px;

  margin: 0;
  width: 230px;
  max-width: 230px;
  margin-bottom: 6px;
`;
export const BoardLocationP = styled.p`
  overflow: hidden;
  white-space: nowrap; /* 한 줄 유지 */
  text-overflow: ellipsis;

  color: var(--Gray-900, #727c94);

  /* SUB Text 01 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 14.4px */
  letter-spacing: -0.12px;

  max-width: 247px; /* 적절히 조정 */
`;

export const BoardDateP = styled.p`
  color: #727c94;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.12px;

  flex-shrink: 0;
  width: 100%; /* 부모폭에 맞춤 */
  white-space: normal; /* 줄바꿈 허용 */
  overflow-wrap: break-word; /* 길면 줄바꿈 */
`;
export const ToggleLoctionDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 160px;
  cursor: pointer;
  margin-bottom: 12px;
  margin-left: 24px;
`;
export const ToggleP = styled.p`
  cursor: pointer;
  color: #666;

  /* 카테고리 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
  letter-spacing: -0.14px;
`;

export const ToggleOpenDiv = styled.div`
  cursor: pointer;
  display: flex;
  gap: 4px;
  width: 100px;

  color: var(--Dark-Text, #060d1d);
  /* 카테고리 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
  letter-spacing: -0.14px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: 25%; /* 3.5px */
  text-underline-position: from-font;
`;

export const BoardDiv = styled.div`
  flex: 1; /* 남은 공간을 모두 차지 */
  overflow-y: auto; /* 게시글만 세로 스크롤 가능 */

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const OwnerHatIcon = styled.img`
  width: 16px;
  height: 14px;
  margin-left: 4px;
  position: absolute;
  top: -2px;
  right: -60px;
`;

export const MemberLogoContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: inline-block;

  height: 100%;
  overflow: visible;
`;

export const OwnerHatOverlay = styled.img`
  position: absolute;
  top: 2px;
  left: 13px;
  width: 37px;
  height: 37px;
  z-index: 20;

  border-radius: 50%;
  padding: 4px;
`;
