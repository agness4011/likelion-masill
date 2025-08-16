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
export const CategoryMark = styled.p`
  display: flex;
  width: fit-content;
  padding: 5.854px;
  justify-content: center;
  align-items: center;
  gap: 1.463px;
  border-radius: 7.317px;
  border: 0.732px solid var(--Gray-900, #727c94);
  background: var(--White, #fff);
  color: var(--Gray-900, #727c94);
  font-family: Pretendard;
  font-size: 10.244px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 12.293px */
  letter-spacing: -0.102px;
  margin: 0;
`;
export const TitleP = styled.p`
  color: var(--Dark-Text, #060d1d);
  /* Heading 01-1 B */
  font-family: Pretendard;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 36.4px */
  letter-spacing: 0.52px;
  margin: 0 0 5px 0;
`;
export const LoccationP = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--Gray-900, #727c94);
  text-overflow: ellipsis;
  /* 카테고리 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
  letter-spacing: -0.14px;
  margin: 0 0 3px 0;
`;
export const DateP = styled.p`
  display: flex;
  width: fit-content;
  height: 13px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  color: #727c94;

  text-overflow: ellipsis;
  white-space: nowrap;
  /* 카테고리 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
  letter-spacing: -0.14px;
  margin: 0;
`;
export const BodyTopDiv = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  display: flex;
`;
export const FavoriteCountP = styled.p`
  color: var(--Gray-900, #727c94);
  /* Button 01 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 25.2px */
  letter-spacing: 0.36px;
`;
export const HeartImg = styled.img`
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;
export const UserImg = styled.img`
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 50%; /* 원형 */
  object-fit: cover; /* 이미지 비율 유지하면서 잘림 */
`;
export const UserNickName = styled.p`
  display: flex;
  width: fit-content;
  height: 27.721px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  color: var(--Dark-Text, #060d1d);
  text-overflow: ellipsis;
  white-space: nowrap;
  /* Heading 2nd 18pt */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 25.2px */
  letter-spacing: -0.36px;
`;
export const ChatBtn = styled.button`
  display: flex; /* 텍스트와 아이콘을 가로 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 필요하면 가운데 정렬 */
  border-radius: 19px;
  border: 1px solid var(--Gray-700, #959eb7);
  background: var(--Gray-100, #f4f7ff);
  color: var(--Gray-900, #727c94);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.28px;
  gap: 4px; /* 텍스트와 아이콘 사이 간격 */
  text-align: center;
  padding: 4px 12px; /* 버튼 안 여백 */
`;

export const ChatImg = styled.img`
  width: 18px;
  height: 18px;
  margin: 0; /* margin 제거 */
`;
export const UserDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 24px;
  height: 28px;
  margin-top: 20px;
  margin-bottom: 14px;
`;
export const TabContainer = styled.div`
  display: flex;
  border-radius: 12px;
  width: 345px;
  height: 66px;
  flex-shrink: 0;
  border-radius: 18px;
  background: var(--Gray-300, #e5ecff);
  margin-left: 24px;
`;

export const TabButton = styled.button`
  width: 115px;
  height: 66px;
  flex-shrink: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border: none;
  border-radius: 18px;
  background: ${({ active }) =>
    active ? "var(--Primary, #1B409C)" : "var(--Gray-300, #E5ECFF)"};
  color: ${({ active }) =>
    active ? "var(--BG, #FBFCFF)" : "var(--Gray-900, #727C94)"};
  cursor: pointer;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;

  &:hover {
    background: ${({ active }) =>
      active ? "var(--Primary, #1B409C)" : "var(--Gray-300, #E5ECFF)"};
  }
`;

export const SummaryBtn = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 34px;
  width: 125px; /* 버튼 너비 고정 */
  border: none;
  border-radius: 24px;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 500;

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 24px;
    background: ${({ summaryDone }) =>
      summaryDone
        ? "linear-gradient(17deg, #FF7852 5.84%, #1B409C 68.23%)"
        : "linear-gradient(17deg, #1B409C 5.84%, #FF7852 68.23%)"};
    z-index: -1;
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

export const SummaryImgSize = styled.img`
  width: 24px;
  height: 24px;
`;
export const DetailDiv = styled.div`
  margin-left: 24px;
  margin-top: 8px;
`;

export const SummaryIcon = styled.img`
  width: 24px;
  height: 24px;
`;
export const DetailPart = styled.div`
  width: 345px;
  min-height: 158px;
  flex-shrink: 0;
  border-radius: 18px;
  border: 1px solid var(--Gray-700, #959eb7);
  background: var(--Gray-100, #f4f7ff);
  margin-top: 8px;
  padding: 16px; /* 내부 여백 */
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto; /* 내용이 길면 스크롤 */
  box-sizing: border-box;
`;

export const DetailText = styled.div`
  color: var(--Dark-Text, #060d1d);
  text-align: justify;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;
  white-space: pre-wrap; /* 줄바꿈 유지 */
  word-break: break-word; /* 긴 단어 줄바꿈 */
`;
