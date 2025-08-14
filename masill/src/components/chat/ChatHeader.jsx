import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowLeftIcon from "@assets/logo/main/main-arrowleft.svg";
import Avatar1Icon from "@logo/profile/avatar1.svg";
import Avatar2Icon from "@logo/profile/avatar2.svg";
import Avatar3Icon from "@logo/profile/avatar3.svg";
import Avatar4Icon from "@logo/profile/avatar4.svg";
import Avatar5Icon from "@logo/profile/avatar5.svg";
import Avatar6Icon from "@logo/profile/avatar6.svg";
import ChatBirdIcon from "@logo/chat/chatbird.svg";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
  position: relative;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  margin-right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const OpponentAvatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NewChatButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export default function ChatHeader({ title, showNewChat = false, showMenu = false, opponentAvatar = null }) {
  const navigate = useNavigate();
  
  // 상대방 아바타 아이콘 선택
  const avatarIcons = {
    1: Avatar1Icon,
    2: Avatar2Icon,
    3: Avatar3Icon,
    4: Avatar4Icon,
    5: Avatar5Icon,
    6: Avatar6Icon
  };
  
  const getOpponentAvatarIcon = () => {
    if (!opponentAvatar) return Avatar1Icon;
    const avatarName = opponentAvatar;
    
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
    <HeaderWrapper>
      <LeftSection>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon src={ArrowLeftIcon} alt="뒤로 가기" />
        </BackButton>
        {opponentAvatar && (
          <OpponentAvatar src={getOpponentAvatarIcon()} alt="상대방 프로필" />
        )}
        <Title>{title}</Title>
      </LeftSection>
      <RightSection>
     
        {showMenu && (
          <MenuButton>⋮</MenuButton>
        )}
      </RightSection>
    </HeaderWrapper>
  );
}
