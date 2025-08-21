import Main from "../components/main/Main";
import { Outlet } from "react-router-dom";
import Header from "../components/commons/header/Header";
import Footer from "../components/commons/Footer";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [aiPosts, setAiPosts] = useState([]); // ✅ ChatAi에서 넘겨줄 추천 결과

  // 토큰 상태 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const currentUser = localStorage.getItem("currentUser");

    console.log("=== 메인페이지 토큰 상태 ===");
    console.log("Access Token:", accessToken ? "있음" : "없음");
    console.log("Refresh Token:", refreshToken ? "있음" : "없음");
    console.log(
      "Current User:",
      currentUser ? JSON.parse(currentUser) : "없음"
    );
    console.log("===========================");
  }, []);

  return (
    <Main>
      {/* 배경 + Header + SearchBar + 광고 */}
      <Main.HigherContainer>
        <Header />
        <Main.SearchBar />
      </Main.HigherContainer>

      {/* 고정된 영역 밑에 스크롤 영역 */}
      <Main.LowContent>
        {/* 🔽 검색이 아닐 때만 카테고리바 표시 */}
        {!isSearchActive && (
          <Main.CategoryBar>
            <Main.CategoryItem path="event" categoryTitle={"오늘의 이벤트"} />
            <Main.CategoryItem path="market" categoryTitle={"플리마켓"} />
            <Main.CategoryItem path="art" categoryTitle={"문화/예술"} />
            <Main.CategoryItem path="outdoor" categoryTitle={"야외활동"} />
            <Main.CategoryItem path="volunteer" categoryTitle={"자원봉사"} />
            <Main.CategoryItem path="shop" categoryTitle={"가게행사"} />
            <Main.CategoryItem path="festivity" categoryTitle={"축제"} />
            <Main.CategoryItem path="education" categoryTitle={"교육"} />
            <Main.CategoryItem path="etc" categoryTitle={"기타"} />
          </Main.CategoryBar>
        )}

        <Main.PostContent>
          {/* 🔽 Outlet에 상태 전달 */}
          <Outlet context={{ isSearchActive, setIsSearchActive }} />
          <Main.MoveInterest />
          {/* <Footer /> */}
        </Main.PostContent>
      </Main.LowContent>
    </Main>
  );
}
