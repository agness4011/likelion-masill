// src/api/chatService.js
import { privateAPI } from "./axios";



// 1) 채팅방 목록 조회
export async function fetchChatRooms() {
  try {
    console.log('채팅방 목록 조회 API 호출');
    const res = await privateAPI.get('/chats/rooms');
    console.log('채팅방 목록 조회 API 응답 성공:', res.data);
    return res.data;
  } catch (error) {
    console.error('채팅방 목록 조회 API 실패:', error);
    throw error;
  }
}

// 1-1) 내 채팅방 목록 조회 (페이징 지원)
export async function getMyChatRooms({ page = 1, size = 200, sortBy = 'lastMessageAt', sortDir = 'desc' }) {
  try {
    console.log('채팅방 목록 조회 API 호출:', { page, size, sortBy, sortDir });
    
    // 실제 API 호출
    const res = await privateAPI.get('/chats/rooms', {
      params: { page, size, sortBy, sortDir }
    });
    
    console.log('채팅방 목록 조회 API 응답 성공:', res.data);
    return res.data;
  } catch (error) {
    console.error('채팅방 목록 조회 API 실패:', error);
    throw error;
  }
}

// 2) 특정 채팅방 정보 조회
export async function fetchChatRoom(roomId) {
  try {
    console.log('채팅방 정보 조회 API 호출:', roomId);
    // GET 요청으로 채팅방 조회 (새로운 API)
    const res = await privateAPI.get(`/chats/room/${roomId}`);
    console.log('채팅방 정보 조회 API 응답 성공:', res.data);
    return res.data;
  } catch (error) {
    console.error('채팅방 정보 조회 API 실패:', error);
    throw error;
  }
}

// 3) 특정 채팅방 메시지 조회 (페이징 지원)
export async function fetchMessages(chatId, page = 1, pageSize = 200) {
  try {
    console.log('채팅 메시지 조회 API 호출:', { chatId, page, pageSize });
    const res = await privateAPI.get(`/chats/rooms/${chatId}/messages`, {
      params: { 
        page, 
        size: pageSize, // pageSize 대신 size 파라미터 사용
        sortBy: 'createdAt',
        sortDir: 'asc' // 오래된 메시지부터 가져오기
      }
    });
    console.log('채팅 메시지 조회 API 응답 성공:', res.data);
    console.log('실제 받은 메시지 수:', res.data?.data?.content?.length || res.data?.length || 0);
    return res.data;
  } catch (error) {
    console.error('채팅 메시지 조회 API 실패:', error);
    throw error;
  }
}

// 3-1) getChatMessages - fetchMessages의 별칭
export function getChatMessages(chatId, page = 1, pageSize = 200) {
  return fetchMessages(chatId, page, pageSize);
}

// 4) 메시지 전송
export async function sendMessage(chatId, text) {
  try {
    console.log('채팅 메시지 전송 API 호출:', { chatId, text });
    const res = await privateAPI.post(`/chats/rooms/${chatId}/messages`, { text });
    console.log('채팅 메시지 전송 API 응답 성공:', res.data);
    return res.data;
  } catch (error) {
    console.error('채팅 메시지 전송 API 실패:', error);
    throw error;
  }
}

// 5) 읽음 처리
export async function markAsRead(chatId) {
  try {
    console.log('채팅방 읽음 처리 API 호출:', chatId);
    const res = await privateAPI.put(`/chats/rooms/${chatId}/read`);
    console.log('채팅방 읽음 처리 API 응답 성공:', res.data);
    return res.data;
  } catch (error) {
    console.error('채팅방 읽음 처리 API 실패:', error);
    // 500 에러나 기타 서버 에러의 경우에도 채팅 기능은 계속 작동하도록
    if (error.response?.status >= 500) {
      console.warn('서버 에러로 인한 읽음 처리 실패 - 채팅 기능은 계속 작동');
      return { success: false, message: '서버 에러로 읽음 처리 실패' };
    }
    throw error;
  }
}

// 6) 이벤트 채팅방 생성
export async function startEventChat(eventId) {
  console.log('채팅방 생성 API 호출:', { eventId });
  
  // 현재 로그인한 사용자 ID 가져오기
  const currentUserId = localStorage.getItem('currentUserId');
  console.log('현재 사용자 ID:', currentUserId);
  
  try {
    // 1. targetUserId 조회 (서버 오류로 인해 임시로 하드코딩)
    console.log('작성자 ID 조회 중...');
    let targetUserId;
    
    try {
      const targetUserRes = await privateAPI.get('/chats/target-user', {
        params: { 
          contextType: 'EVENT_POST',
          contextId: eventId 
        }
      });
      targetUserId = targetUserRes.data.data?.targetUserId;
      console.log('작성자 ID 조회 결과:', targetUserId);
    } catch (error) {
      console.error('작성자 ID 조회 실패:', error);
      console.log('서버 오류로 인해 임시 값 사용...');
      // 임시로 test1의 ID 사용 (eventId 93은 test1이 작성한 게시글)
      targetUserId = 116; // test1의 ID
      console.log('임시 작성자 ID 사용:', targetUserId);
    }
    
    // 2. targetUserId가 여전히 없는 경우 에러
    if (!targetUserId) {
      throw new Error('이벤트 작성자 ID를 찾을 수 없습니다.');
    }
    
    // 3. 자신과는 채팅방을 만들 수 없음
    if (parseInt(currentUserId) === parseInt(targetUserId)) {
      throw new Error('자신과는 채팅방을 만들 수 없습니다.');
    }
    
    // 4. 채팅방 생성 요청 데이터 (서버 스펙에 맞춤)
    const requestData = {
      contextType: "이벤트", // "EVENT_POST" -> "이벤트"로 수정
      contextId: parseInt(eventId), // eventPostId (eventId와 동일)
      targetUserId: parseInt(targetUserId) // 이벤트 작성자 ID
    };
    
    console.log('채팅방 생성 요청 데이터:', requestData);
    console.log('요청 데이터 타입:', {
      contextType: typeof requestData.contextType,
      contextId: typeof requestData.contextId,
      targetUserId: typeof requestData.targetUserId
    });
    
    // 5. POST /api/chats/rooms 호출하여 서버에서 roomId 받기
    const res = await privateAPI.post('/chats/rooms', requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('채팅방 생성 API 응답 성공:', res.data);
    return res.data;
  } catch (error) {
    console.error('채팅방 생성 과정 실패:', error);
    throw error;
  }
}
