import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// WebSocket 클라이언트 인스턴스
let stompClient = null;

// 랜덤 id 생성 (receipt / subscribe id 에 사용)
const rid = (p = 'r') => `${p}-${Math.random().toString(36).slice(2, 10)}`;

// WebSocket 연결 설정
export const connectWebSocket = (onConnect, onError, onDisconnect) => {
  if (stompClient && stompClient.connected) {
    console.log('WebSocket이 이미 연결되어 있습니다.');
    if (onConnect) onConnect(stompClient);
    return stompClient;
  }

  // 기존 클라이언트가 있으면 정리
  if (stompClient) {
    try {
      stompClient.deactivate();
    } catch (error) {
      console.log('기존 클라이언트 정리 중 에러:', error);
    }
  }

  const token = localStorage.getItem('accessToken') || '';
  const url = `http://43.202.247.99:8080/api/websocket/chat?access_token=${encodeURIComponent(token)}`;
  
  const client = new Client({
    webSocketFactory: () => new SockJS(url),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
      'accept-version': '1.1,1.2', // 서버 버전 호환성
      'heart-beat': '0,0'
    },
    debug: (str) => console.log('[STOMP]', str),
    reconnectDelay: 5000,
    heartbeatIncoming: 0,
    heartbeatOutgoing: 0,
    connectionTimeout: 10000,
    // 안정성 향상을 위한 설정
    forceBinaryWSFrames: false,
    appendMissingNULLonIncoming: true,
    // 추가 안정성 설정
    splitLargeFrames: false,
    maxWebSocketFrameSize: 16 * 1024 * 1024, // 16MB
  });

  client.onConnect = (frame) => {
    console.log('WebSocket 연결 성공:', frame);
    console.log('연결된 사용자:', frame.headers['user-name']);
    console.log('서버 버전:', frame.headers.version);
    
    // 사용자 정보 상세 로그
    const userName = frame.headers['user-name'];
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const currentUserId = localStorage.getItem('currentUserId');
    
    console.log('=== WebSocket 사용자 정보 ===');
    console.log('WebSocket user-name:', userName);
    console.log('localStorage currentUser:', currentUser);
    console.log('localStorage currentUserId:', currentUserId);
    console.log('============================');
    
    if (onConnect) onConnect(client, frame);
  };

  client.onStompError = (frame) => {
    console.error('STOMP 에러:', frame);
    
    // 특정 에러 메시지 처리
    if (frame.headers && frame.headers.message) {
      console.error('에러 메시지:', frame.headers.message);
      
      // ExecutorSubscribableChannel 에러인 경우 재연결 시도
      if (frame.headers.message.includes('ExecutorSubscribableChannel')) {
        console.log('서버 측 WebSocket 문제 감지. HTTP 기반 채팅으로 폴백합니다.');
      }
    }
    
    if (onError) onError(frame);
  };

  client.onDisconnect = () => {
    console.log('WebSocket 연결 해제');
    if (onDisconnect) onDisconnect();
  };

  client.activate();
  stompClient = client;
  return client;
};

// 연결 상태 확인
export const isConnected = () => {
  return stompClient && stompClient.connected;
};

// 메시지 전송
export const sendMessage = (destination, message) => {
  if (!stompClient || !stompClient.connected) {
    console.error('WebSocket이 연결되지 않았습니다.');
    return false;
  }

  try {
    console.log('메시지 전송 시도:', destination, message);
    
    // 메시지 크기 제한 확인
    const messageStr = JSON.stringify(message);
    if (messageStr.length > 8192) { // 8KB 제한
      console.error('메시지가 너무 큽니다:', messageStr.length);
      return false;
    }
    
    stompClient.publish({
      destination,
      body: messageStr,
      headers: {
        'content-type': 'application/json'
      }
    });
    
    console.log('메시지 전송 성공:', destination);
    return true;
  } catch (error) {
    console.error('메시지 전송 실패:', error);
    return false;
  }
};

// 채팅방 메시지 전송 (테스트 페이지와 동일한 목적지)
export const sendChatMessage = (roomId, text) => {
  if (!stompClient || !stompClient.connected) {
    console.error('WebSocket이 연결되지 않았습니다.');
    return false;
  }

  try {
    const destination = `/app/chat/rooms/${roomId}/messages`;
    const payload = { content: text };
    
    console.log('채팅 메시지 전송:', destination, payload);
    
    stompClient.publish({
      destination,
      body: JSON.stringify(payload),
      headers: {
        'content-type': 'application/json'
      }
    });
    
    console.log('채팅 메시지 전송 성공:', destination);
    return true;
  } catch (error) {
    console.error('채팅 메시지 전송 실패:', error);
    return false;
  }
};

