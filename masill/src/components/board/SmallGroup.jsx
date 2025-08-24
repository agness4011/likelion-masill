import BackImg from "../../assets/detail/Arrow-Left.svg";
import Pencil from "../../assets/detail/pencil.png";
import Button from "../../assets/detail/Button.png";
import FullHeart from "../../assets/detail/fullheart.png";
import Heart from "../../assets/detail/heart.png";
import Chat from "../../assets/detail/chat.png";
import CommentImg from "../../assets/detail/comment.png";
import ContentsImg from "../../assets/detail/contents.png";
import OnCommentImg from "../../assets/detail/oncomment.png";
import OnContentsImg from "../../assets/detail/onContents.png";
import KeyboardButton from "../../assets/detail/keyboard.png";
import Aply from "../../assets/detail/aply.png";
import GoChatRoom from "../../assets/detail/gochatroom.svg";
import DeleteImg from "../../assets/detail/delete.png";
import TrashImgBtn from "../../assets/detail/trash.png";

import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import styled from "styled-components";
import {
  smallGroupDetail,
  commentSmallGroups,
  addSmallGroupComment,
  showSmallGroupReplies,
  addSmallGroupReply,
  deleteSmallGroup,
  detailBoard,
} from "../../api/boardApi";
import { privateAPI } from "../../api/axios";
import { startCommentChat, startClubChat } from "../../api/chatService";

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
  DetailPart,
  TitleP,
  LoccationP,
  DateP,
  BodyTopDiv,
  UserImg,
  UserNickName,
  ChatImg,
  ChatBtn,
  UserDiv,
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
  LowWrapper,
  ModalContainer,
  ModalTitle,
  ModalBackground,
  Close,
  ButtonWrapper,
  BorderLine,
  ModalMain,
  ModalProfile,
  ProfileP,
  GoChat,
  ProfileNickName,
  EventTitle,
  ReadMoreBtn,
  DeleteBtn,
  BtnDiv,
  TrashImg,
  DeleteButton,
  ModalWarning,
  GoChatImg,
  DeleteModalContaier,
  DeleteModalMain,
  CommentWrapper,
  CancelBtn,
} from "./SmallGroup.styled";

export default function SmallGroup({ children }) {
  return <div>{children}</div>;
}

function Hight({ children }) {
  return <div>{children}</div>;
}

function ShowImage() {
  const { eventId, clubId } = useParams();
  const [club, setClub] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await smallGroupDetail(eventId, clubId); // privateAPI 여부 확인
        setClub(data);
      } catch (error) {
        console.error("이벤트 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId, clubId]);

  if (loading) return <p>로딩 중...</p>;
  if (!club) return <p>이벤트를 찾을 수 없습니다.</p>;

  const images = club.images || [];

  if (images.length === 0) return <p>이미지가 없습니다.</p>;

  return (
    <ImageWrapper>
      {images.length > 1 && (
        <LeftBtn
          onClick={() =>
            setCurrentIndex(
              (prev) => (prev - 1 + images.length) % images.length
            )
          }
          src={Button}
        />
      )}
      <TopImg src={images[currentIndex]} alt={`이미지 ${currentIndex + 1}`} />
      {images.length > 1 && (
        <RightBtn
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
          src={Button}
        />
      )}
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
  const { eventId, clubId } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 모달 상태

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await smallGroupDetail(eventId, clubId);
        setClub(data);
      } catch (error) {
        console.error("이벤트 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId, clubId]);

  const handleDelete = async () => {
    try {
      await deleteSmallGroup(eventId, clubId);
      navigate(`/detail/${eventId}`);
    } catch (error) {
      console.error("소모임 삭제 실패:", error);
    } finally {
      setShowDeleteModal(false); // 모달 닫기
    }
  };

  return (
    <LowHeaderContainer>
      <BackBtn
        src={BackImg}
        alt="페이지 뒤로 가는 버튼"
        onClick={() => navigate(`/detail/${eventId}`)}
      />
      {club?.author && (
        <BtnDiv>
          <PencilBtn
            src={Pencil}
            onClick={() => navigate(`retouchSmallGroup`)}
          />
          <DeleteBtn onClick={() => setShowDeleteModal(true)} src={DeleteImg} />
        </BtnDiv>
      )}

      {/* 삭제 모달 */}
      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete} // 실제 삭제 함수 전달
        />
      )}
    </LowHeaderContainer>
  );
}

