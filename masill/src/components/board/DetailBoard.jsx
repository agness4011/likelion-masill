import BackImg from "../../assets/detail/Arrow-Left.svg";
import Pencil from "../../assets/detail/pencil.png";
import TrashIcon from "../../assets/logo/mainImg/trash.svg";
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
import Hat from "../../assets/detail/hat.svg";

import { useState, useEffect } from "react";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import styled from "styled-components";
import { useUser } from "../../contexts/UserContext";

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
import { startEventChat, startCommentChat } from "../../api/chatService";
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
  CancelBtn,
  CommentWrapper,
  ReplyComment,
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
  const location = useLocation();
  const { eventId } = useParams();
  const { userData } = useUser();
  const [isAuthor, setIsAuthor] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const checkIfAuthor = async () => {
      try {
        const data = await detailBoard(eventId);
        setEventData(data);

        const isAuthorized = data.author === true;
        setIsAuthor(isAuthorized);
      } catch (error) {
        console.error("게시글 작성자 확인 실패:", error);
        setIsAuthor(false);
      }
    };

    checkIfAuthor();
  }, [eventId, userData]);

  const handleBack = () => {
    navigate("/main");
  };

  const handleEditClick = () => {
    navigate(`/board/${eventId}`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await privateAPI.delete(`/events/${eventId}`);
      navigate("/main/event");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <LowHeaderContainer>
      <BackBtn src={BackImg} alt="페이지 뒤로 가는 버튼" onClick={handleBack} />
      {isAuthor && (
        <>
          <PencilBtn
            src={Pencil}
            alt="수정 버튼"
            onClick={handleEditClick}
            style={{ cursor: "pointer" }}
          />
          <PencilBtn
            src={TrashIcon}
            alt="삭제 버튼"
            onClick={handleDeleteClick}
            style={{ cursor: "pointer" }}
          />
        </>
      )}
      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <ModalBackground>
          <div
            style={{
              position: "fixed",
              left: "50%",
              bottom: 0,
              transform: "translateX(-50%)",
              width: "393px",
              height: "250px",
              backgroundColor: "white",
              borderRadius: "18px 18px 0 0",
              padding: "24px",
              textAlign: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#000",
                marginBottom: "16px",
              }}
            >
              알림
            </div>
            <div
              style={{
                width: "120%",
                height: "1px",
                backgroundColor: "#E5E5EA",
                marginBottom: "16px",
                marginLeft: "-10%",
              }}
            ></div>
            <div
              style={{
                fontSize: "16px",
                color: "#000",
                marginBottom: "24px",
                lineHeight: "45px",
              }}
            >
              정말 게시물을 삭제하시겠어요?
            </div>
            <div
              style={{
                display: "flex",
                gap: "24px",
                justifyContent: "center",
              }}
            >
              <button
                onClick={handleDeleteCancel}
                style={{
                  width: "140px",
                  height: "44px",
                  border: "none",
                  borderRadius: "17px",
                  backgroundColor: "#CDDBFF",
                  color: "#727C94",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                취소
              </button>
              <button
                onClick={handleDeleteConfirm}
                style={{
                  width: "140px",
                  height: "44px",
                  border: "none",
                  borderRadius: "17px",
                  backgroundColor: "#E60624",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <img
                  src={TrashIcon}
                  alt="삭제"
                  style={{
                    width: "18px",
                    height: "18px",
                    filter: "brightness(0) invert(1)",
                  }}
                />
                삭제하기
              </button>
            </div>
          </div>
        </ModalBackground>
      )}
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          margin: "0",
        }}
      >
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
  const navigate = useNavigate();
  const { userData } = useUser(); // 현재 로그인한 사용자 정보
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const detailData = await detailBoard(eventId); // 이벤트 정보
        // imgData 필요 없음, detailData.data 안에 userImage 포함
        setEventData({
          username: detailData.username,
          userImage: detailData.userImage,
          userId: detailData.userId,
          author: detailData.author,
          businessVerified: detailData.businessVerified, // ✅ 추가
        });
      } catch (error) {
        console.error("이벤트 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  // 채팅방 생성/조회 함수
  const handleStartChat = async () => {
    if (chatLoading) return;

    // 로그인 상태 확인 (accessToken도 함께 확인)
    const accessToken = localStorage.getItem("accessToken");
    if (!userData || !accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      setChatLoading(true);

      try {
        // 이벤트 작성자와 채팅 시작

        const response = await startEventChat(eventId);

        if (response && response.success && response.data) {
          const roomId = response.data.roomId;

          // 생성된 채팅방으로 이동
          navigate(`/chat/room/${roomId}`);
        } else {
          alert("채팅방 생성에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("채팅방 생성 API 에러:", error);
        console.error("에러 응답:", error.response?.data);
        console.error("에러 상태:", error.response?.status);

        // 에러 메시지 표시
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "채팅방 생성에 실패했습니다.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("채팅방 생성 전체 실패:", error);
      alert("채팅방을 생성할 수 없습니다.");
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (!eventData) return <p>데이터를 찾을 수 없습니다.</p>;

  return (
    <UserDiv>
      {eventData.businessVerified && <CeoMark src={Hat} />}
      <UserImg src={eventData.userImage} alt="유저 이미지" />
      <UserNickName>{eventData.username}</UserNickName>

      {!eventData.author && (
        <ChatBtn
          onClick={handleStartChat}
          disabled={chatLoading}
          style={{
            cursor: chatLoading ? "not-allowed" : "pointer",
            opacity: chatLoading ? 0.6 : 1,
          }}
        >
          {chatLoading ? "채팅방 생성 중..." : "대화하기"}
          <ChatImg src={Chat} />
        </ChatBtn>
      )}
    </UserDiv>
  );
}

const CeoMark = styled.img`
  position: absolute;
  top: -11px; /* 프로필 이미지 위에 걸치도록 */
  left: 1px;
  width: 20px;
  height: 20px;
  z-index: 10;
`;

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
          $active={activeTab === tab.name} // ✅ 변경
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
      <div style={{ justifyContent: "space-between" }}>
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

        if (items && items.length > 0) {
        }

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
  // 대댓글이 추가될 때 댓글 배열의 replyCommentCount 업데이트
  useEffect(() => {
    if (!replies) return;

    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (replies[comment.commentId]) {
          // 현재 대댓글 배열 길이 반영
          return {
            ...comment,
            replyCommentCount: replies[comment.commentId].length,
          };
        }
        return comment;
      })
    );
  }, [replies]);

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const handleReplyAdded = (newReply, parentId) => {
    setReplies((prev) => ({
      ...prev,
      [parentId]: [...(prev[parentId] || []), newReply],
    }));
  };

  // 로컬에서 로그인한 사용자 닉네임 가져오기
  const currentNickname = localStorage.getItem("nickname"); // 또는 로그인 정보에 맞는 key 사용

  const handleProfileClick = (user, commentId) => {
    // 자기 자신이면 모달 열지 않음
    if (user.username === currentNickname) {
      return;
    }

    setSelectedUser({ ...user, commentId });
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

        if (items && items.length > 0) {
        }

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
    <div
      style={{
        position: "relative",
        paddingBottom: "150px", // 입력창 높이 + 여유 공간
      }}
    >
      {comments.length === 0 ? (
        <p style={{ textAlign: "center" }}>작성된 댓글이 없습니다.</p>
      ) : (
        comments.map((comment) => (
          <CommentWrapper key={comment.commentId}>
            {/* 프로필 클릭 시 모달 */}
            <div style={{ marginTop: "26px", display: "flex", gap: "14px" }}>
              <CommentUserImg
                src={comment.userProfileImageUrl}
                alt={comment.username}
                onClick={() =>
                  handleProfileClick(
                    {
                      username: comment.username,
                      userProfileImageUrl: comment.userProfileImageUrl,
                    },
                    comment.commentId
                  )
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
                  {/* 댓글 영역에서 AddReplyMessage 제거 */}
                  <AdditionReply
                    onClick={() => setReplyTarget(comment.commentId)}
                  >
                    답글달기
                  </AdditionReply>

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
                          marginRight: "28px",
                        }}
                      >
                        <CommentUserImg
                          src={reply.userProfileImageUrl} // reply 객체 사용
                          alt={reply.username} // reply 객체 사용
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleProfileClick(
                              {
                                username: reply.username, // reply 객체
                                userProfileImageUrl: reply.userProfileImageUrl, // reply 객체
                              },
                              reply.replyId || reply.commentId // reply 고유 ID
                            )
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
                          <ReplyComment>{reply.content}</ReplyComment>
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
          </CommentWrapper>
        ))
      )}

      {/* 댓글 입력 */}
      {/* 하단 입력창 하나만 사용 */}
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
          parentCommentId={replyTarget} // null이면 댓글, 숫자면 대댓글
          onReplyAdded={handleReplyAdded}
          onCancel={() => setReplyTarget(null)} // 취소 시 일반 댓글 모드
        />
      </div>

      {/* ChatModal */}
      {chatModalOpen && selectedUser && (
        <ChatModal
          user={selectedUser}
          onClose={handleCloseModal}
          commentId={selectedUser.commentId}
        />
      )}
    </div>
  );
}

function AddCommentMessage({
  eventId,
  onCommentAdded,
  parentCommentId,
  onReplyAdded,
  onCancel,
}) {
  const [comment, setComment] = useState("");
  const { userData } = useUser();

  const handleAdd = async () => {
    if (!comment.trim()) return;

    try {
      if (parentCommentId) {
        // 대댓글 작성
        const newReply = await addReply(eventId, parentCommentId, comment);
        if (onReplyAdded) onReplyAdded(newReply, parentCommentId);
      } else {
        // 일반 댓글 작성
        const newComment = await addComment(eventId, comment);
        if (onCommentAdded) onCommentAdded(newComment);
      }
      setComment("");
      if (onCancel && parentCommentId) onCancel(); // 대댓글 작성 후 입력창 초기화
    } catch (error) {
      console.error(
        parentCommentId ? "대댓글 작성 실패" : "댓글 작성 실패",
        error
      );
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "8px",

          justifyContent: "space-between" /* 양 끝으로 정렬하는 예시 */,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <CommentUserImg
            src={
              userData?.profileImage ||
              "https://via.placeholder.com/32x32?text=?"
            }
            alt="내 프로필"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              margin: "0",
            }}
          />
          <span
            style={{
              fontSize: "14px",
              color: "#666",
              margin: "0",
            }}
          >
            {userData?.nickname || "사용자"}
          </span>
        </div>

        {parentCommentId && (
          <CancelBtn onClick={onCancel}>취소</CancelBtn> // 취소 버튼
        )}
      </div>

      <KeyboardDiv>
        <KeyboardInput
          type="text"
          placeholder={
            parentCommentId ? "대댓글을 입력하세요" : "댓글을 입력하세요"
          }
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <KeyboardBtn src={KeyboardButton} onClick={handleAdd} />
      </KeyboardDiv>
    </div>
  );
}

function ChatModal({ user, onClose, commentId }) {
  const modalRoot = document.getElementById("modal-root");
  const navigate = useNavigate();
  const { userData } = useUser();
  const [chatLoading, setChatLoading] = useState(false);

  if (!modalRoot) return null;

  const handleStartChat = async () => {
    if (chatLoading) return;

    // commentId 확인
    if (!commentId) {
      console.error("commentId가 없습니다:", commentId);
      alert("댓글 정보를 찾을 수 없습니다.");
      return;
    }

    // 로그인 상태 확인
    const accessToken = localStorage.getItem("accessToken");
    if (!userData || !accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      setChatLoading(true);

      const response = await startCommentChat(commentId);

      if (response && response.success && response.data) {
        const roomId = response.data.roomId;

        // 생성된 채팅방으로 이동
        navigate(`/chat/room/${roomId}`);
      } else {
        alert("채팅방 생성에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("댓글 채팅방 생성 API 에러:", error);
      console.error("에러 응답:", error.response?.data);
      console.error("에러 상태:", error.response?.status);

      // 에러 메시지 표시
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "채팅방 생성에 실패했습니다.";
      alert(errorMessage);
    } finally {
      setChatLoading(false);
    }
  };

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
            <GoChat
              onClick={handleStartChat}
              disabled={chatLoading}
              style={{
                cursor: chatLoading ? "not-allowed" : "pointer",
                opacity: chatLoading ? 0.6 : 1,
              }}
            >
              {chatLoading ? "채팅방 생성 중..." : "채팅하기"}
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
          <p style={{ textAlign: "center" }}>소모임을 불러오는 중...</p>
        ) : groups.length > 0 ? (
          groups.map((group) => (
            <div
              style={{
                borderTop: "0.5px solid var(--Gray-500, #c1cae0)",
                borderBottom: "0.5px solid var(--Gray-500, #c1cae0)",
              }}
              key={group.clubId}
              onClick={() =>
                navigate(`/detail/${eventId}/clubId/${group.clubId}`)
              }
            >
              <GroupComponent>
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
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>아직 등록된 소모임이 없습니다.</p>
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
