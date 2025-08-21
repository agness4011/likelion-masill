import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowLeftIcon from "@assets/logo/main/main-arrowleft.svg";
import BirdIcon from "@logo/bird.svg";
import BirdIcon2 from "@logo/search/twobird.svg";
import SearchIcon from "@logo/search/searchicon.svg";
import SearchArrowRight from "@logo/search/search-arrowright.svg";
import { fetchAllBoards, fetchAllBoardsForSearch } from "../../api/boardApi";
import dayjs from "dayjs";
import Fullheart from "@logo/mainImg/fullheart.png";
import Heart from "@logo/mainImg/Heart.png";
import Comment from "@logo/mainImg/commant.png";
import SetLocation from "@logo/mainImg/set.png";
import Recommand from "@logo/mainImg/recommand.png";
import Goheart from "@logo/mainImg/goheart.png";

const Container = styled.div`
  height: 100%;
  background: white;
  padding: 0;
  margin: 0;
  overflow-y: scroll; /* 스크롤 방지 */
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

  outline: none;

  width: 313px;
  height: 42px;
  flex-shrink: 0;

  border-radius: 18px;
  background: var(--BG, #fbfcff);
  /* 박스 이너셰도 */
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4) inset;

  &::placeholder {
    color: #999;
  }

  color: var(--Gray-700, #959eb7);
  /* SUB BIGEST */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;
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
  background: var(--Gray-100, #f4f7ff);
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

  color: var(--Gray-900, #727c94);
  /* SUB BOLD */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 14.4px */
  letter-spacing: 0.12px;
`;

const DeleteAllButton = styled.button`
  background: none;
  border: none;
  color: var(--Gray-700, #959eb7);
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    color: var(--Gray-700, #959eb7);
  }

  /* SUB MID */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 14.4px */
  letter-spacing: 0.12px;
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
  /* 16 MID */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;
  color: var(--Gray-900, #727c94);
`;

const DeleteButton = styled.button`
  background: #c1cae0;
  border: none;
  color: var(--Gray-100, #f4f7ff);
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  border-radius: 50%;

  &:hover {
    background: #a3aabd;
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
  left: 34px;
  bottom: -50px;
  z-index: 1;
`;

const RecommendationBirdImage = styled.img`
  width: 125px;
  height: 250px;
  margin-left: -55px;
  margin-top: 150px;
`;

const RecommendationBubbles = styled.div`
  position: absolute;
  right: 120px;
  left: 85px;
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
    variant === "primary"
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
      `}
`;

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const SearchResultsContainer = styled.div`
  margin-top: 20px;
  flex: 1;
  overflow-y: auto;
`;

const SearchKeywordDisplay = styled.div`
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #666;
  border-left: 4px solid #007aff;
`;

const SearchKeywordText = styled.span`
  font-weight: bold;
  color: #007bff;
`;

const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  gap: 120px; /* 텍스트와 새 아이콘 간의 간격을 60px로 설정 */
`;

const NoResultsMessage = styled.div`
  margin-bottom: 40px;
  line-height: 1.5;
`;

const BirdsContainer = styled.div`
  position: relative;
  width: 200px;
  height: 150px;
  margin-bottom: 40px;
`;

const NoResultsBirdImage = styled.img`
  width: 140px;
  height: 140px;
  position: absolute;
  margin-left: -50px;
  margin-top: -40px;


  
  opacity: 0.8;
`;

// 메인화면과 동일한 게시글 스타일
const PostWrapper = styled.div`
  padding: 0 0 20px 0;
  border-bottom: 1px solid #ddd;
  margin-top: 13px;
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
  }
  width: 380px;
`;

const ImageScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
`;

const BoardImage = styled.img`
  width: 140px;
  height: 140px;
  flex-shrink: 0;
  border-radius: 6px;
  gap: 4px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 12px;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
`;

const MemberLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
`;

const TextInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const BoardTitleH1 = styled.h1`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BoardLocationP = styled.p`
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #666;
`;

const BoardDateP = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
`;

const HeartArea = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const CommentArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TextStyle = styled.span`
  font-size: 12px;
  color: #666;
`;

const HeartImg = styled.img`
  width: 24px;
  height: 24px;
`;

const CommentImg = styled.img`
  width: 20px;
  height: 20px;
`;

