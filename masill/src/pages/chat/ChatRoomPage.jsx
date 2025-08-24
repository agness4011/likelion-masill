// src/pages/chat/ChatRoomPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMyChatRooms, fetchChatRoom } from "../../api/chatService";
import { useUser } from "../../contexts/UserContext";
import {
  connectWebSocket,
  subscribe,
  disconnect,
  isConnected,
} from "../../utils/websocket";
import Avatar1Icon from "../../assets/logo/profile/avatar1.svg";
import Avatar2Icon from "../../assets/logo/profile/avatar2.svg";
import Avatar3Icon from "../../assets/logo/profile/avatar3.svg";
import Avatar4Icon from "../../assets/logo/profile/avatar4.svg";
import Avatar5Icon from "../../assets/logo/profile/avatar5.svg";
import Avatar6Icon from "../../assets/logo/profile/avatar6.svg";
import MainArrowLeftIcon from "../../assets/logo/main/main-arrowleft.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  max-width: 100vw;
  position: relative;

  /* 전체 페이지에서 가로 스크롤 방지 */
  & * {
    box-sizing: border-box;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin: 0;
  flex: 1;
  margin-left: 100px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;

  &:hover {
    opacity: 0.7;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const ChatRoomList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
`;

const ChatRoomItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #f8f9fa;
    transform: translateX(2px);
  }

  &:active {
    background-color: #e9ecef;
  }
`;

const ProfileImagesContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  position: relative;
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: white;
  overflow: hidden;
  margin-top: -40px;

  border: 2px solid white;
  z-index: 1;
`;

const OpponentAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: white;
  overflow: hidden;

  border: 2px solid white;
  margin-left: -25px;
  margin-top: 15px;
  z-index: 2;
`;

const UserAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const OpponentAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ChatRoomInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* 텍스트 오버플로우를 위한 설정 */
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #060d1d;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TimeDot = styled.div`
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: #959eb7;
`;

const TimeText = styled.span`
  font-size: 14px;
  color: #959eb7;
  font-weight: 400;
`;

const LastMessage = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(
    100vw - 160px
  ); /* 화면 너비에서 두 개의 아바타와 패딩을 뺀 값 */
  line-height: 1.2;
  width: 100%;
  display: block;
`;

const MessageTime = styled.div`
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UnreadBadge = styled.div`
  background: #154ad0;
  color: white;
  border-radius: 50%;
  padding: 2px 2px;
  font-size: 10px;
  font-weight: 600;
  min-width: 19px;
  text-align: center;
  right: 24px;
  position: fixed;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
  font-size: 14px;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #999;
  font-size: 14px;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

export default function ChatRoomPage() {
  const navigate = useNavigate();
  const { userData } = useUser();
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [websocketConnected, setWebsocketConnected] = useState(false);
  const subscriptionsRef = useRef([]);
  const isMountedRef = useRef(true);

  // 새 메시지 처리 함수
  const handleNewMessage = (data) => {
    // 데이터에서 roomId 추출 (여러 형식 지원)
    const roomId = data.roomId || data.chatRoomId || data.room_id;
    const content = data.content || data.message || data.text;
    const timestamp =
      data.timestamp || data.createdAt || new Date().toISOString();

    if (roomId && isMountedRef.current) {
      setChatRooms((prev) =>
        prev.map((room) => {
          if (room.roomId === roomId) {
            return {
              ...room,
              myUnreadCount: (room.myUnreadCount || 0) + 1,
              lastMessage: content,
              lastMessageAt: timestamp,
            };
          }
          return room;
        })
      );
    }
  };

  // 채팅방 목록 조회
  const fetchChatRooms = async () => {
    try {
      setLoading(true);
      const response = await getMyChatRooms({
        page: 1,
        size: 200,
        sortBy: "lastMessageAt",
        sortDir: "desc",
      });

      if (response.success && response.data) {
        const rooms = response.data.content || [];

        // 각 채팅방의 상세 정보를 가져와서 상대방 정보 추출 (개별 채팅방과 동일한 방식)
        const roomsWithUserInfo = await Promise.all(
          rooms.map(async (room) => {
            try {
              // 개별 채팅방과 동일한 방식으로 채팅방 상세 정보 조회
              const chatRoomResponse = await fetchChatRoom(room.roomId);

              if (
                chatRoomResponse &&
                chatRoomResponse.success &&
                chatRoomResponse.data
              ) {
                const chatRoomData = chatRoomResponse.data;

                // 새로운 API 응답 구조에 맞춰 상대방 정보 추출
                let targetUser = {
                  nickname: chatRoomData.targetUserNickname || "사용자",
                  profileImage: chatRoomData.targetUserProfileImageUrl || null,
                };

                const targetUserId = chatRoomData.targetUserId;

                return {
                  ...room,
                  targetUser,
                  targetUserId,
                };
              } else {
                // 상세 정보 조회 실패 시 기본 정보 사용

                let targetUser = {
                  nickname: room.targetUserNickname || "사용자",
                  profileImage: room.targetUserProfileImageUrl || null,
                };

                const targetUserId = room.targetUserId;

                return {
                  ...room,
                  targetUser,
                  targetUserId,
                };
              }
            } catch (error) {
              // 오류 발생 시 기본 정보 사용

              let targetUser = {
                nickname: room.targetUserNickname || "사용자",
                profileImage: room.targetUserProfileImageUrl || null,
              };

              const targetUserId = room.targetUserId;

              return {
                ...room,
                targetUser,
                targetUserId,
              };
            }
          })
        );

        setChatRooms(roomsWithUserInfo);
      } else {
        setError("채팅방 목록을 불러올 수 없습니다.");
      }
    } catch (err) {
      setError("채팅방 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 로컬 스토리지 이벤트 리스너 (다른 탭/창에서의 업데이트)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "chatRoomUpdate" && e.newValue) {
        try {
          const updateData = JSON.parse(e.newValue);

          if (updateData.type === "chatMessageSent" && isMountedRef.current) {
            // 해당 채팅방의 안읽은 수 증가
            setChatRooms((prev) =>
              prev.map((room) => {
                if (room.roomId === updateData.roomId) {
                  return {
                    ...room,
                    myUnreadCount: (room.myUnreadCount || 0) + 1,
                    lastMessage: updateData.messageContent,
                    lastMessageAt: updateData.timestamp,
                  };
                }
                return room;
              })
            );
          }
        } catch (error) {
          // 로컬 스토리지 데이터 파싱 오류 무시
        }
      }
    };

    // 커스텀 이벤트 리스너 (같은 탭에서의 업데이트)
    const handleChatMessageSent = (e) => {
      if (e.detail.type === "chatMessageSent" && isMountedRef.current) {
        setChatRooms((prev) =>
          prev.map((room) => {
            if (room.roomId === e.detail.roomId) {
              return {
                ...room,
                myUnreadCount: (room.myUnreadCount || 0) + 1,
                lastMessage: e.detail.messageContent,
                lastMessageAt: e.detail.timestamp,
              };
            }
            return room;
          })
        );
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("chatMessageSent", handleChatMessageSent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("chatMessageSent", handleChatMessageSent);
    };
  }, []);

  // WebSocket 연결 및 실시간 업데이트 설정
  useEffect(() => {
    const connectToWebSocket = () => {
      try {
        connectWebSocket(
          (client) => {
            setWebsocketConnected(true);

            // 채팅방 목록 업데이트 구독
            const chatRoomsUpdateSub = subscribe(
              "/user/queue/chat.rooms.update",
              (data) => {
                if (isMountedRef.current) {
                  fetchChatRooms();
                }
              }
            );

            // 일반적인 채팅 메시지 구독
            const generalChatSub = subscribe("/user/queue/chat", (data) => {
              if (isMountedRef.current) {
                // 채팅방 목록 새로고침
                fetchChatRooms();
              }
            });

            // 새 메시지 알림 구독 (여러 주제 시도)
            const newMessageSub1 = subscribe(
              "/user/queue/chat.messages.new",
              (data) => {
                if (isMountedRef.current) {
                  handleNewMessage(data);
                }
              }
            );

            const newMessageSub2 = subscribe("/user/queue/messages", (data) => {
              if (isMountedRef.current) {
                handleNewMessage(data);
              }
            });

            const newMessageSub3 = subscribe("/user/queue/chat", (data) => {
              if (isMountedRef.current) {
                handleNewMessage(data);
              }
            });

            // 안읽은 수 업데이트 구독
            const unreadCountSub = subscribe(
              "/user/queue/chat.rooms.unread",
              (data) => {
                if (isMountedRef.current) {
                  setChatRooms((prev) =>
                    prev.map((room) => {
                      if (room.roomId === data.roomId) {
                        return {
                          ...room,
                          myUnreadCount: data.unreadCount || 0,
                        };
                      }
                      return room;
                    })
                  );
                }
              }
            );

            // 구독 목록 저장
            subscriptionsRef.current = [
              chatRoomsUpdateSub,
              generalChatSub,
              newMessageSub1,
              newMessageSub2,
              newMessageSub3,
              unreadCountSub,
            ];
          },
          (error) => {
            setWebsocketConnected(false);
          },
          () => {
            setWebsocketConnected(false);
          }
        );
      } catch (error) {
        setWebsocketConnected(false);
      }
    };

    // WebSocket 연결 시도
    connectToWebSocket();

    // 초기 채팅방 목록 로드
    fetchChatRooms();

    // 주기적 새로고침 (백업 메커니즘)
    const intervalId = setInterval(() => {
      if (isMountedRef.current && websocketConnected) {
        fetchChatRooms();
      }
    }, 10000); // 10초마다

    // 컴포넌트 언마운트 시 정리
    return () => {
      isMountedRef.current = false;
      clearInterval(intervalId);
      // 구독 해제
      subscriptionsRef.current.forEach((sub) => {
        if (sub) {
          try {
            sub.unsubscribe();
          } catch (error) {
            // 구독 해제 실패 무시
          }
        }
      });
      // WebSocket 연결 해제
      disconnect();
    };
  }, []);

  // 채팅방 클릭 시 해당 채팅방으로 이동
  const handleChatRoomClick = (roomId, targetProfileImage) => {
    // 프로필 이미지가 있으면 URL 파라미터로 전달
    const profileImageParam = targetProfileImage
      ? `?profileImage=${encodeURIComponent(targetProfileImage)}`
      : "";
    navigate(`/chat/room/${roomId}${profileImageParam}`);
  };

  // 시간 포맷팅 함수 (상대적 시간 표시)
  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    let date;
    let isUtc = false;

    if (typeof timestamp === "string") {
      if (timestamp.includes("Z")) {
        date = new Date(timestamp);
        isUtc = true;
      } else if (timestamp.includes("T")) {
        date = new Date(timestamp + "Z");
        isUtc = true;
      } else {
        date = new Date(timestamp);
        isUtc = false;
      }
    } else {
      date = new Date(timestamp);
      isUtc = false;
    }

    if (isNaN(date.getTime())) {
      return "";
    }

    let koreanDate;
    if (isUtc) {
      koreanDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    } else {
      koreanDate = date;
    }

    // 현재 시간도 한국 시간으로 계산
    const now = new Date();
    const nowKorean = new Date(now.getTime() + 9 * 60 * 60 * 1000);

    const diffInMs = nowKorean - koreanDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));

    if (diffInMinutes < 1) {
      return "방금 전";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks}주 전`;
    } else {
      return `${Math.floor(diffInDays / 30)}개월 전`;
    }
  };

  // 정확한 시간 포맷팅 함수 (오전/오후 시:분)
  const formatExactTime = (timestamp) => {
    if (!timestamp) return "";

    let date;
    let isUtc = false;

    if (typeof timestamp === "string") {
      if (timestamp.includes("Z")) {
        date = new Date(timestamp);
        isUtc = true;
      } else if (timestamp.includes("T")) {
        date = new Date(timestamp + "Z");
        isUtc = true;
      } else {
        date = new Date(timestamp);
        isUtc = false;
      }
    } else {
      date = new Date(timestamp);
      isUtc = false;
    }

    if (isNaN(date.getTime())) {
      return "";
    }

    let koreanHour, koreanMinute;

    if (isUtc) {
      const koreanDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
      koreanHour = koreanDate.getUTCHours();
      koreanMinute = koreanDate.getUTCMinutes();
    } else {
      koreanHour = date.getHours();
      koreanMinute = date.getMinutes();
    }

    const period = koreanHour >= 12 ? "오후" : "오전";
    const displayHour =
      koreanHour > 12 ? koreanHour - 12 : koreanHour === 0 ? 12 : koreanHour;

    return `${period} ${displayHour.toString().padStart(2, "0")}:${koreanMinute
      .toString()
      .padStart(2, "0")}`;
  };

  // 컨텍스트 타입에 따른 표시 텍스트
  const getContextTypeText = (contextType) => {
    switch (contextType) {
      case "EVENT_POST":
        return "이벤트";
      case "COMMENT":
        return "댓글";
      case "CLUB_POST":
        return "소모임";
      default:
        return "채팅";
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderTitle>채팅</HeaderTitle>
        </Header>
        <LoadingContainer>채팅방 목록을 불러오는 중...</LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <HeaderTitle>채팅</HeaderTitle>
        </Header>
        <EmptyContainer>
          <div>{error}</div>
          <button onClick={fetchChatRooms}>다시 시도</button>
        </EmptyContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/myhome")}>
          <img src={MainArrowLeftIcon} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>
          채팅
          <span
            style={{
              fontSize: "12px",
              color: websocketConnected ? "#4CAF50" : "#FF5722",
              marginLeft: "8px",
              fontWeight: "normal",
            }}
          ></span>
        </HeaderTitle>
      </Header>

      <ChatRoomList>
        {chatRooms.length === 0 ? (
          <EmptyContainer>
            <EmptyIcon>💬</EmptyIcon>
            <div>아직 채팅방이 없습니다.</div>
            <div>이벤트나 댓글에서 대화를 시작해보세요!</div>
          </EmptyContainer>
        ) : (
          chatRooms.map((room) => {
            // 개별 채팅방과 동일한 방식으로 상대방 정보 추출
            const targetNickname = room.targetUser?.nickname || "사용자";
            const targetProfileImage = room.targetUser?.profileImage;
            const avatarText = targetNickname.charAt(0).toUpperCase();

            // 아바타 아이콘 매핑
            const avatarIcons = {
              1: Avatar1Icon,
              2: Avatar2Icon,
              3: Avatar3Icon,
              4: Avatar4Icon,
              5: Avatar5Icon,
              6: Avatar6Icon,
            };

            // 상대방의 프로필 이미지 결정
            let opponentAvatarIcon = room.targetUser?.profileImage || null;

            // 본인 아바타 아이콘 결정 (프로필 이미지 변경 여부에 따라)
            const currentUserId =
              userData?.id || localStorage.getItem("currentUserId");
            const userAvatarId =
              userData?.avatarId || localStorage.getItem("userAvatarId") || 1;

            // 프로필 이미지가 변경되었는지 확인 (로그인 응답의 profileImageUrl 우선)
            const hasCustomProfileImage =
              userData?.profileImage && userData.profileImage !== null;
            const myAvatarIcon = hasCustomProfileImage
              ? userData.profileImage
              : avatarIcons[userAvatarId] || Avatar1Icon;

            return (
              <ChatRoomItem
                key={room.roomId}
                onClick={() =>
                  handleChatRoomClick(
                    room.roomId,
                    room.targetUser?.profileImage
                  )
                }
              >
                {/* 프로필 이미지 컨테이너 */}
                <ProfileImagesContainer>
                  {/* 본인 프로필 (왼쪽) */}
                  <UserAvatar>
                    {typeof myAvatarIcon === "string" &&
                    myAvatarIcon.startsWith("http") ? (
                      // 실제 프로필 이미지 URL인 경우
                      <UserAvatarImage
                        src={myAvatarIcon}
                        alt="내 프로필"
                        onError={(e) => {
                          // 이미지 로드 실패 시 기본 아바타로 폴백
                          const fallbackAvatarId =
                            userData?.avatarId ||
                            localStorage.getItem("userAvatarId") ||
                            1;
                          e.target.src =
                            avatarIcons[fallbackAvatarId] || Avatar1Icon;
                        }}
                      />
                    ) : (
                      // SVG 아이콘인 경우
                      <UserAvatarImage src={myAvatarIcon} alt="내 프로필" />
                    )}
                  </UserAvatar>

                  {/* 상대방 프로필 (오른쪽) */}
                  <OpponentAvatar>
                    {opponentAvatarIcon ? (
                      typeof opponentAvatarIcon === "string" &&
                      opponentAvatarIcon.startsWith("http") ? (
                        // 실제 프로필 이미지 URL인 경우
                        <OpponentAvatarImage
                          src={opponentAvatarIcon}
                          alt={`${targetNickname} 프로필`}
                          onError={(e) => {
                            // 이미지 로드 실패 시 텍스트 아바타로 폴백
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : (
                        // SVG 아이콘인 경우
                        <OpponentAvatarImage
                          src={opponentAvatarIcon}
                          alt={`${targetNickname} 프로필`}
                        />
                      )
                    ) : null}
                    {/* 텍스트 아바타 (폴백) */}
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "white",
                        display: opponentAvatarIcon ? "none" : "flex",
                      }}
                    >
                      {avatarText}
                    </div>
                  </OpponentAvatar>
                </ProfileImagesContainer>

                {/* 채팅방 정보 */}
                <ChatRoomInfo>
                  {/* 상대방 닉네임과 시간 */}
                  <UserName>
                    {targetNickname}
                    <TimeContainer>
                      <TimeDot />
                      <TimeText>{formatTime(room.lastMessageAt)}</TimeText>
                    </TimeContainer>
                    {room.myUnreadCount > 0 && (
                      <UnreadBadge>{room.myUnreadCount}</UnreadBadge>
                    )}
                  </UserName>

                  {/* 마지막 메시지 */}
                  <LastMessage>
                    {room.lastMessage || "메시지가 없습니다."}
                  </LastMessage>

                  {/* 마지막 메시지 시간 */}
                  <MessageTime>
                    {formatExactTime(room.lastMessageAt)}
                  </MessageTime>
                </ChatRoomInfo>
              </ChatRoomItem>
            );
          })
        )}
      </ChatRoomList>
    </Container>
  );
}
