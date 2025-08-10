import { Outlet, useLocation } from "react-router-dom";
import Header from "@commons/header/Header";
import Footer from "@commons/Footer";
import PixelCanvas from "../components/commons/PixelCanvas";

export default function RootLayout() {
  const location = useLocation();

  const noLayoutPaths = [
    "/",
    "/login",
    "/signup",
    "/signup/agree",
    "/signup/phone",
    "/signup/create",
    "/signup/region",
    "/signup/done",
    "/write",
    "/onboarding1",
    "/onboarding2",
  ];

  const isLayoutHidden = noLayoutPaths.includes(location.pathname);

  return (
    <PixelCanvas
      w={393}
      h={852}
      desktopMode="fixed"
      mobileMode="contain"
      pad={24}
      showFrame={!isLayoutHidden}
      contentScrollable={true}
      bg="#f5f5f5"
      canvasBg="#ffffff"
    >
      {!isLayoutHidden && <Header />}
      <Outlet />
      {!isLayoutHidden && <Footer />}
    </PixelCanvas>
  );
}
