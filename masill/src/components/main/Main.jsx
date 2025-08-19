import BackGround from "../../assets/logo/mainImg/highback.png";
import SearchGlass from "../../assets/logo/mainImg/glass.png";
import Btn from "../../assets/logo/mainImg/button.png";

import Comment from "../../assets/logo/mainImg/commant.png";
import Fullheart from "../../assets/logo/mainImg/fullheart.png";
import Heart from "../../assets/logo/mainImg/Heart.png";
import Goheart from "../../assets/logo/mainImg/goheart.png";
import Recommand from "../../assets/logo/mainImg/recommand.png";
import SetLocation from "../../assets/logo/mainImg/set.png";

import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import "dayjs/locale/ko";
import {
  fetchAllBoards,
  eventTypeBoards,
  getMyRegionName,
} from "../../api/boardApi";

import { privateAPI } from "../../api/axios";

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
} from "./MainStyles.styled";
import styled from "styled-components";

export default function Main({ children }) {
  return <MainContainer>{children}</MainContainer>;
}
const MainContainer = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
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

// 검색창
function SearchBar() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = () => {
    // 검색 페이지로 이동하면서 검색어 전달
    navigate("/search", { state: { searchQuery: text } });
  };

  const handleInputClick = () => {
    // 입력창 클릭 시에도 검색 페이지로 이동
    navigate("/search", { state: { searchQuery: text } });
  };

  const handleKeyPress = (e) => {
    // 엔터키 입력 시 검색 페이지로 이동
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        onClick={handleInputClick}
        placeholder="가게 행사하는.. 차리점..."
        readOnly
      />
      <SearchImg
        src={SearchGlass}
        alt="서치버튼"
        onClick={handleSearchClick}
        style={{ cursor: "pointer" }}
      />
    </SearchWrapper>
  );
}

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
      {showLeft && <LeftBtn onClick={scrollLeftFn} src={Btn} />}
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
        border: isActive ? "2px solid transparent" : "none",
        color: isActive ? "#000" : "var(--Gray-900, #727C94)",
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

