// src/pages/SignRegionPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "@components/auth/AuthContainer";
import styled from "styled-components";

const regions = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원특별자치도",
  "충청북도",
  "충청남도",
  "전북특별자치도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

const Wrap = styled.div`
  /* 393x852 캔버스 내부 레이아웃 (px 좌표계) */
  position: absolute;
  inset: 0;
  background: #fff;
  padding: 24px 20px 40px;
  display: grid;
  grid-template-rows: auto 1fr auto; /* 제목 / 리스트(스크롤) / 버튼 */
  gap: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
`;

const ScrollArea = styled.div`
  overflow-y: auto; /* 캔버스 내부에서만 스크롤 */
  -webkit-overflow-scrolling: touch;
  padding-top: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const RegionBtn = styled.button`
  padding: 12px;
  border: 1px solid ${({ $selected }) => ($selected ? "#333" : "#ccc")};
  border-radius: 24px;
  background: ${({ $selected }) => ($selected ? "#fafafa" : "#fff")};
  cursor: pointer;
  font-size: 14px;
  line-height: 1.2;
`;

const Controls = styled.div`
  display: grid;

  button {
    height: 50px;
    border-radius: 26px;
    font-weight: 800;
    font-size: 16px;
    border: 0;
    cursor: pointer;
    color: #1d1d1d;
    background: #ffeed0;
  }

  button[disabled] {
    background: #e6e6e6;
    color: #9a9a9a;
    cursor: not-allowed;
  }
`;

export default function SignRegionPage() {
  const nav = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <AuthContainer scroll={false}>
      <Wrap>
        <Title>지역 선택하기</Title>

        <ScrollArea>
          <Grid>
            {regions.map((r) => (
              <RegionBtn
                key={r}
                $selected={sel === r}
                onClick={() => setSel(r)}
              >
                {r}
              </RegionBtn>
            ))}
          </Grid>
        </ScrollArea>

        <Controls>
          <button disabled={!sel} onClick={() => nav("/signup/done")}>
            다음
          </button>
        </Controls>
      </Wrap>
    </AuthContainer>
  );
}
