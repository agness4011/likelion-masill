import Main from "./Main";

export const mainCategoryRoutes = [
  {
    path: "event",
    element: <Main.Post category="event" area="오늘의 이벤트" />,
  },
  {
    path: "market",
    element: <Main.Post category="market" area="플리마켓" />,
  },
  {
    path: "art",
    element: <Main.Post category="art" area="문화/예술" />,
  },
  {
    path: "outdoor",
    element: <Main.Post category="outdoor" area="야외활동" />,
  },
  {
    path: "food",
    element: <Main.Post category="food" area="음식" />,
  },
];