// 게시글 목록
function Post() {
  const location = useLocation();
  const category =
    location.pathname === "/main"
      ? null
      : location.pathname.replace("/main/", "");

  const [sortType, setSortType] = useState("AI 추천순");
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [myRegion, setMyRegion] = useState("");

  const [searchResults, setSearchResults] = useState(null); // 검색 결과 상태 추가
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [isSearchActive, setIsSearchActive] = useState(false); // 검색 활성화 상태 추가

  const regionId = JSON.parse(localStorage.getItem("currentUser"))?.regionId;
  console.log("currentUser///////////", localStorage.getItem("currentUser"));
  console.log("regionId//////////////////////////", regionId);
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

  // 검색 결과가 전달되었는지 확인
  useEffect(() => {
    if (location.state?.searchResults) {
      setSearchResults(location.state.searchResults);
      setSearchTerm(location.state.searchTerm || "");
      setIsSearchActive(true); // 검색 활성화
    } else {
      setSearchResults(null);
      setSearchTerm("");
      setIsSearchActive(false); // 검색 비활성화
    }

    // 게시글 작성 완료 후 새로고침 신호는 더 이상 사용하지 않음
    // window.location.reload()를 사용하여 페이지 전체를 새로고침
  }, [location.state]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const regionName = await getMyRegionName(regionId);
        setMyRegion(regionName);

        let content = [];
        const today = dayjs().startOf("day");
        const endOfToday = dayjs().endOf("day");

        if (!category) {
          // 전체 게시글 + 종료일 필터
          const res = await fetchAllBoards(regionId); // regionId 쿼리 포함
          const allPosts = res?.data?.content || [];

          content = allPosts.filter((post) =>
            dayjs(post.endAt).endOf("day").isSameOrAfter(today)
          );
        } else if (category === "event") {
          // 오늘 포함 이벤트
          const res = await fetchAllBoards(regionId);
          const allPosts = res?.data?.content || [];

          content = allPosts.filter((post) => {
            const start = dayjs(post.startAt).startOf("day");
            const end = dayjs(post.endAt).endOf("day");

            return start.isSameOrBefore(endOfToday) && end.isSameOrAfter(today);
          });
        } else {
          // 특정 카테고리 + 종료일 필터
          const eventType = CATEGORY_MAP[category];
          const res = await eventTypeBoards(eventType, regionId);
          const allPosts = res?.data?.content || [];

          content = allPosts.filter((post) =>
            dayjs(post.endAt).endOf("day").isSameOrAfter(today)
          );
        }

        // ✅ 서버에서 내려주는 favorite 값 반영
        setPosts(
          content.map((post) => ({
            ...post,
            isHeartClicked: post.liked ?? false, // liked 값 반영
          }))
        );
      } catch (err) {
        console.error("게시물 불러오기 실패", err);
      }
    };

    // 검색 결과가 없을 때만 게시글을 로드
    if (!searchResults) {
      loadPosts();
    }
  }, [category, regionId, searchResults]);

  // 검색 결과가 있으면 검색 결과를, 없으면 일반 게시글을 표시
  const displayPosts = searchResults || posts;

  // 디버깅용 로그
  console.log("검색 결과:", searchResults);
  console.log("일반 게시글:", posts);
  console.log("표시할 게시글:", displayPosts);

  // 정렬
  const sortedPosts = [...displayPosts].sort((a, b) => {
    if (sortType === "AI 추천순") return a.eventId - b.eventId;
    if (sortType === "댓글순") return b.commentCount - a.commentCount;
    if (sortType === "인기순") return b.favoriteCount - a.favoriteCount;
    if (sortType === "날짜순")
      return dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf();
    return 0;
  });

  const navigate = useNavigate();
  const options = ["AI 추천순", "댓글순", "인기순", "날짜순"];

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const handleSelect = (type) => {
    setSortType(type);
    setIsOpen(false);
  };

  // 지역 정보 클릭 시 검색 초기화 또는 지역 변경
  const handleRegionClick = () => {
    if (isSearchActive) {
      // 검색이 활성화된 상태면 검색 초기화
      setSearchResults(null);
      setSearchTerm("");
      setIsSearchActive(false);
      // 검색 초기화 후 원래 메인화면으로 이동
      navigate("/main", { replace: true });
    } else {
      // 검색이 비활성화된 상태면 지역 변경 페이지로 이동
      navigate("/changeRegion");
    }
  };

  // Heart 클릭 함수
  const clickHeart = async (eventId) => {
    try {
      const res = await privateAPI.post(`/events/${eventId}/favorites`);
      const { favoriteCount, favorite } = res.data.data;

      // posts 상태 업데이트
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.eventId === eventId
            ? {
                ...post,
                isHeartClicked: favorite, // 서버 값 반영
                favoriteCount: favoriteCount,
              }
            : post
        )
      );

      // 검색 결과가 있을 때도 업데이트
      if (searchResults) {
        setSearchResults((prevResults) =>
          prevResults.map((post) =>
            post.eventId === eventId
              ? {
                  ...post,
                  isHeartClicked: favorite,
                  favoriteCount: favoriteCount,
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error("clickHeart 에러:", error);
    }
  };

  return (
    <BoardContanier>
      <ToggleLoctionDiv>
        <LocationDiv onClick={handleRegionClick}>
          <LocationImg src={SetLocation} />
          <LocationP>우리 마을 {myRegion}</LocationP>
        </LocationDiv>

        <div style={{ position: "relative", width: 220 }}>
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
      </ToggleLoctionDiv>

      {/* 검색 결과 표시 */}
      {searchResults && (
        <SearchResultHeader>
          <SearchResultText>
            "{searchTerm}" 검색 결과 {searchResults.length}개
          </SearchResultText>
          <ClearSearchButton
            onClick={() => {
              setSearchResults(null);
              setSearchTerm("");
              setIsSearchActive(false); // 검색 활성화 상태 비활성화
              // 검색 초기화 후 원래 메인화면으로 이동
              navigate("/main", { replace: true });
            }}
          >
            검색 초기화
          </ClearSearchButton>
        </SearchResultHeader>
      )}

      <BoardDiv>
        {sortedPosts.length === 0 ? (
          <NoPostsMessage>
            {searchTerm.trim()
              ? `${searchTerm}에 대한 검색결과가 없습니다.`
              : "여러분의 게시글을 공유해보세요"}
          </NoPostsMessage>
        ) : (
          sortedPosts.map((item) => {
            const now = dayjs();
            const eventEnd = dayjs(item.endAt);

            const diffDays = eventEnd
              .startOf("day")
              .diff(now.startOf("day"), "day");
            const isClosingSoon = diffDays >= 0 && diffDays <= 3;

            let deadline = "";
            if (diffDays === 0) {
              deadline = "오늘";
            } else {
              deadline = `D-${diffDays}`;
            }

            return (
              <PostWrapper
                key={item.eventId}
                onClick={() => navigate(`/detail/${item.eventId}`)}
              >
                <ImageScrollWrapper>
                  {Array.isArray(item.images) &&
                    item.images.map((img, idx) => (
                      <BoardImage
                        key={idx}
                        src={img.imageUrl}
                        alt={`${item.title}-${idx}`}
                      />
                    ))}
                </ImageScrollWrapper>

                {isClosingSoon && (
                  <ClosingTag>🔥 {deadline} 마감 임박!</ClosingTag>
                )}

                <ContentWrapper>
                  <LeftContent>
                    <MemberLogo src={item.userImage} alt="회원로고" />
                    <TextInfo>
                      <BoardTitleH1>{item.title}</BoardTitleH1>
                      <BoardLocationP>
                        {item.region?.sido} {item.region?.sigungu}{" "}
                        {item.location}
                      </BoardLocationP>
                      <BoardDateP>
                        {`${dayjs(item.startAt).format(
                          "YYYY.MM.DD.(dd)"
                        )} ~ ${dayjs(item.endAt).format(
                          "YYYY.MM.DD.(dd)"
                        )} ${dayjs(item.startAt).format("HH:mm")}~${dayjs(
                          item.endAt
                        ).format("HH:mm")}`}
                      </BoardDateP>
                    </TextInfo>
                  </LeftContent>

                  <RightContent>
                    <HeartArea
                      onClick={(e) => {
                        e.stopPropagation();
                        clickHeart(item.eventId); // 상태 업데이트는 clickHeart 안에서 처리
                      }}
                    >
                      <TextStyle>{item.favoriteCount}</TextStyle>
                      <HeartImg
                        src={item.isHeartClicked ? Fullheart : Heart}
                        alt="하트"
                        style={{ width: "24px", height: "24px" }}
                      />
                    </HeartArea>

                    <CommentArea>
                      <TextStyle>{item.commentCount}</TextStyle>
                      <CommentImg src={Comment} alt="댓글" />
                    </CommentArea>
                  </RightContent>
                </ContentWrapper>
              </PostWrapper>
            );
          })
        )}
      </BoardDiv>
    </BoardContanier>
  );
}

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

function MoveInterest() {
  return (
    <div>
      <Link to="/myhome/wishlist">
        <GoHeartImg src={Goheart} />
      </Link>
    </div>
  );
}

const BoardContanier = styled.div`
  margin-left: 24px;
`;
const PostWrapper = styled.div`
  padding: 0 0 8px 0;
  margin-top: 13px;
  cursor: pointer;
  border-top: 2px solid var(--Gray-500, #c1cae0);
  &:hover {
    background-color: #fafafa;
  }
  width: 380px;
`;

const ClosingTag = styled.p`
  overflow: hidden;
  color: var(--Allert, #ff443e);
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 14.4px */
  letter-spacing: 0.12px;
  margin-bottom: 6px;
`;

const ImageScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding-bottom: 4px;
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
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 11px;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: flex-start; /* 로고와 텍스트의 윗줄 맞춤 */
  gap: 7px;
  flex: 1;
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
    margin: 2px 0 0;
  }

  ${BoardDateP} {
    margin: 2px 0 0;
  }
