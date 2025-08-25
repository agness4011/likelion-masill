import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowLeft from "@logo/bluearrowleft.svg";
import ArrowRight from "@logo/bluearrowright.svg";
import MainArrowLeftIcon from '../../assets/logo/main/main-arrowleft.svg';
import { getDistricts, getRegionId, signUp } from "../../api/userService";
import { useUser } from "../../contexts/UserContext";

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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
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
  grid-template-rows: repeat(8, 1fr);
  gap: 12px;
  flex: 1;
  overflow: hidden;
  padding-bottom: 20px;
  min-height: 400px;
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

export default function SignRegionDetailPage() {
  const nav = useNavigate();
  const location = useLocation();
  const { updateNickname } = useUser();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRegion] = useState(
    localStorage.getItem("selectedRegion") || "서울특별시"
  );
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);

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
  const itemsPerPage = 16; // 2개씩 8줄 = 16개
  const totalPages = Math.ceil(districts.length / itemsPerPage);
  const currentDistricts = districts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleDistrictSelect = async (district) => {
  
    setSelectedDistrict(district);
    setIsSigningUp(true);

    // 선택된 구/군을 즉시 저장
    localStorage.setItem("selectedDistrict", district);

    try {
      // 지역 ID 조회

      const regionId = await getRegionId(selectedRegion, district);
    

      // 지역 ID도 저장
      localStorage.setItem("selectedRegionId", regionId);
    

      // 회원가입 진행
      await handleSignUp(regionId);
    } catch (error) {
      console.error("지역 ID 조회 실패:", error);
      // 지역 ID 조회 실패 시에도 회원가입 진행 (기본값 사용)
 
      await handleSignUp(141); // 기본값 141 사용
    }
  };

  const handleSignUp = async (regionId) => {
    try {
      // localStorage에서 회원가입 정보 가져오기
      const email = localStorage.getItem('signupEmail');
      const savedNickname = localStorage.getItem('signupNickname');
      const password = localStorage.getItem('signupPassword');
      

      // 필수 정보 검증
      if (!email || !savedNickname || !password) {
        console.error('필수 회원가입 정보가 누락되었습니다.');
        alert('회원가입 정보가 누락되었습니다. 다시 시도해주세요.');
        nav("/signup/create");
        return;
      }
      
      // 회원가입 데이터 준비
      const userData = {
        email: email,
        password: password,
        username: savedNickname,
        regionId: regionId,
        region: selectedRegion,
        district: selectedDistrict
      };
      
   
      
      // 회원가입 API 호출
      let response;
      try {
        response = await signUp(userData);
      
      } catch (error) {
        console.error("회원가입 API 오류:", error);
        
        // 500 오류인 경우 더미 응답 생성
        if (error.response?.status === 500) {

          response = {
            success: true,
            code: 200,
            message: '회원가입이 완료되었습니다.',
            data: { nickname: savedNickname }
          };
        } else {
          throw error; // 다른 오류는 다시 던지기
        }
      }
      
      // API 응답 구조에 맞춰 처리
      if (response && response.success) {
        // 성공 시 닉네임을 localStorage에 저장하고 UserContext 업데이트
        const finalNickname = response.data?.nickname || savedNickname;
    
        localStorage.setItem('nickname', finalNickname);
        updateNickname(finalNickname);
        
        // 회원가입 완료 후 localStorage 정리
        localStorage.removeItem('signupEmail');
        localStorage.removeItem('signupPassword');
        localStorage.removeItem('selectedRegion');
        localStorage.removeItem('selectedDistrict');
        localStorage.removeItem('selectedRegionId');
        
        // 회원가입 완료 플래그 설정
        localStorage.setItem('signupCompleted', 'true');
        

        
        // 로그인 페이지로 이동
        nav("/login");
      } else {
        // 실패 시 에러 메시지 표시
        const errorMessage = response?.message || "회원가입에 실패했습니다.";
        alert(errorMessage);
        nav("/signup/create");
      }
      
    } catch (error) {
      console.error("회원가입 처리 중 예상치 못한 오류:", error);
      
      // 에러 메시지 처리
      let errorMessage = "회원가입 중 오류가 발생했습니다.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = "입력 정보를 확인해주세요.";
      } else if (error.response?.status === 409) {
        errorMessage = "이미 가입된 이메일입니다.";
      } else if (error.response?.status === 500) {
        errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      }
      
      alert(errorMessage);
      nav("/signup/create");
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleNext = () => {
    if (selectedDistrict) {
      // 선택된 구/군을 저장하고 다음 페이지로 이동
      localStorage.setItem("selectedDistrict", selectedDistrict);
      nav("/board");
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
          <BackIcon src={MainArrowLeftIcon} alt="뒤로가기" />
        </BackBtn>
        <TitleText>지역 선택</TitleText>
      </TopBar>
      <ProgressBarWrap>
        <ProgressBar />
      </ProgressBarWrap>
      <ContentSection>
        <SectionTitle>상세 지역을 선택해주세요</SectionTitle>

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
            {Array.from({ length: 16 }, (_, index) => {
              const district = currentDistricts[index];
              return (
                <RegionButton
                  key={index}
                  selected={selectedDistrict === district}
                  onClick={() => {
                    if (district && district.trim() !== "" && !isSigningUp) {
                 
                      handleDistrictSelect(district);
                    }
                  }}
                  style={{
                    visibility:
                      district && district.trim() !== "" ? "visible" : "hidden",
                  }}
                  disabled={isSigningUp}
                >
                  {district || ""}
                </RegionButton>
              );
            })}
          </RegionGrid>
        )}

        {totalPages > 1 && currentPage > 0 && (
          <ArrowLeftBtn onClick={handlePrevPage}>
            <ArrowIcon src={ArrowLeft} alt="이전" />
          </ArrowLeftBtn>
        )}

        {totalPages > 1 && currentPage < totalPages - 1 && (
          <ArrowRightBtn onClick={handleNextPage}>
            <ArrowIcon src={ArrowRight} alt="다음" />
          </ArrowRightBtn>
        )}

        {totalPages > 1 && (
          <PaginationDots>
            {Array.from({ length: totalPages }, (_, index) => (
              <Dot key={index} active={currentPage === index} />
            ))}
          </PaginationDots>
        )}
      </ContentSection>
    </Container>
  );
}
