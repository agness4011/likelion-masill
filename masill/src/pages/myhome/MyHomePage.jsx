import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { uploadProfileImage } from '../../api/userService';

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
import Plusbutton from '@logo/myhome/plusbutton.svg';

const MyHomeContainer = styled.div`
  min-height: 100%;
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
  position: relative;
`;

const HiddenFileInput = styled.input`
  display: none;
  
  /* 모바일에서 카메라 접근 허용 */
  &[type="file"] {
    /* iOS Safari에서 카메라 접근 */
    -webkit-appearance: none;
  }
`;

const PlusButton = styled.button`
  position: absolute;
  top: 145px;
  right: 287px;
  width: 30px;
  height: 60px;
  background: none;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: none;
  z-index: 20;
  outline: none;
  
  &:focus {
    outline: none;
  }
  
  &:active {
    outline: none;
  }
`;

const PlusButtonImage = styled.img`
  width: 30px;
  height: 35px;
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
  const { userData, updateProfileImage } = useUser();
  

  
  // 토큰 상태 확인
  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const currentUser = localStorage.getItem('currentUser');
    

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

  // 프로필 이미지 상태
  const [profileImage, setProfileImage] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef(null);

  // 페이지 로드 시 UserContext에서 프로필 이미지 불러오기
  React.useEffect(() => {
    if (userData.profileImage) {
      setProfileImage(userData.profileImage);
    }
  }, [userData.profileImage]);

  // 컴포넌트 언마운트 시 blob URL 정리 (더 이상 필요하지 않음)
  // React.useEffect(() => {
  //   return () => {
  //     if (profileImage && profileImage.startsWith('blob:')) {
  //       URL.revokeObjectURL(profileImage);
  //     }
  //   };
  // }, [profileImage]);

  // 새 위치 상태 (개별 관리)
  const [bird1Position, setBird1Position] = React.useState({ x: 160, y: 120 });
  const [bird2Position, setBird2Position] = React.useState({ x: 220, y: 101 });

  const handleHome = () => {
    navigate('/myhome');
  };

  const handleEditProfile = () => {
    navigate('/board');
  };

  

  const handleChat = () => {
    navigate('/chat');
  };

  const handleProfile = () => {

    navigate('/main');
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

  const handlePlusButton = () => {
  
    // 파일 선택 다이얼로그 열기
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    try {
      setIsUploading(true);
      
            // API 호출
      const result = await uploadProfileImage(file);
  
      
      // 업로드 성공 시 응답에서 profileImageUrl 사용
      if (result && result.success) {
        const profileImageUrl = result.data?.profileImageUrl;
        if (profileImageUrl) {
      
          localStorage.setItem('userProfileImage', profileImageUrl);
          setProfileImage(profileImageUrl);
          // UserContext 업데이트
          updateProfileImage(profileImageUrl);
        } else {
          console.warn('서버 응답에 profileImageUrl이 없습니다:', result);
          // API에서 URL을 반환하지 않는 경우, 파일을 base64로 변환하여 저장
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64Image = e.target.result;
            localStorage.setItem('userProfileImage', base64Image);
            setProfileImage(base64Image);
            updateProfileImage(base64Image);
          };
          reader.readAsDataURL(file);
        }
      } else {
        console.warn('프로필 이미지 업로드 API 실패:', result);
        // API 실패 시에도 base64로 저장하여 임시 사용
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result;
          localStorage.setItem('userProfileImage', base64Image);
          setProfileImage(base64Image);
          updateProfileImage(base64Image);
        };
        reader.readAsDataURL(file);
      }
      
      // 성공 메시지 (모바일 친화적)
      if (window.innerWidth <= 768) {
        // 모바일에서는 더 간단한 메시지
    
      } else {
        alert('프로필 이미지가 성공적으로 업로드되었습니다.');
      }
      
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
      
      // 모바일 친화적 에러 메시지
      if (window.innerWidth <= 768) {
        console.error('업로드에 실패했습니다.');
      } else {
        alert('프로필 이미지 업로드에 실패했습니다.');
      }
      
      // 실패 시 미리보기 제거
      setProfileImage(null);
    } finally {
      setIsUploading(false);
      // 파일 입력 초기화
      event.target.value = '';
    }
  };

  return (
    <MyHomeContainer>
      {/* 상태바 */}


      {/* 헤더 */}
      <Header>
        <Logo onClick={handleProfile} style={{ cursor: 'pointer' }}>
          <LogoImage src={MasilLogoIcon} alt="마실" />
        </Logo>
        <ActionIcons>
          <IconButton onClick={handleEditProfile}>
            <IconImage src={WriteIcon} alt="편집" />
          </IconButton>
         
          <IconButton onClick={handleChat}>
            <IconImage src={ChatIcon} alt="채팅" />
          </IconButton>
          <IconButton onClick={handleHome}>
            <IconImage src={HomeIcon} alt="홈" />
          </IconButton>
        </ActionIcons>
      </Header>

      {/* 프로필 섹션 */}
      <ProfileSection>
        <AvatarContainer>
          <AvatarImage 
            src={userData?.profileImage || profileImage || getCurrentAvatarIcon()} 
            alt="프로필" 
          />
          {isUploading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px'
            }}>
              업로드 중...
            </div>
          )}
        </AvatarContainer>
        <HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
        />
        <PlusButton onClick={handlePlusButton}>
          <PlusButtonImage src={Plusbutton} alt="추가" />
        </PlusButton>
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
