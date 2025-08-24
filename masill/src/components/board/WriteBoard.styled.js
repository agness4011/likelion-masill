import styled from "styled-components";

export const BackBtn = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  cursor: pointer;
`;
export const HeadTitle = styled.h2`
  color: var(--Dark-Text, #060d1d);
  /* Heading 02 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 25.2px */
  letter-spacing: 0.36px;
`;
export const HeadBoardImg = styled.img`
  width: 24px;
  height: 24px;
  padding: 0.6px 0.226px 0.6px 0.4px;
  margin-right: 15px; /* 오른쪽 여백 */
`;
export const HeadDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 393px;
  background: var(--White, #fff);
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  height: 110px;
  padding: 10px 24px 16.768px 24px; /* 오른쪽에 24px 여백 */
  gap: 16.768px;
  flex-shrink: 0;
`;
export const Formdiv = styled.div`
  background: var(--BG, #fbfcff);
`;
export const UploadContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  margin-left: 24px;
`;

export const UploadLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 140px;
  height: 140px;
  flex-shrink: 0;
`;

export const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 6px;
  color: var(--Gray-900, #727c94);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  width: 140px;
  height: 140px;
  border: 1px solid var(--Gray-700, #959eb7);
  background: var(--Gray-200, #ecf1ff);
  text-align: center;
`;

export const UploadImgIcon = styled.img`
  width: 40px;
  height: 40px;
`;
export const UploadImgNum = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== "hasImage",
})`
  color: ${({ hasImage }) =>
    hasImage ? "var(--Primary, #1B409C)" : "var(--Gray-900, #727c94)"};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0.28px;

  margin: 0; /* 기본 마진 제거 */
  margin-top: 1px; /* 원하는 간격만 설정 */
`;
export const UploadInput = styled.input`
  display: none;
`;
export const TotalImgNum = styled.p`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0.28px;

  margin: 0; /* 기본 마진 제거 */
  margin-top: 1px; /* 원하는 간격만 설정 */
  color: var(--Gray-900, #727c94);
`;
export const PreviewRight = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 8px;
  padding-bottom: 4px;
  max-width: calc(100% - 160px); /* 왼쪽 업로드 버튼 제외한 영역 */
`;

export const PreviewBox = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  flex-shrink: 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
`;

export const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.18);
  color: white;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  font-size: 14px;
  cursor: pointer;
  z-index: 2;

  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  padding: 0; /* 불필요한 패딩 제거 */
  line-height: 1; /* 줄 높이 줄임 */
`;

export const RepresentativeTag = styled.span`
  position: absolute;
  bottom: 8px;
  right: 7px;
  z-index: 2;

  display: inline-flex;
  padding: 4px 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 0.5px solid var(--BG, #fbfcff);
  background: #005ff9;
  backdrop-filter: blur(0px);

  color: var(--White, #fff);
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 12px */
  letter-spacing: 0.1px;
`;

// 스타일 컴포넌트들
export const Wrapper = styled.div`
  width: 100%;
`;
export const CategoryArea = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  justify-content: center;
`;

export const LeftBtn = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  transform: scaleX(-1);
  margin-left: 8px;
`;

export const RightBtn = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 8px;
`;

export const Categories = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-left: 24px;
  padding-right: 24px;
  flex: 1; /* 남은 공간 다 차지 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryBtn = styled.button.attrs({ type: "button" })`
  position: relative;
  display: flex;
  overflow: visible; /* 테두리 잘림 방지 */
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  white-space: nowrap;
  cursor: pointer;
  background: ${({ $isSelected }) =>
    $isSelected ? "#fff" : "var(--Gray-300, #e5ecff)"};
  border: none;
  z-index: 1; /* 버튼이 가상 요소보다 위에 오도록 */

  ${({ $isSelected }) =>
    $isSelected &&
    `
    background-clip: padding-box;

    &::before {
      content: '';
      position: absolute;
      inset: 0; /* 버튼 크기와 동일하게 맞춤 */
      border-radius: 10px; /* 버튼과 동일한 radius */
      padding: 2px; /* 테두리 두께 */
      background: linear-gradient(17deg, #1B409C 5.84%, #FF7852 68.23%);
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      z-index: -1; /* 버튼 아래에 위치 */
    }
  `}
`;

export const TextStyle = styled.p`
  color: var(--Dark-Text, #060d1d);
  /* 16 MID */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;

  margin-bottom: 8px;
`;

export const InputStyle = styled.input`
  width: 340px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 18px;
  border: 1px solid var(--Gray-700, #959eb7);
  background: var(--Gray-100, #f4f7ff);

  /* 오른쪽 padding 추가 (아이콘 넓이 + 여백) */
  padding-right: 40px;

  /* 입력된 글자 색상 */
  color: #000000; /* 검은색 */

  /* placeholder 색상 */
  &::placeholder {
    color: var(--Gray-700, #959eb7);
  }

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;

  padding-left: 15px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const MapImg = styled.img`
  position: absolute;
  right: 10px; /* 오른쪽 여백 */
  top: 50%;
  transform: translateY(-50%); /* 세로 중앙 정렬 */
  width: 24px;
  height: 24px;
  z-index: 10;
  cursor: pointer;
`;

export const TimeInput = styled.div`
  width: 147px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 18px;
  border: 1px solid var(--Gray-700, #959eb7);
  background: var(--Gray-100, #f4f7ff);
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--Gray-700, #959eb7);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.36px;

  /* margin-left 제거 */
`;

export const DetailDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column; /* 세로 쌓기 */
  align-items: flex-start; /* 자식들을 왼쪽 정렬 */
  max-width: 345px;
  margin: 0 auto;
`;

export const TextArea = styled.textarea`
  width: 345px;
  height: 180px;
  flex-shrink: 0;
  border-radius: 18px;
  border: 1px solid var(--Gray-700, #959eb7);
  background: var(--Gray-100, #f4f7ff);

  /* placeholder 색상 */
  &::placeholder {
    color: var(--Gray-700, #959eb7);
  }

  /* 입력 글자 색상 */
  color: #000000;

  resize: vertical;
  padding: 8px 12px; /* 좀 더 편한 패딩 */

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;
`;

export const CharCount = styled.div`
  position: absolute;
  bottom: 8px;
  right: 25px;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 14.4px */
  letter-spacing: -0.12px;
  color: var(--Gray-700, #959eb7);
`;

export const SubmitBtn = styled.button`
  display: flex;
  flex-direction: row;
  height: 50px;
  padding: 12px 140px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 18px;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: 0.36px;
  white-space: nowrap;
  word-break: keep-all;
  writing-mode: horizontal-tb;

  background-color: ${({ disabled }) =>
    disabled ? "var(--Gray-500, #c1cae0)" : "var(--Primary, #1B409C)"};
  color: ${({ disabled }) =>
    disabled ? "var(--Gray-900, #727c94)" : "#ffffff"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  margin: 10px auto 20px; /* 좌우 auto, 아래쪽 20px */
`;

export const ErrorMessage = styled.p`
  margin-top: 4px;
  color: var(--Allert, #ff443e);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 15.4px */
  letter-spacing: 0.22px;
  margin-left: 24px;
`;
export const ErrorDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 5px;
  text-align: center;
`;
export const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

export const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
};
export const ReigonInput = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 18px;
  border: 1px solid var(--Gray-700, #959eb7);
  background: var(--Gray-100, #f4f7ff);
  height: 42px;
  width: fit-content;
  padding: 0 15px 0 15px;
`;
export const CancleBtn = styled.img`
  width: 18px;
  height: 18px;
`;
// export const Div = styled.div`
//   display: flex;
//   flex-direction: column; /* 세로 쌓기 */
//   align-items: flex-start; /* 자식들을 왼쪽 정렬 */
//   gap: 8px;
//   max-width: 345px;
//   margin: 0 auto; /* Div 자체는 부모 가운데 */
// `;
export const Div = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  /* 좌우 여백 */
  max-width: 345px; /* 최대 폭 지정 */
  margin: 0 auto; /* 화면 가운데 정렬 */
`;

export const Row = styled.div`
  display: flex;
  gap: 43px;
  flex-wrap: wrap; /* 화면 좁을 때 아래로 내려가기 */
`;
export const DateDiv = styled.div`
  display: flex;
  flex-direction: column; /* 글자 + 입력창 세로 배치 */
  align-items: flex-start; /* TextStyle 왼쪽 정렬 */
`;
