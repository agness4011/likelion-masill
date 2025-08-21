import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // 로그인된 사용자 정보 가져오기
  const getCurrentUser = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (currentUser) {
      // currentUser에 nickname이 있으면 그것을 사용, 없으면 이메일 기반으로 설정
      let userNickname = currentUser.nickname;
      if (!userNickname && currentUser.email) {
        // 이메일의 @ 앞부분을 닉네임으로 사용
        userNickname = currentUser.email.split('@')[0];
      }
      if (!userNickname) {
        userNickname = "user"; // 기본값
      }
      
      console.log('=== UserContext getCurrentUser ===');
      console.log('currentUser from localStorage:', currentUser);
      console.log('userNickname:', userNickname);
      
      return {
        id: currentUser.userId,
        username: userNickname,
        nickname: userNickname,
        email: currentUser.email || "user@example.com",
        isSajangVerified: false,
        avatarId: null,
        profileImage: currentUser.profileImageUrl || localStorage.getItem('userProfileImage') || null
      };
    }
    
    // 로그인되지 않은 경우 기본값
    return {
      id: null,
      username: "user",
      nickname: "user",
      email: "user@example.com",
      isSajangVerified: false,
      avatarId: null,
      profileImage: localStorage.getItem('userProfileImage') || null
    };
  };

  const [userData, setUserData] = useState(getCurrentUser());

  // 사용자 초기화 시 랜덤 아바타 할당 및 닉네임 로드
  useEffect(() => {
    const savedAvatarId = localStorage.getItem('userAvatarId');
    const savedNickname = localStorage.getItem('nickname');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!savedAvatarId) {
      // 아바타가 설정되지 않은 경우 랜덤으로 할당
      const randomAvatarId = Math.floor(Math.random() * 6) + 1; // 1-6
      localStorage.setItem('userAvatarId', randomAvatarId.toString());
      setUserData(prev => ({
        ...prev,
        avatarId: randomAvatarId
      }));
    } else {
      // 저장된 아바타가 있는 경우 로드
      setUserData(prev => ({
        ...prev,
        avatarId: parseInt(savedAvatarId)
      }));
    }
    
    // currentUser의 닉네임만 사용 (localStorage nickname 무시)
    if (currentUser?.nickname) {
      console.log('=== currentUser 닉네임 사용 ===');
      console.log('사용할 닉네임:', currentUser.nickname);
      console.log('============================');
      
      setUserData(prev => ({
        ...prev,
        username: currentUser.nickname,
        nickname: currentUser.nickname
      }));
    } else {
      console.log('=== currentUser에 nickname이 없음 ===');
      console.log('currentUser:', currentUser);
      console.log('==============================');
    }
    
    console.log('=== UserContext 초기화 ===');
    console.log('currentUser nickname:', currentUser?.nickname);
    console.log('localStorage nickname:', savedNickname);
    console.log('전체 currentUser 객체:', currentUser);
    console.log('dummyUsers:', JSON.parse(localStorage.getItem('dummyUsers') || '[]'));
    console.log('========================');
  }, []);

  // localStorage 변경 감지 및 커스텀 이벤트 감지
          useEffect(() => {
          const handleStorageChange = (e) => {
            if (e.key === 'userProfileImage') {
              setUserData(prev => ({
                ...prev,
                profileImage: e.newValue
              }));
            }
            // currentUser가 변경되면 전체 사용자 정보 업데이트
            if (e.key === 'currentUser') {
              const newUserData = getCurrentUser();
              setUserData(newUserData);
            }
          };

    const handleProfileImageUpdate = (e) => {
      setUserData(prev => ({
        ...prev,
        profileImage: e.detail.imageUrl
      }));
    };

    const handleUserLogin = (e) => {
      const newUserData = getCurrentUser();
      setUserData(newUserData);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profileImageUpdated', handleProfileImageUpdate);
    window.addEventListener('userLogin', handleUserLogin);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileImageUpdated', handleProfileImageUpdate);
      window.removeEventListener('userLogin', handleUserLogin);
    };
  }, []);

  const updateNickname = (newNickname) => {
    console.log('UserContext: 닉네임 업데이트:', newNickname);
    
    // currentUser 업데이트
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser) {
      currentUser.nickname = newNickname;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    // localStorage nickname도 업데이트
    localStorage.setItem('nickname', newNickname);
    
    setUserData(prev => ({
      ...prev,
      username: newNickname,
      nickname: newNickname,
      isSajangVerified: prev.isSajangVerified // 사장님 인증 상태 명시적으로 유지
    }));
  };

  const verifySajang = () => {
    setUserData(prev => ({
      ...prev,
      isSajangVerified: true
    }));
  };

  const updateAvatar = (avatarId) => {
    localStorage.setItem('userAvatarId', avatarId.toString());
    setUserData(prev => ({
      ...prev,
      avatarId: avatarId
    }));
  };

  const updateProfileImage = (imageUrl) => {
    localStorage.setItem('userProfileImage', imageUrl);
    setUserData(prev => ({
      ...prev,
      profileImage: imageUrl
    }));
    
    // 같은 탭에서도 즉시 업데이트되도록 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent('profileImageUpdated', { 
      detail: { imageUrl } 
    }));
  };

  const value = {
    userData,
    updateNickname,
    verifySajang,
    updateAvatar,
    updateProfileImage
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

