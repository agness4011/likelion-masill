import Main from "../components/main/Main";
import { Outlet } from "react-router-dom";
import Header from "../components/commons/header/Header";
import Footer from "../components/commons/Footer";

export default function MainPage() {
  return (
    <Main>
      {/* 배경 + Header + SearchBar + 광고 */}
      <Main.HigherContainer>
        <Header />
        <Main.SearchBar />
      </Main.HigherContainer>

      {/* 고정된 영역 밑에 스크롤 영역 */}
      <Main.LowContent>
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

        <Main.PostContent>
          <Outlet />
          <Main.MoveInterest />
          <Footer />
        </Main.PostContent>
      </Main.LowContent>
    </Main>
  );
}