// DeleteModal 수정
function DeleteModal({ onClose, onDelete }) {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalBackground onClick={onClose}>
      <DeleteModalContaier onClick={(e) => e.stopPropagation()}>
        <BorderLine>
          <ModalTitle>알림</ModalTitle>
        </BorderLine>
        <DeleteModalMain>
          <ModalWarning>정말 게시물을 삭제하시겠어요?</ModalWarning>
          <ButtonWrapper>
            <Close onClick={onClose}>취소</Close>
            <DeleteButton onClick={onDelete}>
              삭제하기
              <TrashImg src={TrashImgBtn} />
            </DeleteButton>
          </ButtonWrapper>
        </DeleteModalMain>
      </DeleteModalContaier>
    </ModalBackground>,
    modalRoot
  );
}
function LowBody({ children }) {
  return <div>{children}</div>;
}
function BodyTop() {
  const { eventId, clubId } = useParams(); // URL에서 eventId 가져오기
  const [club, setClub] = useState(null);
  const [loadingClub, setLoadingClub] = useState(true);

  const [mainEvent, setMainEvent] = useState(null);
  const [loadingMainEvent, setLoadingMainEvent] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const data = await smallGroupDetail(eventId, clubId);
        setClub(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingClub(false);
      }
    };

    const fetchMainEvent = async () => {
      try {
        const data = await detailBoard(eventId);
        setMainEvent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMainEvent(false);
      }
    };

    fetchClub();
    fetchMainEvent();
  }, [eventId, clubId]);

  if (loadingClub || loadingMainEvent) return <p>로딩 중...</p>;
  if (!club || !mainEvent) return <p>이벤트를 찾을 수 없습니다.</p>;

  return (
    <BodyTopDiv>
      <div style={{ display: "flex", gap: "6px" }}>
        <EventTitle>{mainEvent?.title || "로딩 중..."}</EventTitle>
        <ReadMoreBtn
          onClick={() => {
            navigate(`/detail/${eventId}`);
          }}
        >
          자세히 보기
        </ReadMoreBtn>
      </div>
      <div
        style={{ position: "relative", display: "inline-block", width: "100%" }}
      >
        <TitleP
          style={{
            paddingRight: "40px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {club?.title || "로딩 중..."}
        </TitleP>

        <HeartImg
          src={club?.liked ? FullHeart : Heart}
          alt="하트"
          style={{
            position: "absolute",
            right: "30px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
          onClick={async () => {
            if (!club) return;
            try {
              const res = await privateAPI.post(
                `/events/${eventId}/clubs/${clubId}/favorites`
              );
              const { favoriteCount, favorite } = res.data.data;

              setClub((prev) => ({
                ...prev,
                liked: favorite,
                favoriteCount: favoriteCount,
              }));
            } catch (error) {
              console.error("하트 클릭 에러:", error);
            }
          }}
        />
      </div>
      <div>
        <DateP>
          {club
            ? `${dayjs(club.startAt).format("YYYY.MM.DD.(dd)")}  ${dayjs(
                club.startAt
              ).format("HH:mm")}`
            : "로딩 중..."}
        </DateP>
        <LoccationP>{club?.location || "로딩 중..."}</LoccationP>
      </div>
    </BodyTopDiv>
  );
}

function BodyMiddle({ children }) {
  return <div>{children}</div>;
}
function MiddleWho() {
  const { eventId, clubId } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [club, setClub] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const detailData = await smallGroupDetail(eventId, clubId); // 이벤트 정보
        // imgData 필요 없음, detailData.data 안에 userImage 포함
        setEventData({
          username: detailData.username,
          userImage: detailData.userImage,
        });
        setClub(detailData);
      } catch (error) {
        console.error("이벤트 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId, clubId]);

  if (loading) return <p>로딩 중...</p>;
  if (!eventData) return <p>데이터를 찾을 수 없습니다.</p>;

  // 대화하기 버튼 클릭 핸들러
  const handleStartChat = async () => {
    if (chatLoading) return;

    try {
      setChatLoading(true);

      const response = await startClubChat(eventId, clubId);

      if (response?.data?.roomId) {
        navigate(`/chat/room/${response.data.roomId}`);
      } else {
        console.error("채팅방 ID를 찾을 수 없습니다:", response);
        alert("채팅방 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("채팅방 생성 실패:", error);
      alert(error.message || "채팅방 생성에 실패했습니다.");
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <UserDiv>
      <UserImg src={eventData.userImage} alt="유저 이미지" />
      <UserNickName>{eventData.username}</UserNickName>
      {!club?.author && (
        <ChatBtn onClick={handleStartChat} disabled={chatLoading}>
          {chatLoading ? "생성 중..." : "대화하기"}
          <ChatImg src={Chat} />
        </ChatBtn>
      )}
    </UserDiv>
  );
}

function TabMenu({ activeTab, setActiveTab }) {
  const tabs = [
    { name: "내용", icon: ContentsImg, activeIcon: OnContentsImg },
    { name: "댓글", icon: CommentImg, activeIcon: OnCommentImg },
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
  const { eventId, clubId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await smallGroupDetail(eventId, clubId);
        setEvent(data);
      } catch (error) {
        console.error("이벤트 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId, clubId]);

  if (!event) return <p>이벤트를 찾을 수 없습니다.</p>;

  return (
    <DetailDiv>
      <DetailPart>
        <DetailText>{event.content}</DetailText>
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
  const { eventId, clubId } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replies, setReplies] = useState({});
  const [replyTarget, setReplyTarget] = useState(null);

  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const currentNickname = localStorage.getItem("nickname");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const items = await commentSmallGroups(eventId, clubId);

        setComments(items);
      } catch (error) {
        console.error("댓글 조회 실패", error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [eventId, clubId]);

  useEffect(() => {
    setComments((prevComments) =>
      prevComments.map((comment) => ({
        ...comment,
        replyCommentCount:
          replies[comment.commentId]?.length || comment.replyCommentCount || 0,
      }))
    );
  }, [replies]);

  const handleCommentAdded = (newComment) =>
    setComments((prev) => [...prev, newComment]);
  const handleReplyAdded = (newReply, parentId) => {
    setReplies((prev) => ({
      ...prev,
      [parentId]: [...(prev[parentId] || []), newReply],
    }));
  };

  const handleProfileClick = (user, commentId) => {
    if (user.username === currentNickname) return;
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
        const items = await showSmallGroupReplies(eventId, clubId, commentId);
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
        paddingBottom: "150px",
      }}
    >
      {comments.length === 0 ? (
        <p style={{ textAlign: "center" }}>작성된 댓글이 없습니다.</p>
      ) : (
        comments.map((comment) => (
          <CommentWrapper key={comment.commentId}>
            <div style={{ display: "flex", gap: "14px", marginTop: "26px" }}>
              <CommentUserImg
                src={comment.userProfileImageUrl || "/default-profile.png"}
                alt={comment.username}
                onClick={() =>
                  handleProfileClick(
                    {
                      username: comment.username,
                      userProfileImageUrl:
                        comment.userProfileImageUrl || "/default-profile.png",
                    },
                    comment.commentId
                  )
                }
                onError={(e) => {
                  e.currentTarget.src = "/default-profile.png";
                }}
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

                  {replies[comment.commentId]?.map((reply) => (
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
                        src={
                          reply.userProfileImageUrl || "/default-profile.png"
                        }
                        alt={reply.username}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleProfileClick(
                            {
                              username: reply.username,
                              userProfileImageUrl:
                                reply.userProfileImageUrl ||
                                "/default-profile.png",
                            },
                            reply.replyId || reply.commentId
                          )
                        }
                        onError={(e) => {
                          e.currentTarget.src = "/default-profile.png";
                        }}
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
          </CommentWrapper>
        ))
      )}

      {/* 댓글/대댓글 입력창 */}
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
          clubId={clubId} // 👈 clubId 전달
          onCommentAdded={handleCommentAdded}
          parentCommentId={replyTarget}
          onReplyAdded={handleReplyAdded}
          onCancel={() => setReplyTarget(null)}
        />
      </div>

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
  clubId,
  parentCommentId,
  onCommentAdded,
  onReplyAdded,
  onCancel,
}) {
  const [comment, setComment] = useState("");

  // 로그인 정보 로컬스토리지에서 직접 가져오기
  const userData = JSON.parse(localStorage.getItem("currentUser")) || {};
  const profileImg = userData.profileImageUrl || "/default-profile.png";
  const nickname = userData.nickname || "사용자";

  const handleAdd = async () => {
    if (!comment.trim()) return;

    try {
      if (parentCommentId) {
        // 대댓글 작성
        const newReply = await addSmallGroupReply(
          eventId,
          clubId,
          parentCommentId,
          comment
        );
        onReplyAdded?.(newReply, parentCommentId);
        onCancel?.(); // 작성 후 입력창 초기화
      } else {
        // 일반 댓글 작성
        const newComment = await addSmallGroupComment(eventId, clubId, comment);
        onCommentAdded?.(newComment);
      }
      setComment("");
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
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CommentUserImg
            src={profileImg}
            alt={nickname}
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            onError={(e) => {
              e.currentTarget.src = "/default-profile.png";
            }}
          />
          <span style={{ fontSize: "14px", color: "#666" }}>{nickname}</span>
        </div>

        {parentCommentId && <CancelBtn onClick={onCancel}>취소</CancelBtn>}
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

function ChatModal({ user, onClose }) {
  console.log("=== ChatModal 컴포넌트 시작 ===");
  console.log("ChatModal props:", { user, onClose });
  console.log("user.commentId:", user?.commentId);
  console.log("user.username:", user?.username);

  const navigate = useNavigate();
  const [chatLoading, setChatLoading] = useState(false);
  const modalRoot = document.getElementById("modal-root");

  console.log("modalRoot 존재 여부:", !!modalRoot);
  if (!modalRoot) {
    console.log("modalRoot가 없어서 ChatModal 렌더링 중단");
    return null;
  }

  console.log("ChatModal 렌더링 계속...");

  const handleStartChat = async () => {
    console.log("=== handleStartChat 함수 호출됨 ===");
    console.log("chatLoading 상태:", chatLoading);
    console.log("user 객체:", user);
    console.log("user.commentId:", user.commentId);
    console.log("user.commentId 타입:", typeof user.commentId);

    if (chatLoading) {
      console.log("이미 로딩 중이므로 함수 종료");
      return;
    }

    if (!user.commentId) {
      console.error("commentId가 없습니다!");
      alert("댓글 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      console.log("로딩 상태를 true로 설정");
      setChatLoading(true);
      console.log("댓글 채팅 시작:", user.commentId);

      console.log("=== startCommentChat 함수 호출 전 ===");
      const response = await startCommentChat(user.commentId);
      console.log("=== startCommentChat 함수 호출 후 ===");
      console.log("댓글 채팅 시작 응답:", response);

      if (response.success && response.data?.roomId) {
        const roomId = response.data.roomId;
        console.log("생성된 채팅방 ID:", roomId);
        console.log("모달 닫기");
        onClose(); // 모달 닫기
        console.log("채팅방으로 이동:", `/chat/room/${roomId}`);
        navigate(`/chat/room/${roomId}`); // 채팅방으로 이동
      } else {
        console.error("채팅방 생성 실패:", response);
        alert("채팅방 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 채팅 시작 실패:", error);
      alert(error.message || "채팅방 생성에 실패했습니다.");
    } finally {
      console.log("로딩 상태를 false로 설정");
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("=== GoChat 버튼 클릭됨 ===");
                console.log("클릭 이벤트 객체:", e);
                console.log("chatLoading 상태:", chatLoading);
                console.log("handleStartChat 함수 호출");
                handleStartChat();
              }}
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

SmallGroup.ChatModal = ChatModal;
SmallGroup.LowCopoments = LowCopoments;
SmallGroup.DetailContent = DetailContent;
SmallGroup.BodyTop = BodyTop;
SmallGroup.LowBody = LowBody;
SmallGroup.Low = Low;
SmallGroup.High = Hight;
SmallGroup.LowHead = LowHead;
SmallGroup.ShowImage = ShowImage;
SmallGroup.BodyMiddle = BodyMiddle;
SmallGroup.MiddleWho = MiddleWho;
SmallGroup.TabMenu = TabMenu;
SmallGroup.UserChat = UserChat;
