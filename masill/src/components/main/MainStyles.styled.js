import styled from "styled-components";

export const CategoryBarDiv = styled.div``;

export const BoardData = styled.div`
  display: flex; /* flex 사용 */
  flex-direction: row; /* 가로 방향 정렬 (기본값이라 생략 가능) */
  gap: 16px; /* 아이템 사이 간격 (선택) */
  align-items: center; /* 수직 정렬 (선택) */
`;
export const BoardImage = styled.img`
  width: 86px;
  height: 80px;
  flex-shrink: 0;
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

