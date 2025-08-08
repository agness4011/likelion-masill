import Main from "../components/main/Main";
import { Outlet } from "react-router-dom";

export default function MainPage() {
  return (
    <Main>
      <Main.SearchBar />

      <Main.CategoryBar>
        <Main.CategoryItem
          path="event"
          image={""}
          categoryTitle={"오늘의 이벤트"}
        />
        <Main.CategoryItem
          path="market"
          image={""}
          categoryTitle={"플리마켓"}
        />
        <Main.CategoryItem path="art" image={""} categoryTitle={"문화/예술"} />
        <Main.CategoryItem
          path="outdoor"
          image={""}
          categoryTitle={"야외활동"}
        />
        <Main.CategoryItem path="food" image={""} categoryTitle={"음식"} />
      </Main.CategoryBar>

      <Main.PostContent>
        <Outlet />
        <Main.MoveInterset />
      </Main.PostContent>
    </Main>
  );
}
