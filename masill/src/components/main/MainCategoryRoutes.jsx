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
    path: "volunteer",
    element: <Main.Post category="volunteer" area="자원봉사" />,
  },
  {
    path: "festivity",
    element: <Main.Post category="festivity" area="축제" />,
  },
  {
    path: "shop",
    element: <Main.Post category="shop" area="가게행사" />,
  },
  {
    path: "education",
    element: <Main.Post category="education" area="교육" />,
  },
  {
    path: "etc",
    element: <Main.Post category="etc" area="기타" />,
  },
];
