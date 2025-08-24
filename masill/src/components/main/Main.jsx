import BackGround from "../../assets/logo/mainImg/highback.png";
import SearchGlass from "../../assets/logo/main/main-search.svg";
import Btn from "../../assets/logo/mainImg/rightbutton.svg";

import Comment from "../../assets/logo/mainImg/commant.png";
import Fullheart from "../../assets/logo/mainImg/fullheart.png";
import Heart from "../../assets/logo/mainImg/heart.png";
import Goheart from "../../assets/logo/mainImg/goheart.png";
import Recommand from "../../assets/logo/main/main-sort.svg";
import SetLocation from "../../assets/logo/main/main-location.svg";
import BirdIcon2 from "../../assets/logo/search/twobird.svg";
import OwnerHat from "../../assets/logo/main/owner-hat.svg";
import AdvertisingIcon from "../../assets/advertising.svg";

import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import "dayjs/locale/ko";
import {
  fetchAllBoards,
  eventTypeBoards,
  getMyRegionName,
  AiRecommend,
  TodayPost,
} from "../../api/boardApi";

import { privateAPI } from "../../api/axios";

import React, { useState, useRef, useEffect } from "react";
import {
  useNavigate,
  Link,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import {
  LocationDiv,
  LocationImg,
  LocationP,
  ToggleDiv,
  BoardDateP,
  BoardLocationP,
  BoardTitleH1,
  ToggleLoctionDiv,
  ToggleP,
  ToggleOpenDiv,
  BoardDiv,
  ImageContainer,
  OwnerHatOverlay,
} from "./MainStyles.styled";
import styled from "styled-components";

export default function Main({ children }) {
  return <MainContainer>{children}</MainContainer>;
}
const MainContainer = styled.div`
  overflow-x: hidden;
`;
// 배경 이미지
function HigherContainer({ children }) {
  return (
    <Container>
      <BackImg src={BackGround} alt="배경" />
      {children}
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  width: 100%;
`;
const BackImg = styled.img`
  position: absolute;
  top: -20px; /* 원하는 만큼 위로 올리기 (음수 값) */
  left: 0;
  width: 100%;
  z-index: -10; /* 배경으로 두기 */
`;
// 검색창
import { useSearchContext } from "./SearchContext";

// 카테고리 바
function CategoryBar({ children }) {
  const scrollRef = useRef();
  const [activeCategory, setActiveCategory] = useState("");
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const location = useLocation(); // 현재 경로 정보
  const currentCategory = location.pathname.replace("/main/", "");

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollLeftFn = () =>
    scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
  const scrollRightFn = () =>
    scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });

  return (
    <CategoryWrapper>
      {showLeft && <LeftBtn onClick={scrollLeftFn} src={MainArrowLeftIcon} />}
      <CategoryScroll ref={scrollRef}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            activeCategory: currentCategory, // 현재 경로 기준으로 전달
            setActiveCategory: () => {}, // 선택 상태는 경로로 관리하므로 빈 함수로 넘겨도 됨
          })
        )}
      </CategoryScroll>
      {showRight && <RightBtn onClick={scrollRightFn} src={Btn} />}
    </CategoryWrapper>
  );
}
// 카테고리 버튼
function CategoryItem({
  path,
  categoryTitle,
  activeCategory,
  setActiveCategory,
}) {
  const navigate = useNavigate();
  const isActive = activeCategory === path;

  const handleClick = () => {
    if (isActive) {
      // 이미 선택된 카테고리면 전체 목록(/main)으로 이동
      navigate("/main");
      setActiveCategory(""); // 선택 상태 초기화
    } else {
      navigate(`/main/${path}`);
      setActiveCategory(path);
    }
  };

  return (
    <CategoryBtn
      style={{
        background: isActive
          ? "linear-gradient(#fff, #fff) padding-box, linear-gradient(17deg, #1B409C 5.84%, #FF7852 68.23%) border-box"
          : "#e5ecff",
        border: isActive ? "1px solid transparent" : "1px solid transparent",
        color: isActive ? "#000" : "var(--Gray-900, #727C94)",
        boxSizing: "border-box",
      }}
      onClick={handleClick}
    >
      {categoryTitle}
    </CategoryBtn>
  );
}

function LowContent({ children }) {
  return <LowContainer>{children}</LowContainer>;
}
// 게시글 콘텐츠
function PostContent({ children }) {
  return <PostContainer>{children}</PostContainer>;
}
const PostContainer = styled.div``;
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.locale("ko");

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchTerm, setSearchTerm, setIsSearchActive } = useSearchContext();

  // 검색 실행
  const handleSearch = () => {
    setIsSearchActive(true);
    navigate("/search", { state: { searchQuery: searchTerm } });
  };

  // 입력창 클릭 시
  const handleInputClick = () => {
    setIsSearchActive(true);
    navigate("/search", { state: { searchQuery: searchTerm } });
  };

  // Enter 키
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <SearchWrapper>
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        onClick={handleInputClick}
        placeholder="가게 행사하는 치킨집"
        style={{ cursor: "pointer" }}
      />
      <SearchImg src={SearchGlass} onClick={handleSearch} alt="검색" />
    </SearchWrapper>
  );
}

function Post() {
  const location = useLocation();
  const { userData } = useUser();
  const navigate = useNavigate();
  const { isSearchActive, setIsSearchActive, searchTerm, setSearchTerm } =
    useSearchContext(); // context에서 searchTerm 가져오기

  const category =
    location.pathname === "/main"
      ? null
      : location.pathname.replace("/main/", "");

  const [sortType, setSortType] = useState(
    localStorage.getItem("sortType") || "날짜순"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [myRegion, setMyRegion] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const options = ["날짜순", "AI 추천순", "댓글순", "인기순"];
  const regionId = JSON.parse(localStorage.getItem("currentUser"))?.regionId;

  const SORT_MAP = {
    날짜순: "DATE",
    댓글순: "COMMENTS",
    인기순: "POPULARITY",
    "AI 추천순": null, // AI 추천은 별도 API
  };

  const CATEGORY_MAP = {
    market: "FLEA_MARKET",
    art: "CULTURE_ART",
    outdoor: "OUTDOOR_ACTIVITY",
    volunteer: "VOLUNTEER",
    festivity: "FESTIVAL",
    shop: "STORE_EVENT",
    education: "EDUCATION",
    etc: "ETC",
  };

  const handleSelect = async (type) => {
    setSortType(type);
    localStorage.setItem("sortType", type);
    setIsOpen(false);

    if (type === "AI 추천순") {
      try {
        const today = category === "event"; // 오늘의 이벤트 탭이면 true
        const eventType =
          category && category !== "event" ? CATEGORY_MAP[category] : null;

        const aiPosts = await AiRecommend({
          regionId,
          eventType,
          today,
          page: 1,
          size: 20,
        });

        const mapped = aiPosts.map((post) => ({
          ...post,
          isHeartClicked: post.liked ?? false,
          isBusinessVerified: post.businessVerified || false,
        }));
        setPosts(mapped);
      } catch (err) {
        console.error("AI 추천순 불러오기 실패:", err);
      }
      return;
    }

    try {
      let allPosts = [];

      if (category === "event") {
        const res = await TodayPost(regionId, 1, 100, SORT_MAP[type]);
        allPosts = res?.data?.content || [];
      } else if (!category) {
        const res = await fetchAllBoards(
          regionId,
          1,
          20,
          "desc",
          SORT_MAP[type]
        );
        allPosts = res?.data?.content || [];
      } else {
        const eventType = CATEGORY_MAP[category];
        const res = await eventTypeBoards(eventType, regionId, SORT_MAP[type]);
        allPosts = res?.data?.content || [];
      }

      const mapped = allPosts.map((post) => ({
        ...post,
        isHeartClicked: post.liked ?? false,
        isBusinessVerified: post.businessVerified || false,
      }));
      setPosts(mapped);
    } catch (err) {
      console.error("정렬된 게시물 불러오기 실패:", err);
    }
  };

  // 1️⃣ myRegion 단독 useEffect
  useEffect(() => {
    const fetchRegion = async () => {
      if (!myRegion) {
        try {
          const regionName = await getMyRegionName(regionId);
          setMyRegion(regionName);
        } catch (err) {
          console.error("지역 불러오기 실패:", err);
        }
      }
    };
    fetchRegion();
  }, [regionId, myRegion]);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (location.state?.reset) {
      setSearchResults(null);
      setIsSearchActive(false);
    }
  }, [location.state, setIsSearchActive, setSearchResults]);

  const handleRegionClick = () => {
    if (isSearchActive) {
      setSearchResults(null);
      setSearchTerm("");
      setIsSearchActive(false);
      navigate("/main", { replace: true });
    } else {
      navigate("/changeRegion");
    }
  };

  // ★ 검색어와 검색결과 처리
  useEffect(() => {
    if (location.state?.searchResults) {
      setSearchResults(location.state.searchResults);
      setSearchTerm(location.state.searchTerm || ""); // SearchBar에 검색어 반영
      setIsSearchActive(true);
    }
  }, [location.state, setSearchTerm, setIsSearchActive]);

  // 2️⃣ 게시물 불러오기 useEffect
  useEffect(() => {
    if (!isSearchActive) {
      const loadPosts = async () => {
        let allPosts = [];

        if (sortType === "AI 추천순") {
          const today = category === "event";
          const eventType =
            category && category !== "event" ? CATEGORY_MAP[category] : null;
          allPosts = await AiRecommend({
            regionId,
            eventType,
            today,
            page: 1,
            size: 20,
          });
        } else if (category === "event") {
          const res = await TodayPost(regionId, 1, 100, SORT_MAP[sortType]);
          allPosts = res?.data?.content || [];
        } else if (!category) {
          const res = await fetchAllBoards(
            regionId,
            1,
            20,
            "desc",
            SORT_MAP[sortType]
          );
          allPosts = res?.data?.content || [];
        } else {
          const eventType = CATEGORY_MAP[category];
          const res = await eventTypeBoards(
            eventType,
            regionId,
            SORT_MAP[sortType]
          );
          allPosts = res?.data?.content || [];
        }

        const mappedPosts = allPosts.map((post) => ({
          ...post,
          isHeartClicked: post.liked ?? false,
          isBusinessVerified: post.businessVerified || false,
        }));

        setPosts(mappedPosts);
      };

      loadPosts();
    }
  }, [category, regionId, sortType, isSearchActive]);

  // AI 채팅 추천 게시물 처리
  useEffect(() => {
    if (location.state?.aiPosts && !searchResults) {
      const aiMapped = location.state.aiPosts.map((post) => ({
        ...post,
        isHeartClicked: post.liked ?? false,
        isBusinessVerified: post.businessVerified || false,
      }));

      setSearchResults(aiMapped);

      // SearchBar input에 문구 반영
      const aiSearchTerm = "masill_bird PICK";
      setSearchTerm(aiSearchTerm);
      setIsSearchActive(true);

      // 상태 초기화 (페이지 새로고침 시 중복 적용 방지)
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, searchResults, setSearchTerm, setIsSearchActive]);

  const clickHeart = async (eventId) => {
    try {
      const res = await privateAPI.post(`/events/${eventId}/favorites`);
      const { favoriteCount, favorite } = res.data.data;

      const updatePosts = (prev) =>
        prev.map((post) =>
          post.eventId === eventId
            ? { ...post, isHeartClicked: favorite, favoriteCount }
            : post
        );

      setPosts(updatePosts);
      if (searchResults) setSearchResults(updatePosts);
    } catch (err) {
      console.error("clickHeart 에러:", err);
    }
  };

  const displayPosts =
    searchResults && searchResults.length > 0 ? searchResults : posts;

  // API에서 이미 정렬해주므로, 여기서는 그대로 사용
  const sortedPosts = displayPosts;

  return (
    <BoardContanier>
      {/* 상단 지역 + 정렬 */}
      <ToggleLoctionDiv>
        <LocationDiv onClick={handleRegionClick} style={{ marginTop: "10px" }}>
          <LocationImg src={SetLocation} />
          <LocationP>우리 마을 [ {myRegion} ]</LocationP>
        </LocationDiv>

        {!isSearchActive && (
          <div style={{ position: "relative", width: 220, marginTop: "10px" }}>
            <ToggleOpenDiv onClick={toggleOpen}>
              <p style={{ margin: 0 }}>{sortType}</p>
              <Recommandimg src={Recommand} alt="toggle icon" />
            </ToggleOpenDiv>

            {isOpen && (
              <ToggleDiv>
                {options.map((type) => (
                  <ToggleP key={type} onClick={() => handleSelect(type)}>
                    {type}
                  </ToggleP>
                ))}
              </ToggleDiv>
            )}
          </div>
        )}
      </ToggleLoctionDiv>

      {/* 검색 결과 없을 때 */}
      {searchResults &&
        searchResults.length === 0 &&
        isSearchActive &&
        searchTerm.trim() && (
          <NoSearchResultsHeader>
            <NoSearchResultsText>
              <UnderlinedSearchTerm>"{searchTerm}"</UnderlinedSearchTerm>에 대한
              검색결과가 없습니다.
            </NoSearchResultsText>
            <SubText>{myRegion}의 다른 행사는 어떠세요?</SubText>
          </NoSearchResultsHeader>
        )}

      {/* 게시글 리스트 */}
      <BoardDiv>
        {sortedPosts.length === 0 ? (
          <NoPostsMessage>여러분의 게시글을 공유해보세요</NoPostsMessage>
        ) : (
          sortedPosts.map((post) => (
            <PostCard key={post.eventId} post={post} clickHeart={clickHeart} />
          ))
        )}
      </BoardDiv>
    </BoardContanier>
  );
}

// 개별 게시글 카드
function PostCard({ post, clickHeart }) {
  const navigate = useNavigate();

  const now = dayjs();
  const eventEnd = dayjs(post.endAt);
  const diffDays = eventEnd.startOf("day").diff(now.startOf("day"), "day");
  const isClosingSoon = diffDays >= 0 && diffDays <= 3;
  const deadline = diffDays === 0 ? "오늘" : `D-${diffDays}`;

  return (
    <PostWrapper
      key={post.eventId}
      onClick={() => navigate(`/detail/${post.eventId}`)}
    >
      {post.isBusinessVerified && (
        <OwnerHatOverlay src={OwnerHat} alt="사업자 인증" />
      )}
      <div style={{ marginLeft: "24px" }}>
        <ImageScrollWrapper>
          {Array.isArray(post.images) &&
            post.images.map((img, idx) => (
              <ImageContainer key={idx}>
                <BoardImage src={img.imageUrl} alt={`${post.title}-${idx}`} />
              </ImageContainer>
            ))}
        </ImageScrollWrapper>

        <ContentWrapper>
          <LeftContent>
            <MemberLogo src={post.userImage} alt="회원로고" />
            <TextInfo>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <BoardTitleH1>{post.title}</BoardTitleH1>
                {post.up && <AdvertisingMark src={AdvertisingIcon} />}
              </div>

              {isClosingSoon && (
                <ClosingTag>{deadline} 기한이 임박해요!</ClosingTag>
              )}
              <BoardLocationP>
                {post.region?.sido} {post.region?.sigungu} {post.location}
              </BoardLocationP>
              <BoardDateP>
                {`${dayjs(post.startAt).format("YYYY.MM.DD.(dd)")} ~ ${dayjs(
                  post.endAt
                ).format("YYYY.MM.DD.(dd)")} ${dayjs(post.startAt).format(
                  "HH:mm"
                )}~${dayjs(post.endAt).format("HH:mm")}`}
              </BoardDateP>
            </TextInfo>
          </LeftContent>

          <RightContent>
            <HeartArea
              onClick={(e) => {
                e.stopPropagation();
                clickHeart(post.eventId);
              }}
            >
              <TextStyle>{post.favoriteCount}</TextStyle>
              <HeartImg
                src={post.isHeartClicked ? Fullheart : Heart}
                alt="하트"
              />
            </HeartArea>

            <CommentArea>
              <TextStyle>{post.commentCount}</TextStyle>
              <CommentImg src={Comment} alt="댓글" />
            </CommentArea>
          </RightContent>
        </ContentWrapper>
      </div>
    </PostWrapper>
  );
}

function MoveInterest() {
  return (
    <div>
      <Link to="/myhome/wishlist">
        <GoHeartImg src={Goheart} />
      </Link>
    </div>
  );
}
const AdvertisingMark = styled.img`
  width: 25px;
  height: 15px;
`;
// 스타일링
const NoPostsMessage = styled.p`
  text-align: center;
  margin: 50px 0;
  font-size: 16px;
  color: #727c94;
`;

const SearchResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

const SearchResultText = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const ClearSearchButton = styled.button`
  background: #f8f9fa;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e9ecef;
    color: #333;
  }
`;

const NoSearchResultsHeader = styled.div`
  text-align: center;
  padding: 20px 0;
  background-color: #f4f7ff;
  border-top: 0.8px solid #e0e0e0;
`;

const NoSearchResultsText = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const SubText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const UnderlinedSearchTerm = styled.span`
  border-bottom: 1px solid #333;
  font-weight: 600;
  padding-bottom: 1px;
  font-weight: bold;
`;

const BoardContanier = styled.div`
  width: 100%;
  height: 100vh; /* 최상위 컨테이너 전체 높이 */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 최상위 스크롤 제거 */
`;
const PostWrapper = styled.div`
  position: relative;
  padding: 0 0 8px 0;
  cursor: pointer;
  border-top: 0.5px solid var(--Gray-500, #c1cae0);
  &:hover {
    background-color: #fafafa;
  }
`;

const ClosingTag = styled.p`
  margin: 0 0 3px 0;

  display: -webkit-box;
  width: 247px;
  max-width: 247px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex-shrink: 0;
  overflow: hidden;
  color: var(--Allert, #e60624);
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 14.4px */
  letter-spacing: 0.12px;
`;

const ImageScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 4px;
  padding-bottom: 10px;
  margin-top: 20px;

  /* 스크롤바 스타일 (선택) */
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
  background: url(<path-to-image>);
  gap: 4px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 */
  align-items: center; /* 세로 중앙 */
  width: 100%;
  margin: 0;
  gap: 3px;
`;
const LeftContent = styled.div`
  display: flex;
  align-items: flex-start; /* 로고와 텍스트의 윗줄 맞춤 */
  gap: 7px;
  flex: 1;
  width: 284px;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;

  /* 보드타이틀 */
  ${BoardTitleH1} {
    margin: 0;
  }

  /* 위치와 날짜는 아래로 순서대로 */
  ${BoardLocationP} {
    margin: 0;
  }

  ${BoardDateP} {
    margin: 0;
  }
`;
const RightContent = styled.div`
  position: relative; /* 아이콘 고정 기준 */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding-top: 2px;
  min-height: 100%; /* 세로 위치 계산 위해 높이 유지 */
  right: 45px;
  bottom: 22px;
`;

const HeartArea = styled.div`
  position: absolute;
  top: 0; /* 제목과 같은 높이 */
  right: -10px;
  display: flex;
  align-items: center;
  padding-right: 28px; /* 아이콘 자리 확보 */
  cursor: pointer;
`;

const CommentArea = styled.div`
  position: absolute;
  top: 30px; /* 위치와 날짜 중간 지점 (수치 조절 가능) */
  right: -10px;
  display: flex;
  align-items: center;
  padding-right: 28px;
  cursor: pointer;
`;

const TextStyle = styled.p`
  color: var(--Gray-900, rgb(57, 62, 74));
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.12px;
  margin: 0;
  white-space: nowrap; /* 줄바꿈 방지 */
  opacity: 0.5;
`;

const HeartImg = styled.img`
  position: absolute;
  right: -2px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
`;

const CommentImg = styled.img`
  position: absolute;
  right: -2px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
`;

const MemberLogo = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 24px;
`;
const Recommandimg = styled.img`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-top: 2px;
`;
const GoHeartImg = styled.img`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  z-index: 200;
  position: fixed;
  right: 24px;
  bottom: 45px;
`;

const LowContainer = styled.div`
  border-radius: 18px 18px 0 0;
  background: #fff;
  margin-top: 10px;
`;
const CategoryBtn = styled.button`
  flex: 0 0 auto;
  border-radius: 10px;
  background: var(--Gray-300, #e5ecff);
  border: 1px solid transparent;
  cursor: pointer;
  color: var(--Gray-900, #727c94);
  /* 카테고리 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
  letter-spacing: -0.14px;

  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;
const CategoryWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const LeftBtn = styled.img`
  position: absolute;
  left: 24px;
  top: 65%;
  transform: translateY(-50%) scaleX(-1);
  cursor: pointer;
  width: 26px;
  height: 26px;
  z-index: 10;
  background: white; /* 배경을 넣어서 버튼이 안겹치게 */
  border-radius: 50%;
`;

const RightBtn = styled.img`
  position: absolute;
  right: 0;
  top: 65%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 26px;
  height: 26px;
  z-index: 10;
  background: white;
  border-radius: 50%;
  right: 24px;
`;
const CategoryScroll = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scroll-behavior: smooth;
  margin-left: 24px;
  margin-right: 24px;
  padding: 16px 0 0 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const SearchInput = styled.input`
  width: 345px;
  height: 42px;
  border-radius: 18px;
  margin-bottom: 10px;
  background: var(--BG, #fbfcff);
  border: none;
  outline: none;
  padding-left: 16px;
  font-weight: 600;
  color: var(--Dark-Text, #060d1d);

  /* SUB BIGEST */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.32px;
  ::placeholder {
    color: var(--Gray-700, #959eb7);
  }
`;
const SearchImg = styled.img`
  position: absolute;
  right: 35px;
  top: 21px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

// 컴포넌트 바인딩
Main.LowContent = LowContent;
Main.HigherContainer = HigherContainer;
Main.PostContent = PostContent;
Main.Post = Post;
Main.SearchBar = SearchBar;
Main.CategoryBar = CategoryBar;
Main.CategoryItem = CategoryItem;
Main.MoveInterest = MoveInterest;
