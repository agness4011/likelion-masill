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
  const [userData, setUserData] = useState({
    username: localStorage.getItem('nickname') || "masill_love1",
    nickname: localStorage.getItem('nickname') || "masill_love1",
    email: "user@example.com",
    isSajangVerified: false,
    avatarId: null
  });

  // 사용자 초기화 시 랜덤 아바타 할당 및 닉네임 로드
  useEffect(() => {
    const savedAvatarId = localStorage.getItem('userAvatarId');
    const savedNickname = localStorage.getItem('nickname');
    
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
    
    // 저장된 닉네임이 있는 경우 로드
    if (savedNickname) {
      setUserData(prev => ({
        ...prev,
        username: savedNickname,
        nickname: savedNickname
      }));
    }
  }, []);

  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'nickname' && e.newValue) {
        setUserData(prev => ({
          ...prev,
          username: e.newValue,
          nickname: e.newValue
        }));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateNickname = (newNickname) => {
    console.log('UserContext: 닉네임 업데이트:', newNickname);
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

  const value = {
    userData,
    updateNickname,
    verifySajang,
    updateAvatar
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

