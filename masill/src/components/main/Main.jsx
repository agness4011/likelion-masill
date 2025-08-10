import SearchGlass from "../../assets/react.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoardData, BoardImage } from "./MainStyles.styled";
import dayjs from "dayjs";
import { data as initialData } from "../../dummy/datas";

// ✅ 온보딩과 동일한 PixelCanvas 세팅 사용
import PixelCanvas from "../../components/commons/PixelCanvas";

export default function Main({ children }) {
  return <div>{children}</div>;
}

function SearchBar() {
  const [text, setText] = useState("");
  const search = () => setText("");
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <img src={SearchGlass} alt="서치버튼" onClick={search} />
    </div>
  );
}

function CategoryBar({ children }) {
  return <div>{children}</div>;
}

function CategoryItem({ path, image, categoryTitle }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(path)}>
      <img src={image} alt={categoryTitle} />
    </button>
  );
}

function PostContent({ children }) {
  return <div>{children}</div>;
}

function Post({ area, category }) {
  const [sortType, setSortType] = useState("AI 추천순");
  const [posts, setPosts] = useState(
    initialData.map((post) => ({ ...post, isHeartClicked: false }))
  );

  const clickHeart = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              isHeartClicked: !post.isHeartClicked,
              heart: !post.isHeartClicked ? post.heart + 1 : post.heart - 1,
            }
          : post
      )
    );
  };

  const filteredPosts = posts.filter((post) => post.category === category);

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortType === "AI 추천순") return a.id - b.id;
    if (sortType === "조회수") return b.heart - a.heart;
    if (sortType === "인기수") return b.heart - a.heart;
    if (sortType === "댓글수") return b.comment - a.comment;
    return 0;
  });

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="AI 추천순">AI 추천순</option>
          <option value="조회수">조회수</option>
          <option value="인기수">인기수</option>
          <option value="댓글수">댓글수</option>
        </select>
      </div>
      <div>
        {sortedPosts.map((item) => {
          const today = dayjs();
          const eventDate = dayjs(item.date, "YYYY.MM.DD");
          const diff = eventDate.diff(today, "day");
          const isClosingSoon = diff >= 0 && diff <= 3;

          return (
            <BoardData
              key={item.id}
              onClick={() => navigate(`/detail${item.id}`)}
            >
              <div>
                {isClosingSoon && (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    🔥 마감 임박!
                  </p>
                )}
              </div>
              <BoardImage src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.location}</p>
                <p>{item.date}</p>
              </div>
              <div>
                <p
                  style={{
                    cursor: "pointer",
                    color: item.isHeartClicked ? "red" : "black",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    clickHeart(item.id);
                  }}
                >
                  ❤️ {item.heart}
                </p>
                <p>💬 {item.comment}</p>
              </div>
            </BoardData>
          );
        })}
      </div>
    </div>
  );
}

Main.PostContent = PostContent;
Main.Post = Post;
Main.SearchBar = SearchBar;
Main.CategoryBar = CategoryBar;
Main.CategoryItem = CategoryItem;
