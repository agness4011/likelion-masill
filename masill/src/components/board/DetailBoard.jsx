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
import KeyboardButton from "../../assets/detail/keyboard.png";
import Aply from "../../assets/detail/aply.png";
import GoChatRoom from "../../assets/detail/gochatroom.svg";

import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import styled from "styled-components";

import { eventData } from "../../dummy/datas";
import { chatDat } from "../../dummy/chat";
import {
  detailBoard,
  detailImg,
  commentBoards,
  addComment,
  showReplies,
  addReply,
  fetchSmallGroup,
  smallFavorite,
} from "../../api/boardApi";
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
  KeyboardInput,
  KeyboardDiv,
  KeyboardBtn,
  ReplyKeyboard,
  ReplyKeyboardDiv,
  ReplyKeyboardBtn,
  CommentUserImg,
  CommentUserName,
  CommentContent,
  CommentWriteTime,
  AdditionReply,
  ShowReply,
  MakeGroupBtn,
  MakeGroupImg,
  GroupEventID,
  GroupTitle,
  GroupHeart,
  GroupSummary,
  GroupMainImage,
  GroupComponent,
  GroupCommentImg,
  GroupCommentNum,
  GroupUserImg,
  GroupBottomRow,
  GroupRight,
  GroupTopRow,
  GroupUserAndText,
  GroupTextBox,
  LowWrapper,
  ModalContainer,
  ModalTitle,
  ModalBackground,
  ModalProfile,
  ProfileP,
  ProfileNickName,
  Close,
  GoChat,
  GoChatImg,
  ButtonWrapper,
  BorderLine,
  ModalMain,
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

function TabMenu({ activeTab, setActiveTab }) {
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
            style={{ width: "24px", height: "24px" }}
          />
          <span>{tab.name}</span>
        </TabButton>
      ))}
    </TabContainer>
  );
}

