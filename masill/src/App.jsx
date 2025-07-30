import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@pages/LoginPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<MainPage />} />

          {/* 로그인 페이지 */}
          <Route path="login" element={<LoginPage />} />

          {/* 회원가입 관련 페이지 */}
          <Route path="signup" element={<SignPage />} />
          <Route path="signup/agree" element={<SignAgreePage />} />
          <Route path="signup/phone" element={<SignPhonePage />} />

          {/* 여기에 다른 페이지 추가 */}
        </Route>
      </Routes>
    </Router>
  );
}
