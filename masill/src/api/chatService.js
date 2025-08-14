// src/api/chatService.js
// import axios from "./axios";

// 더미 채팅방 데이터
const dummyRooms = [
  {
    id: 1,
    name: "지나가는 서경대생",
    avatar: "avatar2.svg",
    lastMessage: "안녕하세요!! 소모임 참여 신청했습니다!!! 정확히 몇시에 어디서 모이나요?",
    time: "1시간 전",
    unread: true,
    unreadCount: 1,
    updatedAt: "2025-01-27T10:30:00Z",
  },
  {
    id: 2,
    name: "멋쟁이",
    avatar: "avatar3.svg",
    lastMessage: "전 삼겹살만 먹으면 됩니다.",
    time: "2일 전",
    unread: false,
    unreadCount: 0,
    updatedAt: "2025-01-25T18:30:00Z",
  },
  {
    id: 3,
    name: "번동불주먹",
    avatar: "avatar4.svg",
    lastMessage: "삼겹살에 목살 600g해서 4인분 먹으면 딱 좋지 않을까욥ㅎ",
    time: "2일 전",
    unread: false,
    unreadCount: 0,
    updatedAt: "2025-01-25T16:20:00Z",
  },
  {
    id: 4,
    name: "코코맘",
    avatar: "avatar5.svg",
    lastMessage: "저는 태국음식존이 제일 기대돼요!",
    time: "5일 전",
    unread: false,
    unreadCount: 0,
    updatedAt: "2025-01-22T14:15:00Z",
  },
  {
    id: 5,
    name: "mmm",
    avatar: "avatar6.svg",
    lastMessage: "고수 웩웩이요ㅠㅠ",
    time: "6일 전",
    unread: false,
    unreadCount: 0,
    updatedAt: "2025-01-21T11:45:00Z",
  },
  {
    id: 6,
    name: "초코송이",
    avatar: "avatar1.svg",
    lastMessage: "4시 마지막 세션에 강연해주시는 강사님이 제가 너무 좋아하는 분이라서 너무 기대돼요....",
    time: "1주 전",
    unread: false,
    unreadCount: 0,
    updatedAt: "2025-01-20T09:30:00Z",
  },
  {
    id: 7,
    name: "masill_bird",
    avatar: "chatbird.svg",
    lastMessage: "masill_love1님의 취향에 꼭 맞춘 행사를 골라드릴게요!",
    time: "방금 전",
    unread: false,
    unreadCount: 0,
    updatedAt: "2025-01-27T11:00:00Z",
  }
];

