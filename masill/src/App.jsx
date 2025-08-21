// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "@layouts/RootLayout";
import { UserProvider } from "./contexts/UserContext";

import OnboardingPage from "@pages/OnboardingPage";
import Onboarding1 from "@pages/onboarding/Onboarding1";
import Onboarding2 from "@pages/onboarding/Onboarding2";

import MainPage from "@pages/MainPage";
import Main from "./components/main/Main";

import LoginPage from "@pages/LoginPage";
import SearchPage from "@pages/search/SearchPage";
import BoardPage from "./pages/BoardPage";
import WriteBoardPage from "./pages/UploadBoard";
import { mainCategoryRoutes } from "./components/main/MainCategoryRoutes";
import DetailBoardPage from "./pages/DetailBoardPage";

import SignupPage from "@pages/signup/SignupPage";
import SignPage from "@components/signup/SignPage";
import SignAgreePage from "@components/signup/SignAgreePage";
import SignPhonePage from "@components/signup/SignPhonePage";
import SignCreatePage from "@components/signup/SignCreatePage";
import SignRegionPage from "@components/signup/SignRegionPage";
import SignRegionDetailPage from "@components/signup/SignRegionDetailPage";
import SignCompletePage from "@components/signup/SignCompletePage";

import ChatPage from "@pages/chat/ChatPage";
import ChatRoomPage from "@pages/chat/ChatRoomPage";
import ChatRoomDetailPage from "@pages/chat/ChatRoomDetailPage";
import AuthContainer from "./components/auth/AuthContainer";
import MyHomePage from "./pages/myhome/MyHomePage";
import MyPostsPage from "./pages/myhome/MyPostsPage";
import WishlistPage from "./pages/myhome/WishlistPage";
import NicknameChangePage from "./pages/myhome/NicknameChangePage";
import SajangPage from "./pages/myhome/SajangPage";

import SelectRegion from "./components/board/SelectRegion";
import SelectRegionDetail from "./components/board/SelectRegionDetail";
import ChangeRegion from "./components/main/ChangeRegion";
import ChangeRegionDetail from "./components/main/ChangeRegionDetail";
import SmallGroupPage from "./pages/SmallGroupPage";
import WriteSmallPage from "./pages/WriteSmallPage";
import RetouchSmallPage from "./pages/RetouchSmallPage";
import ChatAi from "./pages/chat/ChatAi";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            {/* 온보딩 */}
            <Route index element={<OnboardingPage />} />
            <Route path="/onboarding1" element={<Onboarding1 />} />
            <Route path="/onboarding2" element={<Onboarding2 />} />

            {/* 로그인 */}
            <Route
              path="login"
              element={
                <AuthContainer>
                  <LoginPage />
                </AuthContainer>
              }
            />

            {/* 회원가입 흐름 */}
            <Route path="signup" element={<SignupPage />}>
              <Route index element={<SignPage />} />
              <Route path="agree" element={<SignAgreePage />} />
              <Route path="phone" element={<SignPhonePage />} />
              <Route path="create" element={<SignCreatePage />} />
              <Route path="region" element={<SignRegionPage />} />
              <Route path="region-detail" element={<SignRegionDetailPage />} />
              <Route path="complete" element={<SignCompletePage />} />
            </Route>

            {/* 메인 + 카테고리 */}
            <Route path="main" element={<MainPage />}>
              {/* /main 기본 경로 (index route) */}
              <Route index element={<Main.Post />} />

              {/* 카테고리별 route */}
              {mainCategoryRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<Main.Post />} // Post 컴포넌트 렌더링
                />
              ))}
            </Route>
            <Route path="changeRegion" element={<ChangeRegion />} />
            <Route
              path="changeRegion/detail"
              element={<ChangeRegionDetail />}
            />

            {/* 검색 */}
            <Route path="search" element={<SearchPage />} />
            <Route path="chat/AI" element={<ChatAi />} />

            {/* 게시글 작성 흐름 */}
            <Route path="board/reigon" element={<SelectRegion />} />
            <Route
              path="board/reigon/detail"
              element={<SelectRegionDetail />}
            />
            <Route path="/board" element={<BoardPage />} />
            <Route path="write" element={<WriteBoardPage />} />
            <Route path="board/:eventId" element={<WriteBoardPage />} />
            <Route path="detail/:eventId" element={<DetailBoardPage />} />
            <Route
              path="detail/:eventId/clubId/:clubId"
              element={<SmallGroupPage />}
            />
            <Route
              path="smallgroup/:eventId/:clubId"
              element={<SmallGroupPage />}
            />
            <Route
              path="writeSmallGroup/:eventId"
              element={<WriteSmallPage />}
            />
            <Route
              path="detail/:eventId/clubId/:clubId/retouchSmallGroup"
              element={<RetouchSmallPage />}
            />

            {/* 지역 선택 흐름 (글쓰기용) */}
            <Route path="region" element={<SignRegionPage />} />
            <Route path="region-detail" element={<SignRegionDetailPage />} />

            {/* 채팅 */}
            <Route path="chat" element={<ChatPage />} />
            <Route path="chat/list" element={<ChatRoomPage />} />
            <Route path="chat/room/:roomId" element={<ChatRoomDetailPage />} />

            {/* 마이페이지 */}
            <Route path="myhome" element={<MyHomePage />} />
            <Route path="myhome/my-posts" element={<MyPostsPage />} />
            <Route path="myhome/wishlist" element={<WishlistPage />} />
            <Route
              path="myhome/nickname-change"
              element={<NicknameChangePage />}
            />
            <Route path="myhome/sajang" element={<SajangPage />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}
