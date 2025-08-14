// src/pages/SignRegionPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getRegions } from "../../api/userService";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #fff;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const TopBar = styled.div`
  width: 100%;
  padding: 0 0 0 8px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
`;

const BackBtn = styled.button`
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #222;
  cursor: pointer;
`;

const TitleText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #222;
`;

const ProgressBarWrap = styled.div`
  width: 100%;
  height: 6px;
  background: #f4f7ff;
  margin-bottom: 24px;
  flex-shrink: 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #4e7aea 0%, #c1cae0 100%);
  border-radius: 3px;
  transition: width 0.3s;
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;
`;

const SectionTitle = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: #222;
  width: 90%;
  max-width: 340px;
  margin-bottom: 24px;
  text-align: left;
  flex-shrink: 0;
`;

const RegionGrid = styled.div`
  width: 90%;
  max-width: 340px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  flex: 1;
  overflow: hidden;
  padding-bottom: 20px;
`;

const RegionButton = styled.button`
  height: 48px;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  background: ${({ selected }) => (selected ? '#1B409C' : '#fff')};
  color: ${({ selected }) => (selected ? '#fff' : '#222')};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 12px;

  &:hover {
    border-color: ${({ selected }) => (selected ? '#1B409C' : '#1B409C')};
  }
`;





export default function SignRegionPage() {
  const nav = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 지역 목록 가져오기
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setLoading(true);
        const regionData = await getRegions();
        console.log('가져온 지역 데이터:', regionData);
        setRegions(regionData);
      } catch (error) {
        console.error('지역 데이터 가져오기 실패:', error);
        setError('지역 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    // 지역 선택 시 바로 다음 페이지로 이동
    localStorage.setItem('selectedRegion', region);
    nav("/signup/region-detail");
  };

  return (
    <Container>
      <TopBar>
        <BackBtn onClick={() => nav(-1)} aria-label="뒤로가기">
          &#8592;
        </BackBtn>
        <TitleText>회원가입</TitleText>
      </TopBar>
      <ProgressBarWrap>
        <ProgressBar />
      </ProgressBarWrap>
      <ContentSection>
        <SectionTitle>지역 선택</SectionTitle>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            지역 정보를 불러오는 중...
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
            {error}
          </div>
        ) : (
          <RegionGrid>
            {regions.map((region) => (
              <RegionButton
                key={region}
                selected={selectedRegion === region}
                onClick={() => handleRegionSelect(region)}
              >
                {region}
              </RegionButton>
            ))}
          </RegionGrid>
        )}
      </ContentSection>
    </Container>
  );
}
