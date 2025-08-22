import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import chatsendIcon from "../../assets/logo/chat/chatsend.svg";
import MainArrowLeftIcon from "../../assets/logo/main/main-arrowleft.svg";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 8px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: #060d1d;
  margin: 0;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: ${(props) =>
    props.$isMine ? "18px 18px 4px 18px" : "18px 18px 18px 4px"};
  word-wrap: break-word;
  align-self: ${(props) => (props.$isMine ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.$isMine ? "#154AD0" : "#FFDBAC")};
  color: ${(props) => (props.$isMine ? "white" : "#333")};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: ${(props) => (props.$isMine ? "0 0 0 auto" : "0 auto 0 0")};
`;

const MessageTime = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  text-align: ${(props) => (props.$isMine ? "right" : "left")};
  align-self: ${(props) => (props.$isMine ? "flex-end" : "flex-start")};
  margin: ${(props) => (props.$isMine ? "4px 0 0 auto" : "4px auto 0 0")};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: white;
  border-top: 1px solid #f0f0f0;
  position: relative;
  height: 0px;
`;

const MessageInput = styled.input`
  flex: 1;
  min-width: 300px;
  padding: 12px 16px;
  padding-right: 30px;
  margin-top: 40px;
  border: 1px solid #f4f7ff;
  border-radius: 24px;
  font-size: 16px;
  outline: none;
  background-color: #f4f7ff;
  position: relative;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #154ad0;
    background-color: white;
  }
`;

const SendButton = styled.button`
  position: absolute;
  right: 20px;
  top: 33px;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  img {
    width: 38px;
    height: 38px;
  }
`;

import AiBird from "../../assets/bird.png";
import { privateAPI } from "../../api/axios"; // 이미 정의한 함수

import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

export default function ChatAi() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageContainerRef = useRef(null);
  const [aiPost, setAiPost] = useState("");

  // 메시지 시간 포맷
  const formatMessageTime = (date) => {
    const now = new Date(date);
    const hour = now.getHours();
    const minute = now.getMinutes().toString().padStart(2, "0");
    const period = hour >= 12 ? "오후" : "오전";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${period} ${displayHour}:${minute}`;
  };

  // 메시지 전송 (chatAI 호출)
  const handleSendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    const userMsg = {
      id: Date.now(),
      type: "text",
      text: newMessage.trim(),
      fromMe: true,
      time: formatMessageTime(new Date()),
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");
    setSending(true);
    setIsTyping(true);

    try {
      const response = await privateAPI.get(`/events/search-ai`, {
        params: { query: userMsg.text },
      });

      const aiData = response.data?.data || [];

      if (aiData.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "text",
            text: "추천 결과가 없습니다.",
            fromMe: false,
            time: formatMessageTime(new Date()),
          },
        ]);
      } else {
        const aiGroupMessage = {
          id: Date.now() + 2,
          type: "postGroup",
          posts: aiData,
          time: formatMessageTime(new Date()),
        };
        setMessages((prev) => [...prev, aiGroupMessage]);
        console.log("AI 데이터:", aiData);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "text",
          text: "⚠️ 오류가 발생했습니다. 다시 시도해주세요.",
          fromMe: false,
          time: formatMessageTime(new Date()),
        },
      ]);
    } finally {
      setSending(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 스크롤 자동 아래로
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);
  dayjs.locale("ko");

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img src={MainArrowLeftIcon} alt="뒤로가기" />
        </BackButton>
        <UserProfile>
          <ProfileImage src={AiBird} alt="AI" />
          <UserInfo>
            <UserName>Masill_Bird</UserName>
          </UserInfo>
        </UserProfile>
      </Header>

      <MessageContainer ref={messageContainerRef}>
        {messages.map((msg) => {
          if (msg.type === "text") {
            return (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.fromMe ? "flex-end" : "flex-start",
                  width: "100%",
                }}
              >
                <MessageBubble $isMine={msg.fromMe}>{msg.text}</MessageBubble>
              </div>
            );
          } else if (msg.type === "postGroup") {
            return (
              <div key={msg.id}>
                {msg.posts.map((item, index) => (
                  <RecommendPost
                    key={index}
                    onClick={() => {
                      // eventId를 다른 페이지로 state로 전달
                      navigate(`/detail/${item.eventId}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <PostImg src={item.images?.[0]?.imageUrl || AiBird} />
                    <PostTextWrapper>
                      <PostTitle>{item.title}</PostTitle>
                      <PostLocation>
                        {item.region?.sido} {item.region?.sigungu}{" "}
                        {item.location}
                      </PostLocation>
                      <PostDate>
                        {`${dayjs(item.startAt).format(
                          "YYYY.MM.DD.(dd)"
                        )} ~ ${dayjs(item.endAt).format(
                          "YYYY.MM.DD.(dd)"
                        )} ${dayjs(item.startAt).format("HH:mm")}~${dayjs(
                          item.endAt
                        ).format("HH:mm")}`}
                      </PostDate>
                    </PostTextWrapper>
                  </RecommendPost>
                ))}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <EntireBtn
                    onClick={() => {
                      navigate("/main", { state: { aiPosts: msg.posts } });
                    }}
                  >
                    추천 전체 보기
                  </EntireBtn>
                </div>
              </div>
            );
          }
        })}
      </MessageContainer>

      <InputContainer>
        <MessageInput
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="추천 받고 싶은 내용을 입력하세요"
          disabled={sending}
        />
        <SendButton
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || sending}
        >
          <img src={chatsendIcon} alt="전송" />
        </SendButton>
      </InputContainer>
    </Container>
  );
}

const EntireBtn = styled.button`
  display: inline-flex;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid var(--Gray-700, #959eb7);
  background: var(--White, #fff);
  cursor: pointer;
`;

const PostTitle = styled.p`
  overflow: hidden;
  color: var(--Dark-Text, #060d1d);
  text-overflow: ellipsis;
  white-space: nowrap;
  /* Heading 02 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 25.2px */
  letter-spacing: 0.36px;
  max-width: 227px;
  height: 22px;
  flex-shrink: 0;
  margin: 0;
`;
const PostImg = styled.img`
  width: 86px;
  height: 86px;
  flex-shrink: 0;
  border-radius: 6px;
  margin-left: 9px;
  margin-right: 9px;
`;
const PostLocation = styled.p`
  display: flex;
  max-width: 222px;
  height: 13px;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: #727c94;

  text-overflow: ellipsis;
  white-space: nowrap;
  /* SUB Text 01 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 14.4px */
  letter-spacing: -0.12px;

  margin-top: 5.7px;
  margin-bottom: 3px;
`;
const PostDate = styled.p`
  width: 232px;
  height: 14px;
  flex-shrink: 0;
  color: #727c94;

  /* SUB Text 01 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 14.4px */
  letter-spacing: -0.12px;

  margin: 0;
`;
const RecommendPost = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* 이미지와 텍스트 사이 간격 */
  width: 345px;
  padding: 7px;
  border-radius: 6px;
  border: 1px solid #c1cae0;
  background: #fff;
  margin-bottom: 8px; /* 게시글 간 간격 */

  height: 100px;
  flex-shrink: 0;
`;

const PostTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;
const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  /* 메시지 + AI 게시글 통합 박스 스타일 */
  ${RecommendPost} {
    align-self: flex-start; /* 왼쪽 정렬 */
    max-width: 100%;
  }
`;
