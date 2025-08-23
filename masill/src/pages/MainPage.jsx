import Main from "../components/main/Main";
import { Outlet } from "react-router-dom";
import Header from "../components/commons/header/Header";
import Footer from "../components/commons/Footer";
import { useEffect, useState } from "react";
import { SearchContext } from "../components/main/SearchContext";

export default function MainPage() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [aiPosts, setAiPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 검색어 상태 추가
  const [searchResults, setSearchResults] = useState(null);
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
      <SearchContext.Provider
        value={{
          searchTerm,
          setSearchTerm,
          isSearchActive,
          setIsSearchActive,
          searchResults, // 추가
          setSearchResults, // 추가
        }}
      >
        <Main.HigherContainer>
          <Header />
          {/* 🔹 searchTerm 상태 전달 */}
          <Main.SearchBar />
        </Main.HigherContainer>

        <Main.LowContent>
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
            {/* 🔹 Outlet에 상태 전달 */}
            <Outlet
              context={{
                isSearchActive,
                setIsSearchActive,
                searchTerm,
                setSearchTerm, // 🔹 Post에서도 검색어를 업데이트 가능
                aiPosts,
                setAiPosts, // 🔹 AI 추천 결과를 Post에서 반영 가능
              }}
            />
            <Main.MoveInterest />
          </Main.PostContent>
        </Main.LowContent>
      </SearchContext.Provider>
    </Main>
  );
}
