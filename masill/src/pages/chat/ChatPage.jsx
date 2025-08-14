// src/pages/chat/ChatPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatHeader from "@components/chat/ChatHeader";
import ChatListItem from "@components/chat/ChatListItem";
import { fetchChatRooms, markAsRead } from "@api/chatService";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
`;

const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const NewChatButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;

export default function ChatPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchChatRooms()
      .then((data) => {
        setRooms(data);
      })
      .catch((err) => {
        console.error("채팅방 목록 조회 실패:", err);
      });
  }, []);

  const handleChatClick = (roomId) => {
    // 읽음 처리
    markAsRead(roomId)
      .then(() => {
        setRooms(prev => prev.map(room => 
          room.id === roomId 
            ? { ...room, unread: false, unreadCount: 0 }
            : room
        ));
      })
      .catch((err) => {
        console.error("읽음 처리 실패:", err);
      });
    
    navigate(`/chat/${roomId}`);
  };

  return (
    <Container>
      <ChatHeader title="채팅" showNewChat />
      <ChatList>
        {rooms.map((room) => (
          <ChatListItem
            key={room.id}
            room={room}
            onClick={() => handleChatClick(room.id)}
          />
        ))}
      </ChatList>
    </Container>
  );
}
