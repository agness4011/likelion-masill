import { useState } from "react";
import BackImg from "../../assets/logo/Back";
import { useNavigate, Link } from "react-router-dom";

export default function DetailBoard({ children }) {
  return <div>{children}</div>;
}

function Hight() {
  return <div>{children}</div>;
}

function GoBackPage() {
  const navigate = useNavigate();
  return (
    <>
      <img ser={BackImg} alt="피이지 뒤로 가는 버튼" onClick={navigate(-1)} />
    </>
  );
}

function ShowImage() {
  const [img, setImg] = useState(null);
}

function UserChat() {
  return (
    <div>
      <p></p>
      {/* 닉네입 삽입 */}
      <Link>
        {/* 이동 주소 넣기 */}
        <button>채팅보내기</button>
      </Link>
    </div>
  );
}

function Location() {
  return (
    <div>
      <p></p>
      <p></p>
      <p></p>
    </div>
  );
}

function DatalButton() {
  const [type, setType] = useState("내용");

  return (
    <div>
      <button
        onClick={() => {
          setType("내용");
        }}
      >
        내용
      </button>
      <button
        onClick={() => {
          setType("관련모임");
        }}
      >
        관련모임
      </button>
      <button
        onClick={() => {
          setType("댓글");
        }}
      >
        댓글
      </button>
    </div>
  );
}

function Low({ type }) {
  return <div>{children}</div>;
}

function DetailContext() {
  return (
    <div>
      <input type="text"></input>
      <button>AI 요약하기</button>
    </div>
  );
}

function Group() {
  return (
    <div>
      <button>+관련게시글 작성</button>
      <div></div>
      {/* 게시글 보이게 */}
    </div>
  );
}

function Comment() {}
DetailBoard.UserChat = UserChat;
DetailBoard.Location = Location;
DetailBoard.DatalButton = DatalButton;
DetailBoard.High = Hight;
DetailBoard.GoBackPage = GoBackPage;
DetailBoard.ShowImage = ShowImage;
