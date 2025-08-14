import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '@assets/logo/main/main-arrowleft.svg';
import BirdIcon from '@logo/bird.svg';
import SearchIcon from '@logo/search/searchicon.svg';
import SearchArrowRight from '@logo/search/search-arrowright.svg';

const Container = styled.div`
  height: 100vh;
  background: white;
  padding: 0;
  margin: 0;
  overflow: hidden; /* 스크롤 방지 */
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const SearchContainer = styled.div`
  flex: 1;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: none;
  border-radius: 20px;
  background: #f8f9fa;
  font-size: 16px;
  outline: none;
  
  &::placeholder {
    color: #999;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchIconImage = styled.img`
  width: 20px;
  height: 20px;
`;

const Content = styled.div`
  padding: 20px;
  padding-top: 80px; /* 헤더 높이만큼 상단 여백 추가 */
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const RecentSearches = styled.div`
  margin-bottom: 40px;
  flex: 1;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const DeleteAllButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  
  &:hover {
    color: #333;
  }
`;

const SearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SearchTerm = styled.span`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #999;
  }
`;

const RecommendationSection = styled.div`
  display: flex;
  align-items: flex-end;
  gap: -100px;
  padding: 20px;
  position: relative;
  border-radius: 16px;
  margin-bottom: 20px; /* 하단 여백 추가 */
  margin-top: auto; /* 상단 여백을 자동으로 설정하여 하단에 고정 */
  min-height: 400px; /* 높이를 늘려서 화면 밖으로 나간 새와 말풍선도 보이도록 */
`;

const BirdContainer = styled.div`
  position: absolute;
  left: 40px;
  bottom: -50px;
  z-index: 1;
`;

const BirdImage = styled.img`
  width: 125px;
  height: 250px;
  margin-left: -55px;
  margin-top: 150px;
`;

const RecommendationBubbles = styled.div`
  position: absolute;
  right: 120px;
  left: 100px;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 2;
`;

const Bubble = styled.div`
  padding: 8px 14px;
  border-radius: 15px;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
  min-width: 250px;
  
  ${({ variant }) => 
    variant === 'primary' 
      ? `
        background: white;
        border: 1px solid #e9ecef;
        color: #666;
      `
      : `
        background: white;
        border: 2px solid #FF6B35;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        
        &:hover {
          background: #fff5f2;
        }
      `
  }
`;

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
`;

// 더미 데이터
const recentSearches = [
  "성북 청년의 날 행사",
  "세계음식축제",
  "이마트24 서경대점",
  "수유리 우동집"
];

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searches, setSearches] = useState(recentSearches);

  const handleDeleteSearch = (index) => {
    setSearches(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteAll = () => {
    setSearches([]);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      // 검색 실행 로직
      console.log('검색:', searchTerm);
    }
  };

  const handleRecommendation = () => {
    // masill_bird 채팅방으로 이동
    navigate('/chat/7');
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon src={ArrowLeftIcon} alt="뒤로 가기" />
        </BackButton>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="가게 행사하는 치킨집"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
          <SearchIconWrapper>
            <SearchIconImage src={SearchIcon} alt="검색" />
          </SearchIconWrapper>
        </SearchContainer>
      </Header>

      <Content>
        <RecentSearches>
          <SectionHeader>
            <SectionTitle>최근 검색</SectionTitle>
            <DeleteAllButton onClick={handleDeleteAll}>
              전체 삭제
            </DeleteAllButton>
          </SectionHeader>
          
          {searches.map((search, index) => (
            <SearchItem key={index}>
              <SearchTerm>{search}</SearchTerm>
              <DeleteButton onClick={() => handleDeleteSearch(index)}>
                ✕
              </DeleteButton>
            </SearchItem>
          ))}
        </RecentSearches>

        <RecommendationSection>
          <BirdContainer>
            <BirdImage src={BirdIcon} alt="마실새" />
          </BirdContainer>
          <RecommendationBubbles>
            <Bubble variant="primary">
              masill_love님의 취향에 꼭 맞춘 마실코스를 추천해드릴까요?
            </Bubble>
            <Bubble variant="secondary" onClick={handleRecommendation}>
              masill_bird에게 추천받기
              <ArrowIcon src={SearchArrowRight} alt="화살표" />
            </Bubble>
          </RecommendationBubbles>
        </RecommendationSection>
      </Content>
    </Container>
  );
};

export default SearchPage;