// 더미 메시지 데이터
const dummyMessages = {
  1: [
    {
      id: 1,
      text: "안녕하세요!! 소모임 참여 신청했습니다!!! 정확히 몇시에 어디서 모이나요?",
      fromMe: false,
      time: "오전 10:30",
      sentAt: "2025-01-27T10:30:00Z",
    },
    {
      id: 2,
      text: "네, 안녕하세요! 소모임은 매주 토요일 오후 2시에 학생회관 3층에서 진행됩니다.",
      fromMe: true,
      time: "오전 10:32",
      sentAt: "2025-01-27T10:32:00Z",
    },
    {
      id: 3,
      text: "아, 그렇군요! 참가비는 얼마인가요?",
      fromMe: false,
      time: "오전 10:33",
      sentAt: "2025-01-27T10:33:00Z",
    },
    {
      id: 4,
      text: "참가비는 5,000원입니다. 첫 참가자는 무료로 체험 가능해요!",
      fromMe: true,
      time: "오전 10:35",
      sentAt: "2025-01-27T10:35:00Z",
    },
    {
      id: 5,
      text: "와, 좋네요! 그럼 이번 주 토요일에 참가해보겠습니다.",
      fromMe: false,
      time: "오전 10:36",
      sentAt: "2025-01-27T10:36:00Z",
    },
    {
      id: 6,
      text: "네, 환영합니다! 준비물은 간단한 필기도구만 있으시면 됩니다.",
      fromMe: true,
      time: "오전 10:37",
      sentAt: "2025-01-27T10:37:00Z",
    },
    {
      id: 7,
      text: "알겠습니다! 혹시 주차는 어디에 하면 되나요?",
      fromMe: false,
      time: "오전 10:38",
      sentAt: "2025-01-27T10:38:00Z",
    },
    {
      id: 8,
      text: "학생회관 뒤쪽에 무료 주차장이 있습니다. 2시간 무료입니다.",
      fromMe: true,
      time: "오전 10:40",
      sentAt: "2025-01-27T10:40:00Z",
    },
    {
      id: 9,
      text: "감사합니다! 그럼 토요일에 뵙겠습니다.",
      fromMe: false,
      time: "오전 10:41",
      sentAt: "2025-01-27T10:41:00Z",
    },
    {
      id: 10,
      text: "네, 기대하고 있겠습니다! 혹시 궁금한 점 있으시면 언제든 연락주세요.",
      fromMe: true,
      time: "오전 10:42",
      sentAt: "2025-01-27T10:42:00Z",
    },
    {
      id: 11,
      text: "네, 알겠습니다! 감사합니다.",
      fromMe: false,
      time: "오전 10:43",
      sentAt: "2025-01-27T10:43:00Z",
    },
    {
      id: 12,
      text: "안녕하세요! 혹시 소모임에 대해 더 자세히 알고 싶은 분 있으신가요?",
      fromMe: true,
      time: "오전 11:00",
      sentAt: "2025-01-27T11:00:00Z",
    },
    {
      id: 13,
      text: "저요! 어떤 활동을 하는지 궁금해요.",
      fromMe: false,
      time: "오전 11:05",
      sentAt: "2025-01-27T11:05:00Z",
    },
    {
      id: 14,
      text: "저희 소모임은 주로 토론과 프로젝트 활동을 합니다. 매주 다른 주제로 토론하고, 간단한 프로젝트도 진행해요.",
      fromMe: true,
      time: "오전 11:07",
      sentAt: "2025-01-27T11:07:00Z",
    },
    {
      id: 15,
      text: "와, 정말 재미있을 것 같아요! 참가하고 싶습니다.",
      fromMe: false,
      time: "오전 11:08",
      sentAt: "2025-01-27T11:08:00Z",
    },
    {
      id: 16,
      text: "네, 환영합니다! 이번 주 토요일 오후 2시에 학생회관 3층으로 오세요.",
      fromMe: true,
      time: "오전 11:10",
      sentAt: "2025-01-27T11:10:00Z",
    },
    {
      id: 17,
      text: "네, 알겠습니다! 기대되네요.",
      fromMe: false,
      time: "오전 11:11",
      sentAt: "2025-01-27T11:11:00Z",
    },
    {
      id: 18,
      text: "혹시 다른 분들도 궁금한 점 있으시면 언제든 연락주세요!",
      fromMe: true,
      time: "오전 11:15",
      sentAt: "2025-01-27T11:15:00Z",
    },
    {
      id: 19,
      text: "저도 참가하고 싶어요! 혹시 신입생도 참가 가능한가요?",
      fromMe: false,
      time: "오전 11:20",
      sentAt: "2025-01-27T11:20:00Z",
    },
    {
      id: 20,
      text: "네, 물론입니다! 학년에 상관없이 누구나 참가 가능해요. 오히려 다양한 학년이 모이면 더 재미있죠!",
      fromMe: true,
      time: "오전 11:22",
      sentAt: "2025-01-27T11:22:00Z",
    },
    {
      id: 21,
      text: "좋아요! 그럼 저도 토요일에 참가하겠습니다.",
      fromMe: false,
      time: "오전 11:23",
      sentAt: "2025-01-27T11:23:00Z",
    },
    {
      id: 22,
      text: "네, 환영합니다! 많은 분들이 참가하시는군요. 정말 기대됩니다!",
      fromMe: true,
      time: "오전 11:25",
      sentAt: "2025-01-27T11:25:00Z",
    }
  ],
  2: [
    {
      id: 1,
      text: "전 삼겹살만 먹으면 됩니다.",
      fromMe: false,
      time: "2일 전",
      sentAt: "2025-01-25T18:30:00Z",
    }
  ],
  3: [
    {
      id: 1,
      text: "삼겹살에 목살 600g해서 4인분 먹으면 딱 좋지 않을까욥ㅎ",
      fromMe: false,
      time: "2일 전",
      sentAt: "2025-01-25T16:20:00Z",
    }
  ],
  4: [
    {
      id: 1,
      text: "저는 태국음식존이 제일 기대돼요!",
      fromMe: false,
      time: "5일 전",
      sentAt: "2025-01-22T14:15:00Z",
    }
  ],
  5: [
    {
      id: 1,
      text: "고수 웩웩이요ㅠㅠ",
      fromMe: false,
      time: "6일 전",
      sentAt: "2025-01-21T11:45:00Z",
    }
  ],
  6: [
    {
      id: 1,
      text: "4시 마지막 세션에 강연해주시는 강사님이 제가 너무 좋아하는 분이라서 너무 기대돼요....",
      fromMe: false,
      time: "1주 전",
      sentAt: "2025-01-20T09:30:00Z",
    }
  ],
  7: [
    {
      id: 1,
      text: "masill_love1님의 취향에 꼭 맞춘 행사를 골라드릴게요!",
      fromMe: false,
      time: "방금 전",
      sentAt: "2025-01-27T11:00:00Z",
    }
  ]
};

