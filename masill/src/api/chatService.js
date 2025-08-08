// src/api/chatService.js
// import axios from "./axios";

// 더미 채팅방 데이터
const dummyRooms = [
  {
    id: "room1",
    name: "친구 A",
    lastMessage: "안녕!",
    updatedAt: "2025-08-07T12:00:00Z",
  },
  {
    id: "room2",
    name: "친구 B",
    lastMessage: "내일 봐요!",
    updatedAt: "2025-08-06T18:30:00Z",
  },
];

// 더미 메시지 데이터
const dummyMessages = {
  room1: [
    {
      id: "m1",
      from: "친구 A",
      text: "안녕하세요!",
      sentAt: "2025-08-07T09:00:00Z",
    },
    { id: "m2", from: "Me", text: "반가워요", sentAt: "2025-08-07T09:01:00Z" },
  ],
  room2: [
    {
      id: "m3",
      from: "친구 B",
      text: "오늘 어때?",
      sentAt: "2025-08-06T18:00:00Z",
    },
    { id: "m4", from: "Me", text: "좋아요!", sentAt: "2025-08-06T18:05:00Z" },
  ],
};

// 1) 채팅방 목록 조회
export function fetchChatRooms() {
  return Promise.resolve(dummyRooms);
  // 실제 API 사용 시:
  // return axios.get("/chats").then(res => res.data);
}

// 2) 특정 채팅방 메시지 조회
export function fetchMessages(chatId) {
  return Promise.resolve(dummyMessages[chatId] || []);
  // 실제 API 사용 시:
  // return axios.get(`/chats/${chatId}/messages`).then(res => res.data);
}

// 3) 메시지 전송
export function sendMessage(chatId, text) {
  const newMsg = {
    id: `m${Date.now()}`,
    from: "Me",
    text,
    sentAt: new Date().toISOString(),
  };
  dummyMessages[chatId] = [...(dummyMessages[chatId] || []), newMsg];
  return Promise.resolve(newMsg);
  // 실제 API 사용 시:
  // return axios.post(`/chats/${chatId}/messages`, { text }).then(res => res.data);
}
