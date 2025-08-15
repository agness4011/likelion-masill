import { useState } from "react";
import BackImg from "../../assets/detail/Arrow-Left.svg";
import Brid from "../../assets/detail/Union.png";
import Pencil from "../../assets/detail/pencil.png";
import Button from "../../assets/detail/Button.png";
import FullHeart from "../../assets/detail/fullheart.png";
import Heart from "../../assets/detail/heart.png";
import ChatImg from "../../assets/detail/chat.png";
import CommentImg from "../../assets/detail/comment.png";
import ContentsImg from "../../assets/detail/contents.png";
import GroupImg from "../../assets/detail/group.png";
import { useNavigate, Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import styled from "styled-components";

import { eventData } from "../../dummy/datas";

import {
  BackBtn,
  LeftBtn,
  RightBtn,
  TopImg,
  PageIndicator,
  ImageWrapper,
  LowContainer,
  PencilBtn,
  LowHeaderContainer,
  HeartImg,
  TabContainer,
  TabButton,
} from "./Detail.styled";

export default function DetailBoard({ children }) {
  return <div>{children}</div>;
}

function Hight({ children }) {
  return <div>{children}</div>;
}

function ShowImage() {
  const { eventId } = useParams(); // URL에서 eventId 가져오기
  const event = eventData.find((e) => e.eventId === Number(eventId));

  if (!event) {
    return <p>이벤트를 찾을 수 없습니다.</p>;
  }

  const images = event.images;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRight = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <ImageWrapper>
      <LeftBtn onClick={handleLeft} src={Button} />
      <TopImg
        src={images[currentIndex].imageUrl}
        alt={`이미지 ${currentIndex + 1}`}
      />
      <RightBtn onClick={handleRight} src={Button} />

      <PageIndicator>
        {currentIndex + 1} / {images.length}
      </PageIndicator>
    </ImageWrapper>
  );
}

function Low({ children }) {
  return <LowContainer>{children}</LowContainer>;
}
function LowHead() {
  const navigate = useNavigate();
  return (
    <LowHeaderContainer>
      <BackBtn
        src={BackImg}
        alt="페이지 뒤로 가는 버튼"
        onClick={() => navigate(-1)}
      />
      <PencilBtn src={Pencil} />
    </LowHeaderContainer>
  );
}
function LowBody({ children }) {
  return <div>{children}</div>;
}
function BodyTop() {
  const { eventId } = useParams(); // URL에서 eventId 가져오기
  const event = eventData.find((e) => e.eventId === Number(eventId));

  if (!event) {
    return <p>이벤트를 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      {/* <p></p>  카테고리*/}
      <div>
        <p>{event.title}</p>
        <p>{event.location}</p>
        <p>
          {" "}
          {`${dayjs(event.startAt).format("YYYY.MM.DD.(dd)")} ~ ${dayjs(
            event.endAt
          ).format("YYYY.MM.DD.(dd)")} ${dayjs(event.startAt).format(
            "HH:mm"
          )}~${dayjs(event.endAt).format("HH:mm")}`}
        </p>
      </div>
      <div>
        <p>{event.favoriteCount}</p>
        {/* <HeartImg src="" */}
      </div>
    </div>
  );
}
function BodyMiddle({ children }) {
  return <div>{children}</div>;
}
function MiddleWho() {
  return (
    <div>
      <div></div>
    </div>
  );
}

function TabMenu() {
  const [activeTab, setActiveTab] = useState("내용");

  const tabs = [
    { name: "내용", icon: ContentsImg },
    { name: "댓글", icon: CommentImg },
    { name: "마실 모임", icon: GroupImg },
  ];

  return (
    <TabContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab.name}
          active={activeTab === tab.name}
          onClick={() => setActiveTab(tab.name)}
        >
          <img src={tab.icon} />
          <span>{tab.name}</span>
        </TabButton>
      ))}
    </TabContainer>
  );
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
DetailBoard.BodyTop = BodyTop;
DetailBoard.LowBody = LowBody;
DetailBoard.Low = Low;
DetailBoard.UserChat = UserChat;
DetailBoard.Location = Location;
DetailBoard.DatalButton = DatalButton;
DetailBoard.High = Hight;
DetailBoard.LowHead = LowHead;
DetailBoard.ShowImage = ShowImage;
DetailBoard.BodyMiddle = BodyMiddle;
DetailBoard.MiddleWho = MiddleWho;
DetailBoard.TabMenu = TabMenu;
