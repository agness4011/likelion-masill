import React from "react";
import styled from "styled-components";
import { useUser } from "../../contexts/UserContext";
import Avatar1Icon from "@logo/profile/avatar1.svg";
import Avatar2Icon from "@logo/profile/avatar2.svg";
import Avatar3Icon from "@logo/profile/avatar3.svg";
import Avatar4Icon from "@logo/profile/avatar4.svg";
import Avatar5Icon from "@logo/profile/avatar5.svg";
import Avatar6Icon from "@logo/profile/avatar6.svg";
import ChatBirdIcon from "@logo/chat/chatbird.svg";

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  padding-bottom: 30px; /* 아래 여백을 늘려서 선 위치 조정 */
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  background: #fff;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #fafafa;
  }
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-right: 12px;
  display: flex;
  align-items: center;
`;

const MyAvatar = styled(Avatar)`
  z-index: 1;
`;

const OpponentAvatar = styled(Avatar)`
  position: absolute;
  bottom: -15px;
  left: 24px; /* 내 아바타와 겹치도록 위치 조정 */
  z-index: 2;
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 30px; /* 아바타 겹침 공간을 고려해서 오른쪽으로 이동 */
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const Name = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 16px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeAndUnreadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
`;

const Time = styled.span`
  font-size: 12px;
  color: #999;
`;

const LastMessage = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UnreadIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #007AFF;
`;

export default function ChatListItem({ room, onClick }) {
  const { userData } = useUser();
  
  // userData가 없을 때 기본값 설정
  if (!userData) {
    return (
      <ItemWrapper onClick={onClick}>
        <AvatarContainer>
          <MyAvatar src={Avatar1Icon} alt="내 프로필" />
          <OpponentAvatar src={Avatar1Icon} alt="상대방 프로필" />
        </AvatarContainer>
        <Info>
          <NameRow>
            <Name>{room.name}</Name>
            <TimeAndUnreadContainer>
              <Time>{room.time}</Time>
              {room.unread && <UnreadIndicator />}
            </TimeAndUnreadContainer>
          </NameRow>
          <LastMessage>{room.lastMessage}</LastMessage>
        </Info>
      </ItemWrapper>
    );
  }
  
  // 내 아바타 아이콘 선택
  const avatarIcons = {
    1: Avatar1Icon,
    2: Avatar2Icon,
    3: Avatar3Icon,
    4: Avatar4Icon,
    5: Avatar5Icon,
    6: Avatar6Icon
  };
  
  const getCurrentAvatarIcon = () => {
    const avatarId = userData?.avatarId || 1;
    return avatarIcons[avatarId] || Avatar1Icon;
  };

  // 상대방 아바타 아이콘 선택 (room.avatar에서 숫자 추출)
  const getOpponentAvatarIcon = () => {
    const avatarName = room.avatar || "avatar1.svg";
    
    // masill_bird인 경우 chatbird.svg 사용
    if (avatarName === "chatbird.svg") {
      return ChatBirdIcon;
    }
    
    const avatarNumber = avatarName.match(/avatar(\d+)\.svg/)?.[1];
    if (avatarNumber) {
      return avatarIcons[parseInt(avatarNumber)] || Avatar1Icon;
    }
    return Avatar1Icon;
  };

  return (
    <ItemWrapper onClick={onClick}>
      <AvatarContainer>
        <MyAvatar src={getCurrentAvatarIcon()} alt="내 프로필" />
        <OpponentAvatar src={getOpponentAvatarIcon()} alt="상대방 프로필" />
      </AvatarContainer>
      <Info>
        <NameRow>
          <Name>{room.name}</Name>
          <TimeAndUnreadContainer>
            <Time>{room.time}</Time>
            {room.unread && <UnreadIndicator />}
          </TimeAndUnreadContainer>
        </NameRow>
        <LastMessage>{room.lastMessage}</LastMessage>
      </Info>
    </ItemWrapper>
  );
}
