import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "@logo/bluearrowleft.svg";
import ArrowRight from "@logo/bluearrowright.svg";

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
  position: relative;
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

const ArrowLeftBtn = styled.button`
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const ArrowRightBtn = styled.button`
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const ArrowIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const PaginationDots = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 20px;
  flex-shrink: 0;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#1B409C' : '#e1e5e9')};
`;

// 서울특별시의 구들 (2페이지로 나누기)
const seoulDistricts = [
  // 1페이지 (12개)
  "종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구",
  // 2페이지 (12개 + 빈 버튼 1개)
  "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구", ""
];

// 부산광역시의 구들
const busanDistricts = [
  "중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구",
  "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"
];

// 지역별 구/군 데이터
const districtData = {
  "서울특별시": seoulDistricts,
  "부산광역시": busanDistricts,
  // 다른 지역들도 추가 가능
};

export default function SignRegionDetailPage() {
  const nav = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRegion] = useState(localStorage.getItem('selectedRegion') || "서울특별시");

  const districts = districtData[selectedRegion] || seoulDistricts;
  const itemsPerPage = Math.ceil(districts.length / 2); // 2페이지로 정확히 나누기
  const totalPages = 2; // 고정 2페이지
  const currentDistricts = districts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
  };

  const handleNext = () => {
    if (selectedDistrict) {
      // 선택된 구/군을 저장하고 회원가입 완료 페이지로 이동
      localStorage.setItem('selectedDistrict', selectedDistrict);
      nav("/signup/complete");
    }
  };

  // 구/군 선택 시 자동으로 다음 페이지로 이동
  useEffect(() => {
    if (selectedDistrict) {
      const timer = setTimeout(() => {
        handleNext();
      }, 500); // 0.5초 후 자동 이동
      
      return () => clearTimeout(timer);
    }
  }, [selectedDistrict]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
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
        
        <RegionGrid>
          {currentDistricts.map((district) => (
            <RegionButton
              key={district}
              selected={selectedDistrict === district}
              onClick={() => district && handleDistrictSelect(district)}
              style={{ visibility: district ? 'visible' : 'hidden' }}
            >
              {district}
            </RegionButton>
          ))}
        </RegionGrid>

        {currentPage > 0 && (
          <ArrowLeftBtn onClick={handlePrevPage}>
            <ArrowIcon src={ArrowLeft} alt="이전" />
          </ArrowLeftBtn>
        )}

        {currentPage < totalPages - 1 && (
          <ArrowRightBtn onClick={handleNextPage}>
            <ArrowIcon src={ArrowRight} alt="다음" />
          </ArrowRightBtn>
        )}

        <PaginationDots>
          <Dot active={currentPage === 0} />
          <Dot active={currentPage === 1} />
        </PaginationDots>
      </ContentSection>
    </Container>
  );
}
