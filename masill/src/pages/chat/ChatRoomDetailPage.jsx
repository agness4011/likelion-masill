import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getChatMessages, sendMessage as sendHttpMessage, fetchChatRoom, getMyChatRooms } from '../../api/chatService';
import { useUser } from '../../contexts/UserContext';
import Avatar1Icon from '../../assets/logo/profile/avatar1.svg';
import Avatar2Icon from '../../assets/logo/profile/avatar2.svg';
import Avatar3Icon from '../../assets/logo/profile/avatar3.svg';
import Avatar4Icon from '../../assets/logo/profile/avatar4.svg';
import Avatar5Icon from '../../assets/logo/profile/avatar5.svg';
import Avatar6Icon from '../../assets/logo/profile/avatar6.svg';
import { connectWebSocket, sendChatMessage, subscribeChatRoom, markChatAsRead, isConnected, sendUnreadNotification } from '../../utils/websocket';
import chatsendIcon from '../../assets/logo/chat/chatsend.svg';
import MainArrowLeftIcon from '../../assets/logo/main/main-arrowleft.svg';

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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  margin-right: 12px;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: #666;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: #060D1D;
  margin: 0;
`;

const ConnectionStatus = styled.div`
  font-size: 12px;
  color: ${props => props.connected === "true" ? '#4CAF50' : '#FF5722'};
  margin-left: 8px;
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Firefox */
  scrollbar-width: none;
  
  /* IE/Edge */
  -ms-overflow-style: none;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: ${props => props.$isMine ? '18px 18px 4px 18px' : '18px 18px 18px 4px'};
  word-wrap: break-word;
  align-self: ${props => props.$isMine ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.$isMine ? '#154AD0' : '#FFDBAC'};
  color: ${props => props.$isMine ? 'white' : '#333'};
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  margin: ${props => props.$isMine ? '0 0 0 auto' : '0 auto 0 0'};
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px 20px;
  background-color: #154AD0;
  border-radius: 18px;
  align-self: flex-end;
  max-width: 70%;
  margin: 0 0 0 auto;

  min-height: 50px;
`;

const TypingDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
  animation: typing 1.4s infinite ease-in-out;
  
  &:nth-child(1) { animation-delay: -0.32s; }
  &:nth-child(2) { animation-delay: -0.16s; }
  
  @keyframes typing {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const MessageTime = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  text-align: ${props => props.$isMine ? 'right' : 'left'};
  align-self: ${props => props.$isMine ? 'flex-end' : 'flex-start'};
  margin: ${props => props.$isMine ? '4px 0 0 auto' : '4px auto 0 0'};
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
  border: 1px solid #F4F7FF;
  border-radius: 24px;
  font-size: 16px;
  outline: none;
  background-color: #F4F7FF;
  position: relative;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    border-color: #154AD0;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
  gap: 16px;
`;

function ChatRoomDetailPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useUser();
  
  // URL 파라미터에서 프로필 이미지 가져오기
  const urlParams = new URLSearchParams(location.search);
  const profileImageFromUrl = urlParams.get('profileImage');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [websocketConnected, setWebsocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const messageContainerRef = useRef(null);
  const [isAiChat, setIsAiChat] = useState(false);
  
  // 사용자 ID 가져오기 (최적화)
  const userId = userData?.id || userData?.userId || (localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).userId : null) || localStorage.getItem('currentUserId');
  
  // 디버깅을 위한 로그
  console.log('[ChatRoomDetailPage] 사용자 정보:', {
    userData,
    userId,
    currentUserFromStorage: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null,
    currentUserIdFromStorage: localStorage.getItem('currentUserId')
  });

  // 타겟 사용자 정보 조회 (최적화)
  const fetchTargetUser = useCallback(async () => {
    try {
      const response = await fetchChatRoom(roomId);
      
      if (response?.success && response.data) {
        const chatRoomData = response.data;
        
        // 새로운 API 응답 구조에 맞춰 상대방 정보 추출
        let targetUserInfo = {
          username: chatRoomData.targetUserNickname || '사용자',
          userImage: profileImageFromUrl || chatRoomData.targetUserProfileImageUrl || null,
          userId: chatRoomData.targetUserId
        };
        
        setTargetUser(targetUserInfo);
        return targetUserInfo; // 반환값 추가
      }
      
      // API 실패 시 기본값 설정
      const defaultTarget = { username: '사용자', userImage: null, userId: null };
      setTargetUser(defaultTarget);
      return defaultTarget;
    } catch (error) {
      const defaultTarget = { username: '사용자', userImage: null, userId: null };
      setTargetUser(defaultTarget);
      return defaultTarget;
    }
  }, [roomId]);

  // 메시지 목록 조회 (최적화)
  const fetchMessages = useCallback(async (targetUserInfo = null) => {
    try {
      setLoading(true);
      const response = await getChatMessages(roomId, 1, 200);
      
      // API 응답 구조에 따라 메시지 배열 추출
      let messagesArray = [];
      
      if (response && Array.isArray(response)) {
        messagesArray = response;
      } else if (response?.data && Array.isArray(response.data)) {
        messagesArray = response.data;
      } else if (response?.data?.content && Array.isArray(response.data.content)) {
        messagesArray = response.data.content;
      }
      
      // 메시지에서 상대방 senderId 찾기 (targetUser가 아직 설정되지 않은 경우)
      if (messagesArray.length > 0 && !targetUserInfo?.userId) {
        const currentUserId = userId || localStorage.getItem('currentUserId');
        const otherSenderId = messagesArray.find(msg => 
          msg.senderId && msg.senderId.toString() !== currentUserId?.toString()
        )?.senderId;
        
        if (otherSenderId) {
          const defaultUserInfo = {
            116: { nickname: 'test1', avatarId: 3 },
            119: { nickname: 'test2', avatarId: 2 }
          };
          
          const otherUser = defaultUserInfo[otherSenderId] || { 
            nickname: `사용자${otherSenderId}`, 
            avatarId: 1 
          };
          
          const avatarIcons = {
            1: Avatar1Icon, 2: Avatar2Icon, 3: Avatar3Icon, 4: Avatar4Icon, 5: Avatar5Icon, 6: Avatar6Icon
          };
          
          const newTargetUser = {
            username: otherUser.nickname,
            userImage: avatarIcons[otherUser.avatarId] || Avatar1Icon,
            userId: otherSenderId
          };
          
          setTargetUser(newTargetUser);
          targetUserInfo = newTargetUser;
        }
      }
      
      // API 메시지를 일관된 형식으로 변환 (최적화)
      const currentUserId = userId || localStorage.getItem('currentUserId');
      const formattedMessages = messagesArray
        .map(msg => {
          const messageText = msg.content || msg.text || msg.message || '';
          const messageTime = msg.createdAt || msg.sentAt || msg.time || new Date().toISOString();
          const senderId = msg.senderId || msg.userId || msg.authorId;
          const isFromMe = senderId && currentUserId && senderId.toString() === currentUserId.toString();
          
          // 디버깅을 위한 로그
          console.log('[ChatRoomDetailPage] 메시지 처리:', {
            messageText,
            senderId,
            currentUserId,
            isFromMe,
            originalMsg: msg
          });
          
          return {
            id: msg.id || msg.messageId || Date.now(),
            text: messageText,
            fromMe: isFromMe,
            time: formatMessageTime(messageTime),
            originalData: msg
          };
        })
        .filter(msg => msg.text && msg.text.trim() !== '');
      
      setMessages(formattedMessages);
    } catch (error) {
      console.error('메시지 조회 실패:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [roomId, userId]);

  // 메시지 시간 포맷팅 함수 (최적화)
  const formatMessageTime = (timeString) => {
    try {
      let date;
      let isUtc = false;
      
      if (typeof timeString === 'string') {
        if (timeString.includes('Z')) {
          date = new Date(timeString);
          isUtc = true;
        } else if (timeString.includes('T')) {
          date = new Date(timeString + 'Z');
          isUtc = true;
        } else {
          date = new Date(timeString);
          isUtc = false;
        }
      } else if (timeString instanceof Date) {
        date = timeString;
        isUtc = false;
      } else {
        date = new Date(timeString);
        isUtc = false;
      }
      
      if (isNaN(date.getTime())) {
        const now = new Date();
        const koreanHour = now.getHours();
        const koreanMinute = now.getMinutes();
        const period = koreanHour >= 12 ? '오후' : '오전';
        const displayHour = koreanHour > 12 ? koreanHour - 12 : (koreanHour === 0 ? 12 : koreanHour);
        return `${period} ${displayHour.toString().padStart(2, '0')}:${koreanMinute.toString().padStart(2, '0')}`;
      }
      
      let koreanHour, koreanMinute;
      
      if (isUtc) {
        const koreanDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
        koreanHour = koreanDate.getUTCHours();
        koreanMinute = koreanDate.getUTCMinutes();
      } else {
        koreanHour = date.getHours();
        koreanMinute = date.getMinutes();
      }
      
      const period = koreanHour >= 12 ? '오후' : '오전';
      const displayHour = koreanHour > 12 ? koreanHour - 12 : (koreanHour === 0 ? 12 : koreanHour);
      
      return `${period} ${displayHour.toString().padStart(2, '0')}:${koreanMinute.toString().padStart(2, '0')}`;
    } catch (error) {
      const now = new Date();
      const koreanHour = now.getHours();
      const koreanMinute = now.getMinutes();
      const period = koreanHour >= 12 ? '오후' : '오전';
      const displayHour = koreanHour > 12 ? koreanHour - 12 : (koreanHour === 0 ? 12 : koreanHour);
      return `${period} ${displayHour.toString().padStart(2, '0')}:${koreanMinute.toString().padStart(2, '0')}`;
    }
  };

  // 메시지 전송 (최적화)
  const handleSendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    try {
      setSending(true);
      
      if (websocketConnected && isConnected()) {
        const success = sendChatMessage(roomId, newMessage.trim());
      
        if (success) {
          // WebSocket으로 전송 성공 시 즉시 UI에 메시지 추가
          const currentTime = new Date();
          const currentUserId = userId || localStorage.getItem('currentUserId');
          const newMsg = {
            id: currentTime.getTime(),
            text: newMessage.trim(),
            fromMe: true,
            time: formatMessageTime(currentTime),
            originalData: { content: newMessage.trim(), senderId: currentUserId }
          };
          setMessages(prev => [...prev, newMsg]);
          setNewMessage('');
          
          // 상대방에게 안읽은 수 증가 알림 전송
          if (targetUser?.userId) {
            console.log('[ChatRoomDetailPage] 안읽은 수 증가 알림 전송:', {
              roomId,
              messageContent: newMessage.trim(),
              targetUserId: targetUser.userId
            });
            sendUnreadNotification(roomId, newMessage.trim(), targetUser.userId);
            
            // 로컬 스토리지를 통한 즉시 업데이트 (다른 탭/창에서)
            const updateData = {
              type: 'chatMessageSent',
              roomId: roomId,
              messageContent: newMessage.trim(),
              timestamp: new Date().toISOString(),
              targetUserId: targetUser.userId
            };
            localStorage.setItem('chatRoomUpdate', JSON.stringify(updateData));
            
            // 커스텀 이벤트 발생 (같은 탭에서)
            window.dispatchEvent(new CustomEvent('chatMessageSent', {
              detail: updateData
            }));
          }
        } else {
          alert('메시지 전송에 실패했습니다. WebSocket 연결을 확인해주세요.');
        }
      } else {
        alert('실시간 연결이 되지 않았습니다. 페이지를 새로고침해주세요.');
      }
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    } finally {
      setSending(false);
    }
  };

  // 타이핑 효과
  useEffect(() => {
    if (newMessage.trim()) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [newMessage]);

  // Enter 키로 메시지 전송
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 스크롤을 맨 아래로
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  // 메시지가 추가될 때마다 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // WebSocket 연결 시도 (최적화)
  useEffect(() => {
    const connectToWebSocket = () => {
      try {
        connectWebSocket(
          (client) => {
            setWebsocketConnected(true);
            
            subscribeChatRoom(roomId, (message) => {
              // 메시지 형식 처리 (최적화)
              let messageText = '';
              let messageSenderId = null;
              
              try {
                const body = message.body || message;
                
                if (typeof body === 'string') {
                  const parsed = JSON.parse(body);
                  messageText = parsed.message || parsed.content || parsed.text || body;
                  messageSenderId = parsed.senderId || parsed.userId;
                } else if (typeof body === 'object') {
                  messageText = body.message || body.content || body.text || JSON.stringify(body);
                  messageSenderId = body.senderId || body.userId;
                }
              } catch (e) {
                messageText = message.body || message;
              }
              
              // 메시지 추가 (자신이 보낸 메시지도 포함)
              const currentUserId = userId || localStorage.getItem('currentUserId');
              const isFromMe = messageSenderId && currentUserId && messageSenderId.toString() === currentUserId.toString();
              const currentTime = new Date();
              const newMsg = {
                id: currentTime.getTime(),
                text: messageText,
                fromMe: isFromMe,
                time: formatMessageTime(currentTime),
                originalData: { content: messageText, senderId: messageSenderId }
              };
              
              setMessages(prev => {
                // 중복 메시지 방지 (같은 내용의 메시지가 최근 3초 내에 있으면 무시)
                const recentMessages = prev.slice(-3);
                const isDuplicate = recentMessages.some(msg => 
                  msg.text === messageText && 
                  Math.abs(Date.now() - msg.id) < 3000
                );
                
                if (isDuplicate) {
                  return prev;
                }
                
                return [...prev, newMsg];
              });
            });
          },
          (error) => {
            setWebsocketConnected(false);
          },
          () => {
            setWebsocketConnected(false);
          }
        );
      } catch (error) {
        setWebsocketConnected(false);
      }
    };

    // WebSocket 연결 시도 (즉시)
    connectToWebSocket();
  }, [roomId, userId]);

  // 컴포넌트 마운트 시 데이터 로드 (최적화)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // 타겟 사용자 정보와 메시지를 병렬로 로드
        const targetUserInfo = await fetchTargetUser();
        await fetchMessages(targetUserInfo);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [roomId, fetchTargetUser, fetchMessages]);

  // HTTP 기반 채팅을 위한 주기적 새로고침 (WebSocket 연결 안 될 때만)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!websocketConnected && targetUser) {
        fetchMessages();
      }
    }, 2000);
    
    return () => {
      clearInterval(interval);
    };
  }, [websocketConnected, targetUser, fetchMessages]);

  if (loading) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>←</BackButton>
                  <UserProfile>
          {targetUser?.userImage ? (
            <ProfileImage 
              src={targetUser.userImage} 
              alt="프로필"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <UserAvatar style={{ display: targetUser?.userImage ? 'none' : 'flex' }}>
            {targetUser?.username ? targetUser.username.charAt(0) : '?'}
          </UserAvatar>
          <UserInfo>
            <UserName>
              {targetUser?.username || '사용자'}
              <ConnectionStatus connected={websocketConnected ? "true" : "false"}>
                {websocketConnected ? '실시간' : 'HTTP'}
              </ConnectionStatus>
            </UserName>
          </UserInfo>
        </UserProfile>
        </Header>
        <LoadingContainer>메시지를 불러오는 중...</LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img src={MainArrowLeftIcon} alt="뒤로가기" />
        </BackButton>
        <UserProfile>
          {targetUser?.userImage ? (
            <ProfileImage 
              src={targetUser.userImage} 
              alt="프로필"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <UserAvatar style={{ display: targetUser?.userImage ? 'none' : 'flex' }}>
            {targetUser?.username ? targetUser.username.charAt(0) : '?'}
          </UserAvatar>
          <UserInfo>
            <UserName>
              {targetUser?.username || '사용자'}
              <ConnectionStatus connected={websocketConnected ? "true" : "false"}>
                {websocketConnected ? '실시간' : 'HTTP'}
              </ConnectionStatus>
            </UserName>
          </UserInfo>
        </UserProfile>
      </Header>
      
      <MessageContainer ref={messageContainerRef}>
        {Array.isArray(messages) && messages
          .filter(message => message && message.text && message.text.trim() !== '')
          .map((message) => (
            <div key={message.id} style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: message.fromMe ? 'flex-end' : 'flex-start',
              width: '100%'
            }}>
              <MessageBubble $isMine={message.fromMe}>
                {message.text}
              </MessageBubble>
              <MessageTime $isMine={message.fromMe}>
                {message.time}
              </MessageTime>
            </div>
          ))}
        
        {/* 타이핑 인디케이터 */}
        {isTyping && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%'
          }}>
            <TypingIndicator>
              <TypingDot />
              <TypingDot />
              <TypingDot />
            </TypingIndicator>
          </div>
        )}
      </MessageContainer>
      
      <InputContainer>
        <MessageInput
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요"
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

export default ChatRoomDetailPage;
