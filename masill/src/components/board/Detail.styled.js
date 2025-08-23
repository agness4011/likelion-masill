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
  margin-right: 243px;
`;

export const PencilBtn = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

export const LowHeaderContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 20px 13px 10px 13px;
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
  font-family: Pretendard;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 36.4px */
  letter-spacing: 0.52px;
  margin: 0 0 5px 0;

  /* 길면 자동 줄바꿈 */
  word-break: break-word;
  white-space: normal;
  max-width: 270px;
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
  position: relative; /* ✅ CeoMark 기준 */
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

export const KeyboardInput = styled.input`
  display: flex;
  padding: 6.294px 7px 6.294px 23px;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  border-radius: 31.471px;
  background: #f4f7ff;
  text-align: center;
  /* 16 MID */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;
  border: none;

  color: black;
  ::placeholder {
    color: var(--Gray-900, #727c94);
  }
`;
export const KeyboardDiv = styled.div`
  display: flex;
  padding: 8px 16.785px;
  align-items: flex-start;
  gap: 10.49px;
  background: #fff;
`;
export const KeyboardBtn = styled.img`
  width: 40.78px;
  height: 40.78px;
  cursor: pointer;
`;
export const CommentUserImg = styled.img`
  width: 51px;
  height: 51px;
  flex-shrink: 0;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 24px;
`;
export const CommentUserName = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--Dark-Text, #060d1d);
  text-overflow: ellipsis;
  /* SUB BIG BOLD */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.28px;
`;
export const CommentContent = styled.p`
  display: -webkit-box;
  max-width: 254px;
  min-height: 30px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: var(--Dark-Text, #060d1d);
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 16.8px */
  margin: 0;
`;
export const CommentWriteTime = styled.span`
  color: var(--Gray-700, #959eb7);
  /* SUB MID */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 14.4px */
  letter-spacing: 0.12px;
`;
export const AdditionReply = styled.p`
  color: var(--Gray-700, #959eb7);
  /* SUB BOLD */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 14.4px */
  letter-spacing: 0.12px;
  cursor: pointer;
  margin: 0;
`;
export const ShowReply = styled.div`
  color: var(--Gray-700, #959eb7);
  /* SUB BOLD */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 14.4px */
  letter-spacing: 0.12px;
  margin: 0;
  margin-top: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  display: flex; /* 텍스트와 아이콘을 가로 배치 */
  align-items: center; /* 세로 중앙 정렬 */
`;
export const ReplyKeyboard = styled.input`
  display: flex;
  padding: 6.294px 7px 6.294px 23px;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  border-radius: 31.471px;
  background: #f4f7ff;
  text-align: center;
  /* 16 MID */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;
  border: none;

  color: black;
  ::placeholder {
    color: var(--Gray-900, #727c94);
  }
`;
export const ReplyKeyboardDiv = styled.div`
  display: flex;
  padding: 8px 16.785px;
  align-items: flex-start;
  gap: 5.49px;
  background: #fff;
  max-width: 330px;
`;
export const ReplyKeyboardBtn = styled.img`
  width: 20.78px;
  height: 20.78px;
  cursor: pointer;
`;
export const ModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalTitle = styled.p`
  color: var(--, #1b409c);
  /* SUB BIGEST */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;
`;
export const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%); /* 가운데 정렬 */
  width: 393px;
  height: 297px;
  border-radius: 18px 18px 0 0;
  background: var(--BG, #fbfcff);
  text-align: center;
  z-index: 20;
`;
export const BorderLine = styled.div`
  border-bottom: 1px solid var(--Gray-500, #c1cae0);
`;
export const ModalMain = styled.div`
  margin-top: 20px;
`;
export const ModalProfile = styled.img`
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;
export const ProfileP = styled.p`
  color: var(--Gray-900, #727c94);
  /* SUB MID */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 14.4px */
  letter-spacing: 0.12px;
`;
export const ProfileNickName = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--Dark-Text, #060d1d);
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%; /* 24.2px */
  letter-spacing: 0.44px;
  margin: 0px;
`;
export const Close = styled.button`
  display: flex;
  width: 168px;
  height: 50px;
  padding: 12px 18px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 18px;
  background: var(--Blur-gary-400, #cddbff);
  color: var(--Gray-900, #727c94);
  /* Button 01 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 25.2px */
  letter-spacing: 0.36px;
`;

export const GoChat = styled.button`
  display: flex;
  width: 168px;
  height: 50px;
  padding: 12px 18px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  border-radius: 18px;
  background: var(--Primary, #1b409c);
  color: #fff;

  /* Button 01 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 25.2px */
  letter-spacing: 0.36px;
`;
export const GoChatImg = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px; /* 버튼 사이 간격 */
  margin-top: 16px;
`;

export const GroupEventID = styled.p`
  overflow: hidden;
  color: var(--Gray-900, #727c94);
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 12px */
  letter-spacing: -0.1px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  margin: 0;
`;
export const GroupTitle = styled.p`
  overflow: hidden;
  color: var(--Dark-Text, #060d1d);
  text-overflow: ellipsis;
  white-space: nowrap;
  /* SUB BIGEST */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;

  display: -webkit-box;
  max-width: 160px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  margin: 0;
`;

export const MakeGroupBtn = styled.button`
  display: flex; /* 텍스트와 아이콘을 가로 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 필요하면 가운데 정렬 */
  width: fit-content;
  height: 34px;
  padding: 2px 12px 2px 13px;
  gap: 6px;
  flex-shrink: 0;
  border-radius: 24px;
  border: 1px solid var(--PrimaryColor, #1b409c);
  color: var(--Dark-Text, #060d1d);
  /* SUB BIG BOLD */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.28px;
  cursor: pointer;
  margin-left: 254px;
  margin-bottom: 8px;
`;

export const MakeGroupImg = styled.img`
  width: 18.417px;
  height: 17px;
  flex-shrink: 0;
`;

export const GroupHeart = styled.img`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  margin-left: 14px;
  cursor: pointer;
`;
export const GroupCommentImg = styled.img`
  display: flex;
  width: 15.583px;
  height: 15.583px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;
export const GroupCommentNum = styled.p`
  color: var(--Gray-900, #727c94);
  text-align: right;
  /* SUB Text 01 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 14.4px */
  letter-spacing: -0.12px;
  margin: 0;
`;
export const GroupUserImg = styled.img`
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 50%;
`;
export const GroupComponent = styled.div`
  display: flex; /* 메인이미지 왼쪽, 나머지 오른쪽 */
  gap: 12px;
  padding: 12px 0;
  cursor: pointer;
  margin: 0 24px;
`;

export const GroupMainImage = styled.img`
  width: 106px;
  height: 106px;
  flex-shrink: 0;
  border-radius: 6px;
  object-fit: cover;
`;

export const GroupRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1; /* 오른쪽 공간 꽉 채우기 */
`;

/* 상단: 유저 이미지 + (이벤트id/제목) + 하트 */
export const GroupTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 왼쪽: 유저+텍스트 / 오른쪽: 하트 */
`;

export const GroupUserAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GroupTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
export const GroupSummary = styled.p`
  margin-top: 6px;
  margin-bottom: 6px;
  display: -webkit-box;
  max-width: 225px;
  min-height: 30px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: var(--Gray-900, #727c94);
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

export const GroupBottomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px; /* 댓글 이미지와 숫자 간격 */
`;
export const LowWrapper = styled.div`
  margin-top: 10px;
`;
export const Wrapper = styled.div`
  position: relative;
  padding-bottom: 60px;
`;

export const CommentWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  width: 393px;
  flex-shrink: 0;
  min-height: 124px;
`;

export const CommentContentWrapper = styled.div`
  flex: 1;
`;

export const UserNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 20px;
`;

export const ReplyWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
  margin-left: 40px;
`;

export const FixedInputBox = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  padding: 8px 16px;
  border-top: 1px solid #ddd;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
export const CancelBtn = styled.button``;
