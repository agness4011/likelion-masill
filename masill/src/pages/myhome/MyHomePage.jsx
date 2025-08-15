import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import AlarmIcon from '@logo/myhome/alarm.svg';
import ChatIcon from '@logo/myhome/chat.svg'; 
import HomeIcon from '@logo/myhome/home.svg';
import WriteIcon from '@logo/myhome/write.svg';
import Bird2Icon from '@logo/myhome/birddown.svg';
import Bird1Icon from '@logo/bird.svg';
import Avatar1Icon from '@logo/profile/avatar1.svg';
import Avatar2Icon from '@logo/profile/avatar2.svg';
import Avatar3Icon from '@logo/profile/avatar3.svg';
import Avatar4Icon from '@logo/profile/avatar4.svg';
import Avatar5Icon from '@logo/profile/avatar5.svg';
import Avatar6Icon from '@logo/profile/avatar6.svg';
import HeartIcon from '@logo/myhome/heart.svg';
import CheckIcon from '@logo/myhome/check.svg';
import SajangIcon from '@logo/myhome/sajang.svg';
import MasilLogoIcon from '@assets/masill-logo1.svg';

const MyHomeContainer = styled.div`
  min-height: 100vh;
  background: white;
  padding: 0;
  margin: 0;
  position: relative;
`;


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  background: white;
  border-bottom: 1px solid #f0f0f0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  font-weight: bold;
  font-size: 18px;
`;

const LogoImage = styled.img`
  height: 36px;
`;

const ActionIcons = styled.div`
  display: flex;
  gap: 1px;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #007bff;
  }
`;

const IconImage = styled.img`
  width: 18px;
  height: 19px;
`;

const ProfileSection = styled.div`
  padding: 30px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const AvatarContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #007bff, #ff6b35);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.h2`
  margin: 0 0 15px 0;
  color: #333;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
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
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #e9ecef;
  }
`;

const SajangIconImage = styled.img`
  width: 16px;
  height: 16px;
`;

const MenuSection = styled.div`
  padding: 0 20px;
  margin-top: 20px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 16px 20px;
  margin-bottom: 12px;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background: #f8f9fa;
    border-color: #dee2e6;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const MenuIconImage = styled.img`
  width: 20px;
  height: 20px;
`;

const MenuText = styled.span`
  color: #333;
  font-size: 16px;
  font-weight: 500;
  flex: 1;
`;

const BottomIllustration = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  pointer-events: none;
`;

const BirdContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BirdImage = styled.img`
  position: absolute;
  width: 80px;
  height: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.7;
`;

const MyHomePage = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  
  console.log('마이페이지 현재 userData:', userData);
  
  // 토큰 상태 확인
  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const currentUser = localStorage.getItem('currentUser');
    
    console.log('=== 마이페이지 토큰 상태 ===');
    console.log('Access Token:', accessToken ? '있음' : '없음');
    console.log('Refresh Token:', refreshToken ? '있음' : '없음');
    console.log('Current User:', currentUser ? JSON.parse(currentUser) : '없음');
    console.log('==========================');
  }, []);

  // 아바타 아이콘 매핑
  const avatarIcons = {
    1: Avatar1Icon,
    2: Avatar2Icon,
    3: Avatar3Icon,
    4: Avatar4Icon,
    5: Avatar5Icon,
    6: Avatar6Icon
  };

  // 현재 사용자의 아바타 아이콘 가져오기
  const getCurrentAvatarIcon = () => {
    const avatarId = userData.avatarId || 1; // 기본값은 1
    return avatarIcons[avatarId] || Avatar1Icon;
  };

  // 새 위치 상태 (개별 관리)
  const [bird1Position, setBird1Position] = React.useState({ x: 160, y: 120 });
  const [bird2Position, setBird2Position] = React.useState({ x: 220, y: 101 });

  const handleEditProfile = () => {
    navigate('/board');
  };

  const handleNotifications = () => {
    console.log('알림');
  };

  const handleChat = () => {
    navigate('/chat');
  };

  const handleProfile = () => {
    console.log('프로필');
  };

  const handleViewPosts = () => {
    navigate('/myhome/my-posts');
  };

  const handleViewWishlist = () => {
    navigate('/myhome/wishlist');
  };

  const handleVerifyManager = () => {
    navigate('/myhome/sajang');
  };

  const handleNicknameChange = () => {
    navigate('/myhome/nickname-change');
  };

  return (
    <MyHomeContainer>
      {/* 상태바 */}


      {/* 헤더 */}
      <Header>
        <Logo>
          <LogoImage src={MasilLogoIcon} alt="마실" />
        </Logo>
        <ActionIcons>
          <IconButton onClick={handleEditProfile}>
            <IconImage src={WriteIcon} alt="편집" />
          </IconButton>
          <IconButton onClick={handleNotifications}>
            <IconImage src={AlarmIcon} alt="알림" />
          </IconButton>
          <IconButton onClick={handleChat}>
            <IconImage src={ChatIcon} alt="채팅" />
          </IconButton>
          <IconButton onClick={handleProfile}>
            <IconImage src={HomeIcon} alt="프로필" />
          </IconButton>
        </ActionIcons>
      </Header>

      {/* 프로필 섹션 */}
      <ProfileSection>
        <AvatarContainer>
          <AvatarImage src={getCurrentAvatarIcon()} alt="프로필" />
        </AvatarContainer>
        <UserInfo>
          <Username>
            {userData.username}
            {userData.isSajangVerified && (
              <SajangIconImage src={SajangIcon} alt="사장님 인증" />
            )}
          </Username>
          <NicknameButton onClick={handleNicknameChange}>
            닉네임 변경
          </NicknameButton>
        </UserInfo>
      </ProfileSection>

      {/* 메뉴 섹션 */}
      <MenuSection>
        <MenuItem onClick={handleViewPosts}>
          <MenuIcon>
            <MenuIconImage src={WriteIcon} alt="게시글" />
          </MenuIcon>
          <MenuText>내가 작성한 게시글 보기</MenuText>
        </MenuItem>
        
        <MenuItem onClick={handleViewWishlist}>
          <MenuIcon>
            <MenuIconImage src={HeartIcon} alt="관심목록" />
          </MenuIcon>
          <MenuText>관심 목록 보기</MenuText>
        </MenuItem>
        
        <MenuItem onClick={handleVerifyManager}>
          <MenuIcon>
            <MenuIconImage src={CheckIcon} alt="인증" />
          </MenuIcon>
          <MenuText>사장님 인증하기</MenuText>
        </MenuItem>
      </MenuSection>

      {/* 하단 일러스트레이션 */}
      <BottomIllustration>
        <BirdContainer>
          <BirdImage 
            src={Bird1Icon} 
            alt="새1" 
            style={{
              left: `${bird1Position.x}px`,
              bottom: `${bird1Position.y}px`,
              transform: 'translateX(-50%)'
            }}
            onClick={() => setBird1Position(prev => ({
              ...prev,
              y: prev.y === 0 ? -20 : 0
            }))}
          />
          <BirdImage 
            src={Bird2Icon} 
            alt="새2" 
            style={{
              left: `${bird2Position.x}px`,
              bottom: `${bird2Position.y}px`,
              transform: 'translateX(-50%)'
            }}
            onClick={() => setBird2Position(prev => ({
              ...prev,
              y: prev.y === 0 ? -20 : 0
            }))}
          />
        </BirdContainer>
      </BottomIllustration>
    </MyHomeContainer>
  );
};

export default MyHomePage;
