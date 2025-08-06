import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '@components/auth/AuthContainer';
import styled from 'styled-components';

const regions = [
  '서울특별시','부산광역시','대구광역시','인천광역시','광주광역시',
  '대전광역시','울산광역시','세종특별자치시','경기도','강원특별자치도',
  '충청북도','충청남도','전북특별자치도','전라남도','경상북도',
  '경상남도','제주특별자치도'
];

const Grid = styled.div`
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
  margin:24px 0;
`;
const RegionBtn = styled.button`
  padding:12px;
  border:1px solid ${({ selected }) => (selected ? '#333' : '#ccc')};
  border-radius:24px;
  background:${({ selected }) => (selected ? '#fafafa' : '#fff')};
  cursor:pointer;
`;

export default function SignRegionPage() {
  const nav = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <AuthContainer>
      <div>
        <h2>지역 선택하기</h2>
        <Grid>
          {regions.map(r=>(
            <RegionBtn
              key={r}
              selected={sel===r}
              onClick={()=>setSel(r)}
            >
              {r}
            </RegionBtn>
          ))}
        </Grid>
      </div>
      <button disabled={!sel} onClick={()=>nav('/signup/done')}>다음</button>
    </AuthContainer>
  );
}
