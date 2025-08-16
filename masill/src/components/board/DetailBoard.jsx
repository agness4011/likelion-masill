import { useState, useEffect } from "react";
import BackImg from "../../assets/detail/Arrow-Left.svg";
import Pencil from "../../assets/detail/pencil.png";
import Button from "../../assets/detail/Button.png";
import FullHeart from "../../assets/detail/fullheart.png";
import Heart from "../../assets/detail/heart.png";
import Chat from "../../assets/detail/chat.png";
import CommentImg from "../../assets/detail/comment.png";
import ContentsImg from "../../assets/detail/contents.png";
import GroupImg from "../../assets/detail/group.png";
import OnGroupImg from "../../assets/detail/onGroup.png";
import OnCommentImg from "../../assets/detail/oncomment.png";
import OnContentsImg from "../../assets/detail/onContents.png";
import SummaryImg from "../../assets/detail/summary.png";
import OnSummaryImg from "../../assets/detail/onsummary.png";

import { useNavigate, Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import styled from "styled-components";

import { eventData } from "../../dummy/datas";
import { chatDat } from "../../dummy/chat";
import { detailBoard, detailImg } from "../../api/boardApi";
import { privateAPI } from "../../api/axios";

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
  SummaryBtn,
  DetailPart,
  CategoryMark,
  TitleP,
  LoccationP,
  DateP,
  BodyTopDiv,
  FavoriteCountP,
  UserImg,
  UserNickName,
  ChatImg,
  ChatBtn,
  UserDiv,
  SummaryImgSize,
  DetailDiv,
  DetailText,
} from "./Detail.styled";

export default function DetailBoard({ children }) {
  return <div>{children}</div>;
}

function Hight({ children }) {
  return <div>{children}</div>;
}

function ShowImage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await detailImg(eventId);
        setEvent(res.data); // API 데이터 중 data만 가져오기
      } catch (error) {
        console.error("이벤트 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) return <p>로딩 중...</p>;
  if (!event) return <p>이벤트를 찾을 수 없습니다.</p>;

  const images = event.images || [];

  const handleRight = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return <p>이미지가 없습니다.</p>;

  return (
    <ImageWrapper>
      {images.length > 1 && <LeftBtn onClick={handleLeft} src={Button} />}

      <TopImg
        src={images[currentIndex].imageUrl}
        alt={`이미지 ${currentIndex + 1}`}
      />

      {images.length > 1 && <RightBtn onClick={handleRight} src={Button} />}

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
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await detailBoard(eventId); // API 호출
        setEvent(data); // API에서 받아온 이벤트 데이터 저장
        console.log("title", data.title);
        console.log("eventType", data.eventType);
        console.log("location", data.location);
        console.log("favoriteCount", data.favoriteCount);
      } catch (error) {
        console.error("이벤트 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) return <p>로딩 중...</p>;
  if (!event) return <p>이벤트를 찾을 수 없습니다.</p>;

  const getEventTypeLabel = (type) => {
    switch (type) {
      case "FLEA_MARKET":
        return "플리마켓";
      case "FESTIVAL":
        return "축제";
      case "CULTURE_ART":
        return "문화•예술";
      case "OUTDOOR_ACTIVITY":
        return "야외활동";
      case "VOLUNTEER":
        return "자원봉사";
      case "STORE_EVENT":
        return "가게행사";
      case "EDUCATION":
        return "교육";
      default:
        return "기타";
    }
  };

  return (
    <BodyTopDiv>
      <div>
        <CategoryMark>{getEventTypeLabel(event.eventType)}</CategoryMark>
        <TitleP>{event.title}</TitleP>
        <LoccationP>{event.location}</LoccationP>
        <DateP>
          {`${dayjs(event.startAt).format("YYYY.MM.DD.(dd)")} ~ ${dayjs(
            event.endAt
          ).format("YYYY.MM.DD.(dd)")} ${dayjs(event.startAt).format(
            "HH:mm"
          )}~${dayjs(event.endAt).format("HH:mm")}`}
        </DateP>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <FavoriteCountP>{event.favoriteCount}</FavoriteCountP>
        <HeartImg
          src={event.liked ? FullHeart : Heart}
          alt="하트"
          style={{ cursor: "pointer", width: "24px", height: "24px" }}
          onClick={async () => {
            try {
              const res = await privateAPI.post(
                `/events/${event.eventId}/favorites`
              );
              const { favoriteCount, favorite } = res.data.data;

              // 이벤트 상태 업데이트
              setEvent((prev) => ({
                ...prev,
                liked: favorite, // 서버 liked 값 반영
                favoriteCount: favoriteCount,
              }));
            } catch (error) {
              console.error("하트 클릭 에러:", error);
            }
          }}
        />
      </div>
    </BodyTopDiv>
  );
}
function BodyMiddle({ children }) {
  return <div>{children}</div>;
}
function MiddleWho() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const detailData = await detailBoard(eventId); // 이벤트 정보
        // imgData 필요 없음, detailData.data 안에 userImage 포함
        setEventData({
          username: detailData.username,
          userImage: detailData.userImage,
        });
      } catch (error) {
        console.error("이벤트 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) return <p>로딩 중...</p>;
  if (!eventData) return <p>데이터를 찾을 수 없습니다.</p>;

  return (
    <UserDiv>
      <UserImg src={eventData.userImage} alt="유저 이미지" />
      <UserNickName>{eventData.username}</UserNickName>
      <ChatBtn>
        대화하기
        <ChatImg src={Chat} />
      </ChatBtn>
    </UserDiv>
  );
}

function TabMenu() {
  const [activeTab, setActiveTab] = useState("내용");

  const tabs = [
    { name: "내용", icon: ContentsImg, activeIcon: OnContentsImg },
    { name: "댓글", icon: CommentImg, activeIcon: OnCommentImg },
    { name: "마실 모임", icon: GroupImg, activeIcon: OnGroupImg },
  ];

  return (
    <TabContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab.name}
          active={activeTab === tab.name}
          onClick={() => setActiveTab(tab.name)}
        >
          <img
            src={activeTab === tab.name ? tab.activeIcon : tab.icon}
            alt={tab.name}
            style={{ width: "24px", height: "24px" }} // 필요 시 아이콘 크기 조절
          />
          <span>{tab.name}</span>
        </TabButton>
      ))}
    </TabContainer>
  );
}
function LowCopoments({ children }) {
  return <div>{children}</div>;
}
function DetailContent() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summaryDone, setSummaryDone] = useState(false); // 요약 완료 상태

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await detailBoard(eventId);
        setEvent(data);
        console.log("content", data.content);
        console.log("summary", data.summary);
      } catch (error) {
        console.error("이벤트 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (!event) return <p>이벤트를 찾을 수 없습니다.</p>;

  return (
    <DetailDiv>
      <div>
        <SummaryBtn
          summaryDone={summaryDone}
          onClick={() => setSummaryDone((prev) => !prev)}
        >
          {summaryDone ? (
            <>
              <SummaryImgSize src={OnSummaryImg} alt="summary" />
              AI 요약 완료
            </>
          ) : (
            <>
              AI 요약하기
              <SummaryImgSize src={SummaryImg} alt="summary" />
            </>
          )}
        </SummaryBtn>
      </div>
      <DetailPart>
        <DetailText>{summaryDone ? event.summary : event.content}</DetailText>
      </DetailPart>
    </DetailDiv>
  );
}

function UserChat() {
  return (
    <div>
      <div>
        <img src />
      </div>
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
DetailBoard.LowCopoments = LowCopoments;
DetailBoard.DetailContent = DetailContent;
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
