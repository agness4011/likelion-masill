// src/pages/chat/ChatPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 채팅 페이지에 접속하면 채팅방 목록으로 리다이렉트
    navigate('/chat/list');
  }, [navigate]);

  return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음
}
