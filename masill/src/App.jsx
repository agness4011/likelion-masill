// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "@layouts/RootLayout";
import OnboardingPage from "@pages/OnboardingPage";
import Onboarding1 from "@pages/onboarding/Onboarding1";
import Onboarding2 from "@pages/onboarding/Onboarding2";
import OnboardingPage from "@pages/OnboardingPage";
import MainPage from "@pages/MainPage";
import LoginPage from "@pages/LoginPage";
import BoardPage from "./pages/BoardPage";
import WriteBoardPage from "./pages/UploadBoard";
import { mainCategoryRoutes } from "./components/main/MainCategoryRoutes";
import SignupPage from "@pages/signup/SignupPage";
import SignPage from "@components/signup/SignPage";
import SignAgreePage from "@components/signup/SignAgreePage";
import SignPhonePage from "@components/signup/SignPhonePage";
import SignCreatePage from "@components/signup/SignCreatePage";
import SignRegionPage from "@components/signup/SignRegionPage";
import SignCompletePage from "@components/signup/SignCompletePage";
import ChatPage from "@pages/chat/ChatPage";
import ChatRoomPage from "@pages/chat/ChatRoomPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          {/* 온보딩 */}
         
            <Route index element={<OnboardingPage />} />
            <Route path="/onboarding1" element={<Onboarding1 />} />
            <Route path="/onboarding2" element={<Onboarding2 />} />
            {/* 로그인 */}
        
          <Route path="login" element={<LoginPage />} />

          {/* 회원가입 흐름 */}
          <Route path="signup" element={<SignupPage />}>
            <Route index element={<SignPage />} />
            <Route path="agree" element={<SignAgreePage />} />
            <Route path="phone" element={<SignPhonePage />} />
            <Route path="create" element={<SignCreatePage />} />
            <Route path="region" element={<SignRegionPage />} />
            <Route path="done" element={<SignCompletePage />} />
          </Route>

          {/* 메인 + 카테고리 */}
          <Route path="main" element={<MainPage />}>
          <Route path="/main" element={<MainPage />}>
            {mainCategoryRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          {/* 게시글 작성 흐름 */}
          <Route path="board" element={<BoardPage />} />
          <Route path="write" element={<WriteBoardPage />} />

          {/* 채팅 */}
          <Route path="chat" element={<ChatPage />} />
          <Route path="chat/:roomId" element={<ChatRoomPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/write" element={<WriteBoardPage />} />
          <Route path="signup/agree" element={<SignAgreePage />} />
          <Route path="signup/phone" element={<SignPhonePage />} />

          {/* 온보딩 화면 */}
          <Route index element={<OnboardingPage />} />
          {/* 로그인 */}
          <Route path="login" element={<LoginPage />} />
          {/* 회원가입 흐름 (nested Outlet) */}
          <Route path="signup" element={<SignupPage />}>
            {/* 이메일·소셜 선택 */}
            <Route index element={<SignPage />} />
            {/* 약관 동의 */}
            <Route path="agree" element={<SignAgreePage />} />
            {/* 휴대폰 인증 */}
            <Route path="phone" element={<SignPhonePage />} />
            {/* 아이디 생성 */}
            <Route path="create" element={<SignCreatePage />} />
            {/* 지역 선택 */}
            <Route path="region" element={<SignRegionPage />} />
            {/* 가입 완료 */}
            <Route path="done" element={<SignCompletePage />} />
            {/* 서비스 메인 */}
            <Route path="main" element={<MainPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