const NoResults = styled.p`
  color: var(--Dark-Text, #060d1d);
  margin-top: -20px;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;

const NoResultsText = styled.p`
  color: var(--Dark-Text, #060d1d);
  /* 16 MID */
  font-family: Pretendard;
  margin-top: -10px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0.12px;
`;

// 하트 블로팅 버튼 스타일 (메인화면과 동일)
const GoHeartImg = styled.img`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  z-index: 200;
  position: fixed;
  right: 24px;
  bottom: 45px;
`;

// 더미 데이터 제거
// const recentSearches = [
//   "성북 청년의 날 행사",
//   "세계음식축제",
//   "이마트24 서경대점",
//   "수유리 우동집"
// ];

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searches, setSearches] = useState([]); // 빈 배열로 시작
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allPosts, setAllPosts] = useState([]); // 실제 API 데이터

  // localStorage에서 검색 기록 불러오기
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      try {
        setSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error("검색 기록 불러오기 실패:", error);
        setSearches([]);
      }
    }
  }, []);

  // API에서 모든 게시글 데이터 가져오기
  useEffect(() => {
    const loadAllPosts = async () => {
      try {
        // 사용자의 현재 지역 ID 가져오기
        const currentRegionId = localStorage.getItem("selectedRegionId");
        console.log("현재 지역 ID:", currentRegionId);

        // 현재 지역의 게시글을 더 많이 가져오기 (size를 100으로 증가)
        const res = await fetchAllBoards(currentRegionId, 1, 100);
        const posts = res?.data?.content || [];
        console.log("로드된 게시글 데이터:", posts);
        console.log("게시글 개수:", posts.length);

        // 각 게시글의 구조 확인
        if (posts.length > 0) {
          console.log("첫 번째 게시글 구조:", posts[0]);
        }

        setAllPosts(posts);
      } catch (error) {
        console.error("게시글 데이터 로드 실패:", error);
        setAllPosts([]);
      }
    };

    loadAllPosts();
  }, []);

  // 검색 기록을 localStorage에 저장하는 함수
  const saveSearchesToStorage = (newSearches) => {
    try {
      localStorage.setItem("recentSearches", JSON.stringify(newSearches));
    } catch (error) {
      console.error("검색 기록 저장 실패:", error);
    }
  };

  // MainPage에서 전달받은 검색어 처리
  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchTerm(location.state.searchQuery);
    }
  }, [location.state]);

  // 검색 함수
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      // If query is empty, still navigate to main to clear previous search
      navigate("/main", {
        state: {
          searchResults: [],
          searchTerm: "",
        },
      });
      return;
    }

    setIsSearching(true);

    console.log("검색 시작:", query);
    console.log("검색할 데이터:", allPosts);
    console.log("데이터 개수:", allPosts.length);

    // 실제 API 데이터에서 검색
    const searchQuery = query.toLowerCase();
    const results = allPosts.filter((post) => {
      const title = (post.title || "").toLowerCase();
      const location = (post.location || "").toLowerCase();
      const detailLocation = (post.detailLocation || "").toLowerCase();
      const content = (post.content || "").toLowerCase();

      const titleMatch = title.includes(searchQuery);
      const locationMatch = location.includes(searchQuery);
      const detailLocationMatch = detailLocation.includes(searchQuery);
      const contentMatch = content.includes(searchQuery);

      const isMatch =
        titleMatch || locationMatch || detailLocationMatch || contentMatch;

      if (isMatch) {
        console.log("매칭된 게시글:", {
          title: post.title,
          location: post.location,
          detailLocation: post.detailLocation,
          content: post.content?.substring(0, 50) + "...",
        });
      }

      return isMatch;
    });

    console.log("검색 결과 개수:", results.length);
    console.log("검색 결과:", results);

    setSearchResults(results);
    setIsSearching(false);

    // 검색어를 최근 검색에 추가
    if (query.trim()) {
      setSearches((prev) => {
        const newSearches = [
          query.trim(),
          ...prev.filter((search) => search !== query.trim()),
        ];
        const finalSearches = newSearches.slice(0, 10);
        saveSearchesToStorage(finalSearches);
        return finalSearches;
      });
    }

    // 검색 결과가 있으면 바로 메인화면으로 이동
    if (results.length > 0) {
      navigate("/main", {
        state: {
          searchResults: results,
          searchTerm: query,
        },
      });
    } else {
      // 검색 결과가 없어도 메인화면으로 이동 (빈 결과 표시)
      navigate("/main", {
        state: {
          searchResults: [],
          searchTerm: query,
        },
      });
    }
  };

  const handleDeleteSearch = (index) => {
    const newSearches = searches.filter((_, i) => i !== index);
    setSearches(newSearches);
    saveSearchesToStorage(newSearches);
  };

  const handleDeleteAll = () => {
    setSearches([]);
    saveSearchesToStorage([]);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      performSearch(searchTerm);
    }
  };

  const handleSearchIconClick = () => {
    if (searchTerm.trim()) {
      performSearch(searchTerm);
    }
  };

  const handleRecommendation = () => {
    navigate("/chat/7");
  };

  const handleResultClick = (eventId) => {
    navigate(`/detail/${eventId}`);
  };

  const handleHeartClick = () => {
    navigate("/myhome/wishlist");
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
            <SearchIconImage
              src={SearchIcon}
              alt="검색"
              onClick={handleSearchIconClick}
              style={{ cursor: "pointer" }}
            />
          </SearchIconWrapper>
        </SearchContainer>
      </Header>

      <Content>
        {isSearching ? (
          <div
            style={{ textAlign: "center", padding: "40px 20px", color: "#666" }}
          >
            검색 중...
          </div>
        ) : (
          <>
            {/* 최근 검색 섹션 */}
            <RecentSearches>
              <SectionHeader>
                <SectionTitle>최근 검색</SectionTitle>
                <DeleteAllButton onClick={handleDeleteAll}>
                  전체 삭제
                </DeleteAllButton>
              </SectionHeader>

              {searches.map((search, index) => (
                <SearchItem key={index}>
                  <SearchTerm
                    onClick={() => {
                      setSearchTerm(search);
                      // 최근 검색어 클릭 시 바로 검색 실행
                      const searchQuery = search.toLowerCase();
                      const results = allPosts.filter((post) => {
                        const title = (post.title || "").toLowerCase();
                        const location = (post.location || "").toLowerCase();
                        const detailLocation = (
                          post.detailLocation || ""
                        ).toLowerCase();
                        const content = (post.content || "").toLowerCase();

                        return (
                          title.includes(searchQuery) ||
                          location.includes(searchQuery) ||
                          detailLocation.includes(searchQuery) ||
                          content.includes(searchQuery)
                        );
                      });

                      if (results.length > 0) {
                        navigate("/main", {
                          state: {
                            searchResults: results,
                            searchTerm: search,
                          },
                        });
                      } else {
                        navigate("/main", {
                          state: {
                            searchResults: [],
                            searchTerm: search,
                          },
                        });
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {search}
                  </SearchTerm>
                  <DeleteButton onClick={() => handleDeleteSearch(index)}>
                    ✕
                  </DeleteButton>
                </SearchItem>
              ))}
            </RecentSearches>

            {/* 검색 결과 섹션 */}
            {searchResults.length > 0 && (
              <SearchResultsContainer>
                <SearchKeywordDisplay>
                  <SearchKeywordText>"{searchTerm}"</SearchKeywordText> 검색
                  결과 {searchResults.length}개
                </SearchKeywordDisplay>

                {searchResults.map((result) => (
                  <PostWrapper
                    key={result.eventId}
                    onClick={() => handleResultClick(result.eventId)}
                  >
                    <ImageScrollWrapper>
                      {Array.isArray(result.images) &&
                        result.images.map((img, idx) => (
                          <BoardImage
                            key={idx}
                            src={img.imageUrl}
                            alt={`${result.title}-${idx}`}
                          />
                        ))}
                    </ImageScrollWrapper>

                    <ContentWrapper>
                      <LeftContent>
                        <MemberLogo src={result.userImage} alt="회원로고" />
                        <TextInfo>
                          <BoardTitleH1>{result.title}</BoardTitleH1>
                          <BoardLocationP>{result.location}</BoardLocationP>
                          <BoardDateP>
                            {`${dayjs(result.startAt).format(
                              "YYYY.MM.DD.(dd)"
                            )} ~ ${dayjs(result.endAt).format(
                              "YYYY.MM.DD.(dd)"
                            )} ${dayjs(result.startAt).format("HH:mm")}~${dayjs(
                              result.endAt
                            ).format("HH:mm")}`}
                          </BoardDateP>
                        </TextInfo>
                      </LeftContent>

                      <RightContent>
                        <HeartArea
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <TextStyle>{result.favoriteCount}</TextStyle>
                          <HeartImg
                            src={result.isHeartClicked ? Fullheart : Heart}
                            alt="하트"
                          />
                        </HeartArea>

                        <CommentArea>
                          <TextStyle>{result.commentCount}</TextStyle>
                          <CommentImg src={Comment} alt="댓글" />
                        </CommentArea>
                      </RightContent>
                    </ContentWrapper>
                  </PostWrapper>
                ))}
              </SearchResultsContainer>
            )}

            {/* 검색 결과가 없을 때 메시지 */}
            {searchTerm.trim() &&
              searchResults.length === 0 &&
              !isSearching && (
                <>
                  <NoResultsContainer>
                    <NoResultsMessage>
                      <NoResults>{searchTerm}</NoResults>
                      <NoResultsText>에 대한 검색결과가 없습니다.</NoResultsText>
                    </NoResultsMessage>
                    <BirdsContainer>
                      <NoResultsBirdImage src={BirdIcon2} alt="새" />
                    
                    </BirdsContainer>
                  </NoResultsContainer>
                  {/* 하트 블로팅 버튼 (메인화면과 동일한 위치) */}
                  <GoHeartImg 
                    src={Goheart} 
                    alt="하트 블로팅" 
                    onClick={handleHeartClick}
                    style={{ cursor: "pointer" }}
                  />
                </>
              )}

            {/* 추천 섹션 */}
            {!searchTerm.trim() && (
              <RecommendationSection>
                <BirdContainer>
                  <RecommendationBirdImage src={BirdIcon} alt="마실새" />
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
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default SearchPage;
