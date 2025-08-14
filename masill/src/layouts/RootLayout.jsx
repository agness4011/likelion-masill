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
    "/signup/complete",
    "/write",
    "/onboarding1",
    "/onboarding2",
    "/signup/region-detail",
    "/chat",
    "/myhome",
    "/myhome/my-posts",
    "/myhome/nickname-change",
    "/myhome/sajang",
    "/myhome/wishlist",
    "/search",
    "/search/ai-chat",  
  ];

  // 채팅방 경로 패턴 매칭
  const isChatRoom = /^\/chat\/\d+$/.test(location.pathname);
  
  const isLayoutHidden = noLayoutPaths.includes(location.pathname) || isChatRoom;

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
