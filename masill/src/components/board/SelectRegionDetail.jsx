import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "@logo/bluearrowleft.svg";
import ArrowRight from "@logo/bluearrowright.svg";
import { getDistricts, getRegionId } from "../../api/userService";

const Container = styled.div`
  width: 100%;

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
  background: ${({ selected }) => (selected ? "#1B409C" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#222")};
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
    border-color: ${({ selected }) => (selected ? "#1B409C" : "#1B409C")};
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
  background: ${({ active }) => (active ? "#1B409C" : "#e1e5e9")};
`;

// 서울특별시의 구들 (2페이지로 나누기)
const seoulDistricts = [
  // 1페이지 (12개)
  "종로구",
  "중구",
  "용산구",
  "성동구",
  "광진구",
  "동대문구",
  "중랑구",
  "성북구",
  "강북구",
  "도봉구",
  "노원구",
  "은평구",
  // 2페이지 (12개 + 빈 버튼 1개)
  "서대문구",
  "마포구",
  "양천구",
  "강서구",
  "구로구",
  "금천구",
  "영등포구",
  "동작구",
  "관악구",
  "서초구",
  "강남구",
  "송파구",
  "강동구",
  "",
];

// 부산광역시의 구들
const busanDistricts = [
  "중구",
  "서구",
  "동구",
  "영도구",
  "부산진구",
  "동래구",
  "남구",
  "북구",
  "해운대구",
  "사하구",
  "금정구",
  "강서구",
  "연제구",
  "수영구",
  "사상구",
  "기장군",
];

// 지역별 구/군 데이터
const districtData = {
  서울특별시: seoulDistricts,
  부산광역시: busanDistricts,
  // 다른 지역들도 추가 가능
};

export default function SelectRegionDetail() {
  const nav = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRegion] = useState(
    localStorage.getItem("selectedRegion") || "서울특별시"
  );
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 구/군 목록 가져오기
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setLoading(true);
        const districtData = await getDistricts(selectedRegion);
        
        setDistricts(districtData);
      } catch (error) {
        console.error("구/군 데이터 가져오기 실패:", error);
        setError("구/군 정보를 불러오는데 실패했습니다.");
        // 에러 시 더미 데이터 사용
        setDistricts(districtData[selectedRegion] || seoulDistricts);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [selectedRegion]);
  // ✅ 한 페이지에 표시할 항목 개수 (원하는 만큼 조정 가능)
  const itemsPerPage = 20;

  // ✅ 총 페이지 수를 districts 길이에 따라 자동 계산
  const totalPages = Math.ceil(districts.length / itemsPerPage);

  // ✅ 현재 페이지의 아이템만 슬라이스
  const currentDistricts = districts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleDistrictSelect = async (district) => {

    setSelectedDistrict(district);

    // 선택된 구/군을 즉시 저장
    localStorage.setItem("selectedDistrict", district);
  

    try {
      // 지역 ID 조회
     
      const regionId = await getRegionId(selectedRegion, district);
      

      // 지역 ID도 저장
      localStorage.setItem("selectedRegionId", regionId);
   

      // 1초 후 자동으로 다음 페이지로 이동
      setTimeout(() => {

        console.log("선택된 구/군으로 이동:", district, "지역 ID:", regionId);

        // 수정 페이지에서 온 경우 해당 페이지로 돌아가기
        const editPageReturnUrl = localStorage.getItem("editPageReturnUrl");
        if (editPageReturnUrl) {
        
          nav(editPageReturnUrl);
        } else {
      
          nav("/board");
        }
      }, 500);
    } catch (error) {
      console.error("지역 ID 조회 실패:", error);
      // 지역 ID 조회 실패 시에도 다음 페이지로 이동 (기본값 사용)
      setTimeout(() => {
        console.log("지역 ID 조회 실패, 기본값으로 이동:", district);

        // 수정 페이지에서 온 경우 해당 페이지로 돌아가기
        const editPageReturnUrl = localStorage.getItem("editPageReturnUrl");
        if (editPageReturnUrl) {

          nav(editPageReturnUrl);
        } else {
        
          nav("/board");
        }
      }, 500);
    }
  };

  const handleNext = () => {
    if (selectedDistrict) {
      localStorage.setItem("selectedDistrict", selectedDistrict);

      // 수정 페이지에서 온 경우 해당 페이지로 돌아가기
      const editPageReturnUrl = localStorage.getItem("editPageReturnUrl");
      if (editPageReturnUrl) {
     
        nav(editPageReturnUrl);
      } else {
      
        nav("/board");
      }
    } else {
      alert("구/군을 선택해주세요.");
    }
  };

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
        <TitleText>지역 선택</TitleText>
      </TopBar>
      <ProgressBarWrap>
        <ProgressBar />
      </ProgressBarWrap>
      <ContentSection>
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            구/군 정보를 불러오는 중...
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
            {error}
          </div>
        ) : (
          <RegionGrid>
            {currentDistricts.map((district) => (
              <RegionButton
                key={district}
                selected={selectedDistrict === district}
                onClick={() => {
                  if (district && district.trim() !== "") {
            
                    handleDistrictSelect(district);
                  }
                }}
                style={{
                  visibility:
                    district && district.trim() !== "" ? "visible" : "hidden",
                }}
              >
                {district}
              </RegionButton>
            ))}
          </RegionGrid>
        )}

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
          {Array.from({ length: totalPages }).map((_, idx) => (
            <Dot key={idx} active={currentPage === idx} />
          ))}
        </PaginationDots>
      </ContentSection>
    </Container>
  );
}
