import { Outlet, useLocation } from "react-router-dom";
import Header from "@commons/header/Header";
import Footer from "@commons/Footer";
import Wrapper from "@commons/Wrapper";
import styled from "styled-components";

export default function RootLayout() {
  const location = useLocation();

  const isLayoutHidden = noLayoutPaths.includes(location.pathname);

  const noLayoutPaths = [
    '/', 
    '/login',
    '/signup',
    '/signup/agree',
    '/signup/phone',
    '/signup/create',
    '/signup/region',
    '/signup/done',
    "/write"
  ];// Header/Footer 없이 보여줄 경로들


  return (
    <Wrapper>
      {!isLayoutHidden && <Header />}
      <Outlet />
      {!isLayoutHidden && <Footer />}
    </Wrapper>
  );
}

