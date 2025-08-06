import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@pages/LoginPage";
import RootLayout from "@layouts/RootLayout";
import MainPage from "./pages/MainPage";
import BoardPage from "./pages/BoardPage";
import WriteBoardPage from "./pages/UploadBoard";
import { mainCategoryRoutes } from "./components/main/MainCategoryRoutes";

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

          {/* 로그인 페이지 */}
          {/* <Route path="login" element={<LoginPage />} /> */}

          {/* 회원가입 관련 페이지 */}
          {/* <Route path="signup" element={<SignPage />} />
          <Route path="signup/agree" element={<SignAgreePage />} />
          <Route path="signup/phone" element={<SignPhonePage />} /> */}

          {/* 여기에 다른 페이지 추가 */}
        </Route>
      </Routes>
    </Router>
  );
}
