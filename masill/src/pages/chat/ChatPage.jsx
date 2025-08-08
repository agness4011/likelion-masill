// src/pages/chat/ChatPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatHeader from "@components/chat/ChatHeader";
import ChatListItem from "@components/chat/ChatListItem";
import { fetchChatRooms } from "@api/chatService";

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

  return (
    <>
      <ChatHeader title="채팅" />
      {rooms.map((room) => (
        <ChatListItem
          key={room.id}
          room={{
            id: room.id,
            name: room.name,
            lastMessage: room.lastMessage,
            date: new Date(room.updatedAt).toLocaleDateString(),
          }}
          onClick={() => navigate(`/chat/${room.id}`)}
        />
      ))}
    </>
  );
}
