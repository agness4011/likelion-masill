import { Link } from "react-router-dom";

import Main from "../../../assets/react.svg";
import Alarm from "../../../assets/react.svg";
import Chat from "../../../assets/react.svg";
import MyHome from "../../../assets/react.svg";
import Logo from "../../../assets/react.svg";
import Board from "../../../assets/react.svg";

export default function HeaderBar({ children }) {
  return <div>{children}</div>;
}

function HeadLeft() {
  return (
    <>
      <img src={Logo} alt="로고" />
      <Link to="/main/event">
        <img src={Main} alt="메인페이지" />
      </Link>
    </>
  );
}

function HeadRight() {
  return (
    <>
      <Link to="/alarm">
        <img src={Alarm} alt="알림페이지" />
      </Link>
      <Link to="/chat">
        <img src={Chat} alt="채팅페이지" />
      </Link>
      <Link to="/myhome">
        <img src={MyHome} alt="마이페이지" />
      </Link>
      <Link to="/board">
        <img src={Board} alt="게시글작성" />
      </Link>
    </>
  );
}

HeaderBar.HeadRight = HeadRight;
HeaderBar.HeadLeft = HeadLeft;
