// src/pages/chat/ChatRoomPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatHeader from "@components/chat/ChatHeader";
import ChatMessage from "@components/chat/ChatMessage";
import ChatInput from "@components/chat/ChatInput";
import { fetchMessages, sendMessage } from "@api/chatService";

export default function ChatRoomPage() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  // 방 변경 시 더미 메시지 로드
  useEffect(() => {
    fetchMessages(roomId)
      .then((data) => setMessages(data))
      .catch((err) => console.error("메시지 조회 실패:", err));
  }, [roomId]);

  // 메시지 갱신 시 스크롤 하단 이동
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = (text) => {
    sendMessage(roomId, text)
      .then((newMsg) => setMessages((prev) => [...prev, newMsg]))
      .catch((err) => console.error("메시지 전송 실패:", err));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <ChatHeader title={`대화방: ${roomId}`} />

      <div
        ref={scrollRef}
        style={{ flex: 1, overflowY: "auto", background: "#f5f5f5" }}
      >
        {messages.map((m, i) => (
          <ChatMessage key={m.id || i} text={m.text} fromMe={m.from === "Me"} />
        ))}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}
