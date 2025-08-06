import SearchGlass from "../../assets/react.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoardData, BoardImage } from "./MainStyles.styled";
import dayjs from "dayjs";

import { data as initialData } from "../../dummy/datas";

export default function Main({ children }) {
  return <div>{children}</div>;
}

function SearchBar() {
  const [text, setText] = useState("");
  const search = () => {
    setText("");
  };
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

  // 게시글 상태 배열 (하트 상태 포함)
  const [posts, setPosts] = useState(
    initialData.map((post) => ({ ...post, isHeartClicked: false }))
  );

  // 하트 클릭 처리
  const clickHeart = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === id) {
          const isClicked = !post.isHeartClicked;
          return {
            ...post,
            isHeartClicked: isClicked,
            heart: isClicked ? post.heart + 1 : post.heart - 1,
          };
        }
        return post;
      })
    );
  };

  // 카테고리 필터링
  const filteredPosts = posts.filter((post) => post.category === category);

  // 정렬
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
          const eventDate = dayjs(item.date, "YYYY.MM.DD"); // 'YYYY.MM.DD' 형식
          const diff = eventDate.diff(today, "day");

          const isClosingSoon = diff >= 0 && diff <= 3; // 오늘 ~ 3일 이내

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
                    e.stopPropagation(); // 클릭 이벤트 전파 방지
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
