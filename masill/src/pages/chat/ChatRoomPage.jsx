// src/pages/chat/ChatRoomPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ChatHeader from "@components/chat/ChatHeader";
import ChatMessage from "@components/chat/ChatMessage";
import ChatInput from "@components/chat/ChatInput";
import TypingIndicator from "@components/chat/TypingIndicator";
import { fetchMessages, sendMessage, fetchChatRoom } from "@api/chatService";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
  background: #f8f9fa;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: 10px;
  color: #666;
  font-size: 14px;
`;

export default function ChatRoomPage() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  const PAGE_SIZE = 20; // 한 번에 로드할 메시지 수

  // 방 정보 로드
  useEffect(() => {
    fetchChatRoom(roomId)
      .then((roomData) => {
        setCurrentRoom(roomData);
      })
      .catch((err) => {
        console.error("방 정보 로드 실패:", err);
      });
  }, [roomId]);

  // 초기 메시지 로드
  useEffect(() => {
    loadMessages(1, true);
  }, [roomId]);

  // 메시지 로드 함수
  const loadMessages = async (pageNum, isInitial = false) => {
    if (isLoading || (!isInitial && !hasMore)) return;
    
    setIsLoading(true);
    try {
      const messagesData = await fetchMessages(roomId, pageNum, PAGE_SIZE);
      
      if (isInitial) {
        setMessages(messagesData);
      } else {
        setMessages(prev => [...messagesData, ...prev]);
      }
      
      setHasMore(messagesData.length === PAGE_SIZE);
      setPage(pageNum);
    } catch (err) {
      console.error("메시지 로드 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    
    // 스크롤이 상단에 가까워지면 이전 메시지 로드
    if (scrollTop < 100 && !isLoading && hasMore) {
      loadMessages(page + 1);
    }
  };

  // 메시지 갱신 시 스크롤 하단 이동 (새 메시지 전송 시에만)
  useEffect(() => {
    if (messages.length > 0 && !isLoading) {
      scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [messages.length]);

  const handleSend = (text) => {
    sendMessage(roomId, text)
      .then((newMessage) => {
        setMessages(prev => [...prev, newMessage]);
      })
      .catch((err) => {
        console.error("메시지 전송 실패:", err);
      });
  };

  const handleTypingChange = (typing) => {
    setIsTyping(typing);
  };

  if (!currentRoom) {
    return <div>채팅방을 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <ChatHeader 
        title={currentRoom?.name} 
        showMenu 
        opponentAvatar={currentRoom?.avatar}
      />
      
      <MessageContainer 
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {isLoading && hasMore && (
          <LoadingIndicator>메시지를 불러오는 중...</LoadingIndicator>
        )}
        
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            text={message.text} 
            fromMe={message.fromMe}
            time={message.time}
          />
        ))}
        
        {isTyping && (
          <TypingIndicator fromMe={true} />
        )}
      </MessageContainer>

      <ChatInput onSend={handleSend} onTypingChange={handleTypingChange} />
    </Container>
  );
}
