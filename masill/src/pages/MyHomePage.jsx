import React from 'react';
import styled from 'styled-components';
import { Edit, Bell, MessageCircle, User, Heart, CheckCircle } from 'lucide-react';

const MyHomeContainer = styled.div`
  min-height: 100vh;
  background: white;
  padding: 0;
  margin: 0;
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: white;
  font-size: 14px;
  font-weight: 500;
`;

const StatusLeft = styled.div`
  color: #333;
`;

const StatusRight = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: white;
  border-bottom: 1px solid #f0f0f0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 18px;
`;

const LogoIcon = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #007bff, #ff6b35);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const ActionIcons = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #007bff;
  }
`;

const ProfileSection = styled.div`
  padding: 30px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #007bff, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: bold;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.h2`
  margin: 0 0 15px 0;
  color: #333;
  font-size: 20px;
  font-weight: bold;
`;

const NicknameButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 20px;
  padding: 8px 16px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #e9ecef;
  }
`;

const MenuSection = styled.div`
  padding: 0 20px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007bff;
`;

const MenuText = styled.span`
  color: #333;
  font-size: 16px;
  font-weight: 500;
`;

const BottomIllustration = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(135deg, #ff6b35, #007bff);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.1;
  pointer-events: none;
`;

const Bird = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ff6b35, #007bff);
  border-radius: 50%;
  margin: 0 10px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 15px;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 12px;
    width: 16px;
    height: 4px;
    background: white;
    border-radius: 2px;
  }
`;

const MyHomePage = () => {
  // 임시 사용자 데이터 (나중에 API에서 가져올 수 있음)
  const userData = {
    username: "masill_love1", // 회원가입 시 입력한 닉네임
    email: "user@example.com"
  };

  const handleEditProfile = () => {
    console.log('프로필 편집');
  };

  const handleNotifications = () => {
    console.log('알림');
  };

  const handleChat = () => {
    console.log('채팅');
  };

  const handleProfile = () => {
    console.log('프로필');
  };

  const handleViewPosts = () => {
    console.log('내가 작성한 게시글 보기');
  };

  const handleViewWishlist = () => {
    console.log('관심 목록 보기');
  };

  const handleVerifyManager = () => {
    console.log('사장님 인증하기');
  };

  const handleNicknameChange = () => {
    console.log('닉네임 변경');
  };

  return (
    <MyHomeContainer>
      {/* 상태바 */}
      <StatusBar>
        <StatusLeft>9:41</StatusLeft>
        <StatusRight>
          <span>📶</span>
          <span>📶</span>
          <span>🔋</span>
        </StatusRight>
      </StatusBar>

      {/* 헤더 */}
      <Header>
        <Logo>
          <LogoIcon>M</LogoIcon>
          <span>마실</span>
        </Logo>
        <ActionIcons>
          <IconButton onClick={handleEditProfile}>
            <Edit size={20} />
          </IconButton>
          <IconButton onClick={handleNotifications}>
            <Bell size={20} />
          </IconButton>
          <IconButton onClick={handleChat}>
            <MessageCircle size={20} />
          </IconButton>
          <IconButton onClick={handleProfile}>
            <User size={20} />
          </IconButton>
        </ActionIcons>
      </Header>

      {/* 프로필 섹션 */}
      <ProfileSection>
        <Avatar>
          <User size={40} />
        </Avatar>
        <UserInfo>
          <Username>{userData.username}</Username>
          <NicknameButton onClick={handleNicknameChange}>
            닉네임 변경
          </NicknameButton>
        </UserInfo>
      </ProfileSection>

      {/* 메뉴 섹션 */}
      <MenuSection>
        <MenuItem onClick={handleViewPosts}>
          <MenuIcon>
            <Edit size={20} />
          </MenuIcon>
          <MenuText>내가 작성한 게시글 보기</MenuText>
        </MenuItem>
        
        <MenuItem onClick={handleViewWishlist}>
          <MenuIcon>
            <Heart size={20} />
          </MenuIcon>
          <MenuText>관심 목록 보기</MenuText>
        </MenuItem>
        
        <MenuItem onClick={handleVerifyManager}>
          <MenuIcon>
            <CheckCircle size={20} />
          </MenuIcon>
          <MenuText>사장님 인증하기</MenuText>
        </MenuItem>
      </MenuSection>

      {/* 하단 일러스트레이션 */}
      <BottomIllustration>
        <Bird />
        <Bird />
      </BottomIllustration>
    </MyHomeContainer>
  );
};

export default MyHomePage;