// 1) 채팅방 목록 조회
export function fetchChatRooms() {
  return Promise.resolve(dummyRooms);
  // 실제 API 사용 시:
  // return axios.get("/chats").then(res => res.data);
}

// 2) 특정 채팅방 정보 조회
export function fetchChatRoom(chatId) {
  const room = dummyRooms.find(r => r.id === parseInt(chatId));
  return Promise.resolve(room);
  // 실제 API 사용 시:
  // return axios.get(`/chats/${chatId}`).then(res => res.data);
}

// 3) 특정 채팅방 메시지 조회 (페이징 지원)
export function fetchMessages(chatId, page = 1, pageSize = 20) {
  const allMessages = dummyMessages[chatId] || [];
  
  // 페이징 처리
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedMessages = allMessages.slice(startIndex, endIndex);
  
  return Promise.resolve(paginatedMessages);
  // 실제 API 사용 시:
  // return axios.get(`/chats/${chatId}/messages?page=${page}&pageSize=${pageSize}`).then(res => res.data);
}

// 4) 메시지 전송
export function sendMessage(chatId, text) {
  const newMsg = {
    id: Date.now(),
    text,
    fromMe: true,
    time: new Date().toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }),
    sentAt: new Date().toISOString(),
  };
  
  if (!dummyMessages[chatId]) {
    dummyMessages[chatId] = [];
  }
  dummyMessages[chatId] = [...dummyMessages[chatId], newMsg];
  
  // 마지막 메시지 업데이트
  const room = dummyRooms.find(r => r.id === parseInt(chatId));
  if (room) {
    room.lastMessage = text;
    room.time = "방금 전";
    room.updatedAt = new Date().toISOString();
  }
  
  return Promise.resolve(newMsg);
  // 실제 API 사용 시:
  // return axios.post(`/chats/${chatId}/messages`, { text }).then(res => res.data);
}

// 5) 읽음 처리
export function markAsRead(chatId) {
  const room = dummyRooms.find(r => r.id === parseInt(chatId));
  if (room) {
    room.unread = false;
    room.unreadCount = 0;
  }
  return Promise.resolve({ success: true });
  // 실제 API 사용 시:
  // return axios.put(`/chats/${chatId}/read`).then(res => res.data);
}
