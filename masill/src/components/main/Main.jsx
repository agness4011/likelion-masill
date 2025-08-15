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
import "dayjs/locale/ko";
import { fetchAllBoards, eventTypeBoards } from "../../api/boardApi";

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
} from "./MainStyles.styled";
import styled from "styled-components";

export default function Main({ children }) {
  return <MainContainer>{children}</MainContainer>;
}
const MainContainer = styled.div``;
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
  const search = () => setText("");

  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="가게 행사하는.. 차리점..."
      />
      <SearchImg src={SearchGlass} alt="서치버튼" onClick={search} />
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

  return (
    <CategoryBtn
      style={{
        background: isActive ? "#fff" : "#e5ecff",
        border: isActive ? "1px solid var(--Blur-gary-400, #CDDBFF)" : "none",
        color: isActive ? "#000" : "var(--Gray-900, #727C94)",
      }}
      onClick={() => {
        navigate(`/main/${path}`); // 경로 이동
        setActiveCategory(path); // 필요시 상태 업데이트 (경로 기반이라 생략 가능)
      }}
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

// 게시글 목록
function Post() {
  const location = useLocation();
  const category =
    location.pathname === "/main"
      ? null
      : location.pathname.replace("/main/", "");

  const [sortType, setSortType] = useState("AI 추천순");
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let res;
        if (!category) {
          res = await fetchAllBoards();
          console.log("전체 게시글:", res);

          // 실제 데이터 구조에 맞게 접근
          const content = res?.data?.content || [];

          // 변수 선언과 동시에 사용
          const withHeartFlag = content.map((post) => ({
            ...post,
            isHeartClicked: false,
          }));

          setPosts(withHeartFlag);
        } else {
          // 카테고리별 API 준비되면 적용
          // res = await fetchBoardsByCategory(category);
        }
      } catch (err) {
        console.error("게시물 불러오기 실패", err);
      }
    };

    loadPosts();
  }, [category]);

  const clickHeart = (eventId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.eventId === eventId
          ? {
              ...post,
              isHeartClicked: !post.isHeartClicked,
              favoriteCount: !post.isHeartClicked
                ? post.favoriteCount + 1
                : post.favoriteCount - 1,
            }
          : post
      )
    );
  };

  ("const filteredPosts = posts.filter((post) => post.category === category);");
  const filteredPosts = posts;

  const sortedPosts = [...filteredPosts]
    // 종료일이 오늘 이후인 게시글만 남기기
    .filter((post) => dayjs(post.endAt).isAfter(dayjs()))
    .sort((a, b) => {
      if (sortType === "AI 추천순") return a.eventId - b.eventId;
      if (sortType === "조회수 높은 순")
        return b.favoriteCount - a.favoriteCount;
      if (sortType === "인기순") return b.favoriteCount - a.favoriteCount;
      if (sortType === "날짜순")
        return dayjs(b.startAt).valueOf() - dayjs(a.startAt).valueOf();
      return 0;
    });

  const navigate = useNavigate();

  const options = ["AI 추천순", "조회수 높은 순", "인기순", "날짜순"];

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (type) => {
    setSortType(type);
    setIsOpen(false);
  };
  dayjs.locale("ko");

  return (
    <BoardContanier>
      <ToggleLoctionDiv>
        <LocationDiv>
          <LocationImg src={SetLocation} />
          <LocationP>지역 이름</LocationP>
        </LocationDiv>

        <div style={{ flexGrow: 1, minWidth: "154px" }}></div>

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

      <div>
        {sortedPosts.map((item) => {
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
                    <BoardLocationP>{item.location}</BoardLocationP>
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
                      clickHeart(item.eventId);
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
        })}
      </div>
    </BoardContanier>
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

const BoardContanier = styled.div`
  margin-left: 24px;
`;
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
