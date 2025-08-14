import { useNavigate, Link } from "react-router-dom";

import MainImg from "../../../assets/logo/mainImg/logomasill.png";
import AlarmImg from "../../../assets/logo/mainImg/bell.png";
import ChatImg from "../../../assets/logo/mainImg/chat.png";
import MyHomeImg from "../../../assets/logo/mainImg/home.png";
import LogoImg from "../../../assets/logo/mainImg/logo.png";
import BoardImg from "../../../assets/logo/mainImg/boardwrite.png";
import styled from "styled-components";

export default function HeaderBar({ children }) {
  return <Container>{children}</Container>;
}
const Container = styled.div`
  display: flex;
  align-items: flex-start; /* 상단 기준 정렬 */
  padding-top: 32px; /* 전체 상단 여백 32px */
  gap: 115px; /* HeadLeft와 HeadRight 사이 간격 */
`;
function HeadLeft() {
  const navigate = useNavigate();

  return (
    <Left>
      <div
        onClick={() => {
          navigate("/main"); // /main으로 이동
        }}
        style={{ cursor: "pointer" }}
      >
        <Logo src={LogoImg} alt="로고" />
        <LogoMasill src={MainImg} alt="메인페이지" />
      </div>
    </Left>
  );
}
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 24px; /* 왼쪽에서 24px 떨어뜨림 */
`;
function HeadRight() {
  return (
    <Right>
      <Link to="/board">
        <Board src={BoardImg} alt="게시글작성" />
      </Link>
      <Link to="/alarm">
        <Alarm src={AlarmImg} alt="알림페이지" />
      </Link>
      <Link to="/chat">
        <Chat src={ChatImg} alt="채팅페이지" />
      </Link>
      <Link to="/myhome">
        <MyHome src={MyHomeImg} alt="마이페이지" />
      </Link>
    </Right>
  );
}

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* 아이콘들 간격 12px */
`;

const MyHome = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
`;
const Chat = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
`;
const Alarm = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
`;
const Board = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
`;

const LogoMasill = styled.img`
  width: 44.379px;
  height: 22.553px;
  flex-shrink: 0;
`;

const Logo = styled.img`
  width: 57px;
  height: 35px;
  flex-shrink: 0;
`;
HeaderBar.HeadRight = HeadRight;
HeaderBar.HeadLeft = HeadLeft;
