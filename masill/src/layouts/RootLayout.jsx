import { Outlet, useLocation } from "react-router-dom";
import Header from "@commons/header/Header";
import Footer from "@commons/Footer";
import Wrapper from "@commons/Wrapper";

export default function RootLayout() {
  const location = useLocation();
  const noLayoutPaths = ["/login", "/signup"]; // Header/Footer 없이 보여줄 경로들

  const isLayoutHidden = noLayoutPaths.includes(location.pathname);

  return (
    <Wrapper>
      {!isLayoutHidden && <Header />}
      <Outlet />
      {!isLayoutHidden && <Footer />}
    </Wrapper>
  );
}