// 채팅방 읽음 처리 (테스트 페이지와 동일한 목적지)
export const markChatAsRead = (roomId) => {
  if (!stompClient || !stompClient.connected) {
    console.error('WebSocket이 연결되지 않았습니다.');
    return false;
  }

  try {
    const destination = `/app/chat/rooms/${roomId}/read`;
    
    console.log('채팅방 읽음 처리:', destination);
    
    stompClient.publish({
      destination,
      body: '{}'
    });
    
    console.log('채팅방 읽음 처리 성공:', destination);
    return true;
  } catch (error) {
    console.error('채팅방 읽음 처리 실패:', error);
    return false;
  }
};

// 타이핑 시작 이벤트 전송
export const sendTypingStart = (roomId) => {
  if (!stompClient || !stompClient.connected) {
    console.error('WebSocket이 연결되지 않았습니다.');
    return false;
  }

  try {
    const destination = `/app/chat/rooms/${roomId}/typing`;
    const payload = { type: 'START' };
    
    console.log('타이핑 시작 전송:', destination, payload);
    
    stompClient.publish({
      destination,
      body: JSON.stringify(payload),
      headers: {
        'content-type': 'application/json'
      }
    });
    
    console.log('타이핑 시작 전송 성공:', destination);
    return true;
  } catch (error) {
    console.error('타이핑 시작 전송 실패:', error);
    return false;
  }
};

// 타이핑 종료 이벤트 전송
export const sendTypingStop = (roomId) => {
  if (!stompClient || !stompClient.connected) {
    console.error('WebSocket이 연결되지 않았습니다.');
    return false;
  }

  try {
    const destination = `/app/chat/rooms/${roomId}/typing`;
    const payload = { type: 'STOP' };
    
    console.log('타이핑 종료 전송:', destination, payload);
    
    stompClient.publish({
      destination,
      body: JSON.stringify(payload),
      headers: {
        'content-type': 'application/json'
      }
    });
    
    console.log('타이핑 종료 전송 성공:', destination);
    return true;
  } catch (error) {
    console.error('타이핑 종료 전송 실패:', error);
    return false;
  }
};

// 구독
export const subscribe = (destination, callback) => {
  if (!stompClient || !stompClient.connected) {
    console.error('WebSocket이 연결되지 않았습니다.');
    return null;
  }

  try {
    console.log('구독 시도:', destination);
    const subscription = stompClient.subscribe(destination, (message) => {
      console.log('메시지 수신:', destination, message);
      try {
        const body = JSON.parse(message.body);
        callback(body);
      } catch (error) {
        console.error('메시지 파싱 실패:', error);
        callback(message.body);
      }
    });
    console.log('구독 성공:', destination);
    return subscription;
  } catch (error) {
    console.error('구독 실패:', error);
    return null;
  }
};

// 채팅방 구독 (테스트 페이지와 동일한 목적지)
export const subscribeChatRoom = (roomId, callback) => {
  if (!stompClient || !stompClient.connected) {
    console.error('WebSocket이 연결되지 않았습니다.');
    return null;
  }

  try {
    const destination = `/user/queue/rooms.${roomId}`;
    console.log('채팅방 구독 시도:', destination);
    
    const subscription = stompClient.subscribe(destination, (message) => {
      console.log('채팅 메시지 수신:', destination, message);
      try {
        const body = JSON.parse(message.body);
        callback(body);
      } catch (error) {
        console.error('채팅 메시지 파싱 실패:', error);
        callback(message.body);
      }
    });
    
    console.log('채팅방 구독 성공:', destination);
    return subscription;
  } catch (error) {
    console.error('채팅방 구독 실패:', error);
    return null;
  }
};

// 연결 해제
export const disconnect = () => {
  if (stompClient) {
    try {
      stompClient.deactivate();
      stompClient = null;
      console.log('WebSocket 연결 해제 완료');
    } catch (error) {
      console.error('WebSocket 연결 해제 실패:', error);
    }
  }
};