function LowCopoments({ children }) {
  return <LowWrapper>{children}</LowWrapper>;
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
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

function UserChat() {
  const { eventId } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replies, setReplies] = useState({});
  const [replyTarget, setReplyTarget] = useState(null);

  // 모달 상태
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // { username, userProfileImageUrl }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const items = await commentBoards(eventId);
        setComments(items);
      } catch (error) {
        console.error("댓글 조회 실패", error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [eventId]);

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const handleReplyAdded = (newReply, parentId) => {
    setReplies((prev) => ({
      ...prev,
      [parentId]: [...(prev[parentId] || []), newReply],
    }));
  };

  const handleProfileClick = (user) => {
    setSelectedUser(user);
    setChatModalOpen(true);
  };

  const handleCloseModal = () => {
    setChatModalOpen(false);
    setSelectedUser(null);
  };

  const clickReply = async (commentId) => {
    try {
      if (replies[commentId]) {
        setReplies((prev) => {
          const updated = { ...prev };
          delete updated[commentId];
          return updated;
        });
      } else {
        const items = await showReplies(eventId, commentId);
        setReplies((prev) => ({ ...prev, [commentId]: items }));
      }
    } catch (error) {
      console.error("대댓글 조회 실패", error);
    }
  };

  const formatRelativeTime = (date) => {
    const now = dayjs().tz("Asia/Seoul");
    const created = dayjs.utc(date).tz("Asia/Seoul");
    const diffMinutes = now.diff(created, "minute");
    const diffHours = now.diff(created, "hour");
    const diffDays = now.diff(created, "day");

    if (diffMinutes < 1) return "방금 전";
    if (diffMinutes < 60) return `${diffMinutes}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    return `${diffDays}일 전`;
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div style={{ position: "relative", paddingBottom: "60px" }}>
      {comments.length === 0 ? (
        <p>작성된 댓글이 없습니다.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.commentId}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              marginBottom: "12px",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            {/* 프로필 클릭 시 모달 */}
            <CommentUserImg
              src={comment.userProfileImageUrl}
              alt={comment.username}
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleProfileClick({
                  username: comment.username,
                  userProfileImageUrl: comment.userProfileImageUrl,
                })
              }
            />

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  height: "20px",
                }}
              >
                <CommentUserName>{comment.username}</CommentUserName>
                <CommentWriteTime>
                  • {formatRelativeTime(comment.createdAt)}
                </CommentWriteTime>
              </div>

              <CommentContent>{comment.content}</CommentContent>

              {/* 답글 영역 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "6px",
                  gap: "4px",
                }}
              >
                <AdditionReply
                  onClick={() => setReplyTarget(comment.commentId)}
                >
                  답글달기
                </AdditionReply>

                {replyTarget === comment.commentId && (
                  <AddReplyMessage
                    eventId={eventId}
                    parentCommentId={comment.commentId}
                    onReplyAdded={handleReplyAdded}
                    onCancel={() => setReplyTarget(null)}
                  />
                )}

                {/* 대댓글 렌더링 */}
                {replies[comment.commentId] &&
                  replies[comment.commentId].map((reply) => (
                    <div
                      key={reply.replyId || reply.commentId}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        marginTop: "10px",
                        marginLeft: "40px",
                      }}
                    >
                      <CommentUserImg
                        src={reply.userProfileImageUrl}
                        alt={reply.username}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleProfileClick({
                            username: reply.username,
                            userProfileImageUrl: reply.userProfileImageUrl,
                          })
                        }
                      />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            height: "20px",
                          }}
                        >
                          <CommentUserName>{reply.username}</CommentUserName>
                          <CommentWriteTime>
                            • {formatRelativeTime(reply.createdAt)}
                          </CommentWriteTime>
                        </div>
                        <CommentContent>{reply.content}</CommentContent>
                      </div>
                    </div>
                  ))}
                {comment.replyCommentCount > 0 && (
                  <ShowReply onClick={() => clickReply(comment.commentId)}>
                    <img src={Aply} alt="reply icon" />
                    {replies[comment.commentId]
                      ? "답글 숨기기"
                      : `답글 ${comment.replyCommentCount}개 더보기`}
                  </ShowReply>
                )}
              </div>
            </div>
          </div>
        ))
      )}

      {/* 댓글 입력 */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#fff",
          padding: "8px 16px",
          borderTop: "1px solid #ddd",
          boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <AddCommentMessage
          eventId={eventId}
          onCommentAdded={handleCommentAdded}
        />
      </div>

      {/* ChatModal */}
      {chatModalOpen && selectedUser && (
        <ChatModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
}

function AddCommentMessage({ eventId, onCommentAdded }) {
  const [comment, setComment] = useState("");
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    try {
      const newComment = await addComment(eventId, comment);
      setComment("");
      if (onCommentAdded) onCommentAdded(newComment);
    } catch (error) {
      console.error("댓글 작성 실패", error);
    }
  };
  return (
    <div>
      {" "}
      <KeyboardDiv>
        {" "}
        <KeyboardInput
          type="text"
          placeholder="댓글을 입력하세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />{" "}
        <KeyboardBtn src={KeyboardButton} onClick={handleAddComment} />{" "}
      </KeyboardDiv>{" "}
    </div>
  );
}
function AddReplyMessage({ eventId, parentCommentId, onReplyAdded, onCancel }) {
  const [content, setContent] = useState("");

  const handleAddReply = async () => {
    if (!content.trim()) return;

    try {
      const newReply = await addReply(eventId, parentCommentId, content);
      if (onReplyAdded) onReplyAdded(newReply, parentCommentId);
      setContent("");
      if (onCancel) onCancel(); // 입력창 닫기
    } catch (error) {
      console.error("대댓글 작성 실패", error);
    }
  };

  return (
    <div style={{ marginLeft: "40px", marginTop: "6px" }}>
      <ReplyKeyboardDiv>
        <ReplyKeyboard
          type="text"
          placeholder="답글을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ReplyKeyboardBtn src={KeyboardButton} onClick={handleAddReply} />
      </ReplyKeyboardDiv>
    </div>
  );
}
function ChatModal({ user, onClose }) {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <BorderLine>
          <ModalTitle>유저 프로필</ModalTitle>
        </BorderLine>
        <ModalMain>
          <ModalProfile src={user.userProfileImageUrl} alt={user.username} />
          <ProfileNickName>{user.username}</ProfileNickName>

          {/* 버튼 영역 */}
          <ButtonWrapper>
            <Close onClick={onClose}>닫기</Close>
            <GoChat>
              채팅하기
              <GoChatImg src={GoChatRoom} alt="채팅" />
            </GoChat>
          </ButtonWrapper>
        </ModalMain>
      </ModalContainer>
    </ModalBackground>,
    modalRoot
  );
}

function Group() {
  const { eventId } = useParams();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventTitle, setEventTitle] = useState("");
  const navigate = useNavigate(); // navigate 추가

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const res = await fetchSmallGroup(eventId);
        if (res?.data?.content) {
          setGroups(res.data.content);
        } else {
          setGroups([]);
        }
      } catch (error) {
        console.error("소모임 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchEvent = async () => {
      try {
        const data = await detailBoard(eventId);
        setEventTitle(data.title);
      } catch (error) {
        console.error("이벤트 title 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
    loadGroups();
  }, [eventId]);

  const clickHeart = async (e, clubId) => {
    e.stopPropagation(); // 부모 클릭 전파 방지
    try {
      const res = await smallFavorite(eventId, clubId);
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.clubId === clubId
            ? {
                ...group,
                liked: res.favorite,
                favoriteCount: res.favoriteCount,
              }
            : group
        )
      );
    } catch (error) {
      console.error("좋아요 실패:", error);
    }
  };

  return (
    <div>
      <MakeGroupBtn onClick={() => navigate(`/writeSmallGroup/${eventId}`)}>
        모임 만들기
        <MakeGroupImg src={GroupImg} />
      </MakeGroupBtn>

      <div>
        {loading ? (
          <p>소모임을 불러오는 중...</p>
        ) : groups.length > 0 ? (
          groups.map((group) => (
            <GroupComponent
              key={group.clubId}
              onClick={() =>
                navigate(`/detail/${eventId}/clubId/${group.clubId}`)
              }
            >
              <GroupMainImage src={group.coverImage} alt="cover" />
              <GroupRight>
                {/* 상단 영역 */}
                <GroupTopRow>
                  <GroupUserAndText>
                    <GroupUserImg src={group.userImage} alt="user" />
                    <GroupTextBox>
                      <GroupEventID>{eventTitle}</GroupEventID>
                      <GroupTitle>{group.title}</GroupTitle>
                    </GroupTextBox>
                  </GroupUserAndText>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <GroupHeart
                      src={group.liked ? FullHeart : Heart}
                      alt="heart"
                      onClick={(e) => clickHeart(e, group.clubId)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </GroupTopRow>

                {/* 중단 영역 */}
                <GroupSummary>{group.content}</GroupSummary>

                {/* 하단 영역 */}
                <GroupBottomRow>
                  <GroupCommentImg src={CommentImg} alt="comment" />
                  <GroupCommentNum>{group.commentCount}</GroupCommentNum>
                </GroupBottomRow>
              </GroupRight>
            </GroupComponent>
          ))
        ) : (
          <p>아직 등록된 소모임이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
DetailBoard.ChatModal = ChatModal;
DetailBoard.LowCopoments = LowCopoments;
DetailBoard.DetailContent = DetailContent;
DetailBoard.BodyTop = BodyTop;
DetailBoard.LowBody = LowBody;
DetailBoard.Low = Low;
DetailBoard.UserChat = UserChat;
DetailBoard.High = Hight;
DetailBoard.LowHead = LowHead;
DetailBoard.ShowImage = ShowImage;
DetailBoard.BodyMiddle = BodyMiddle;
DetailBoard.MiddleWho = MiddleWho;
DetailBoard.TabMenu = TabMenu;
DetailBoard.Group = Group;