`;
const RightContent = styled.div`
  position: relative; /* 아이콘 고정 기준 */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding-top: 2px;
  padding-bottom: 2px;
  right: 50px;
  min-height: 100%; /* 세로 위치 계산 위해 높이 유지 */
`;

const HeartArea = styled.div`
  position: absolute;
  top: 0; /* 제목과 같은 높이 */
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 28px; /* 아이콘 자리 확보 */
  cursor: pointer;
`;

const CommentArea = styled.div`
  position: absolute;
  top: 30px; /* 위치와 날짜 중간 지점 (수치 조절 가능) */
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 28px;
  cursor: pointer;
`;

const TextStyle = styled.p`
  color: var(--Gray-900, #727c94);
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.12px;
  margin: 0;
  white-space: nowrap; /* 줄바꿈 방지 */
`;

const HeartImg = styled.img`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
`;

const CommentImg = styled.img`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
`;

const MemberLogo = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 24px;
`;
const Recommandimg = styled.img`
  width: 17px;
  height: 17px;
  flex-shrink: 0;
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
  border: none;
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
`;
const CategoryWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const LeftBtn = styled.img`
  position: absolute;
  left: 0;
  top: 50%;
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
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 26px;
  height: 26px;
  z-index: 10;
  background: white;
  border-radius: 50%;
`;
const CategoryScroll = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scroll-behavior: smooth;
  margin-left: 24px;
  margin-right: 24px;
  padding: 16px 0 10px 0;
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
  background: var(--BG, #fbfcff);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4) inset;
  padding-left: 16px;
`;
const SearchImg = styled.img`
  position: absolute;
  right: calc(50% - 172px + 10px);
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const Container = styled.div`
  position: relative;
  width: 100%;
`;
const BackImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 393px;
  height: 314px;
  z-index: -10;
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
