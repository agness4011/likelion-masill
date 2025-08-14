import { Outlet, useLocation } from "react-router-dom";
import PixelCanvas from "../components/commons/PixelCanvas";

export default function RootLayout() {
  return (
    <PixelCanvas
      w={393}
      h={852}
      desktopMode="fixed"
      mobileMode="contain"
      pad={24}
      contentScrollable={true}
      bg="#f5f5f5"
      canvasBg="#ffffff"
    >
      <Outlet />
    </PixelCanvas>
  );
}
