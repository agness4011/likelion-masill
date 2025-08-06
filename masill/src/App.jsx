import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "@layouts/RootLayout";
import OnboardingPage from "@pages/OnboardingPage";
import MainPage from "@pages/MainPage";
import LoginPage from "@pages/LoginPage";
import RootLayout from "@layouts/RootLayout";
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


export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/main" element={<MainPage />}>
            {mainCategoryRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
          <Route path="/board" element={<BoardPage />} />
          <Route path="/write" element={<WriteBoardPage />} />


          <Route path="signup/agree" element={<SignAgreePage />} />
          <Route path="signup/phone" element={<SignPhonePage />} /> */}

          {/* 여기에 다른 페이지 추가 */}

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
