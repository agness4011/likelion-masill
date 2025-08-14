import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { updateNickname, checkNicknameDuplicate } from '../../api/userService';
import ArrowLeftIcon from '@logo/main/main-arrowleft.svg';
import BirdIcon from '@logo/bird1.svg';

const Container = styled.div`
  min-height: 100vh;
  background: white;
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 35px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  position: absolute;
  left: 20px;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  color: #333;
  text-align: center;
  flex: 1;
`;

const Content = styled.div`
  padding: 150px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 70vh;
`;

const BirdContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BirdImage = styled.img`
  width: 60px;
  height: 70px;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 280px;
  margin-bottom: 30px;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  width: 70%;
  min-width: 250px;
  padding: 16px 0;
  padding-right: 90px;
  border: none;
  border-bottom: 0.5px solid #000000;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  outline: none;
  background: transparent;
  text-align: center;
  margin: 0 auto;
  display: block;
  
  &:focus {
    border-bottom-color: #000000;
  }
`;

const DuplicateButton = styled.button`
  width: 63px;
  padding:5px 5px;
  border: 1px solid #CDDBFF;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 200;
  cursor: pointer;
  transition: all 0.2s;
  background: #F4F7FF;
  color: #959EB7;
  text-align: center;
  position: absolute;
  right: 110px;
  top:150%;
  transform: translateY(-60%);
  
  &:hover {
    background: white;
    border-color: #1B409C;
    color: black;
  }
  
  ${props => {
    if (props.status === 'checking') {
      return `
        background: white;
        color: black;
        border-color: #CDDBFF;
        cursor: not-allowed;
      `;
    } else if (props.status === 'available') {
      return `
        background: #28a745;
        color: white;
        border-color: #28a745;
      `;
    } else if (props.status === 'unavailable') {
      return `
        background: #dc3545;
        color: white;
        border-color: #dc3545;
      `;
    } else {
      return `
        background: #F4F7FF;
        color: #959EB7;
        border: 1px solid #CDDBFF;
      `;
    }
  }}
`;

const ChangeButton = styled.button`
  width: 100%;
  max-width: 340px;
  padding: 13px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 40px;
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  
  ${props => props.disabled ? `
    background: #e9ecef;
    color: white;
    cursor: not-allowed;
  ` : `
    background: #C1CAE0;
    color: #727C94;
    
    &:hover {
      background: #0056b3;
      color: white;
    }
  `}
`;

const ConfirmMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #333;
  margin-bottom: 30px;
`;

const NicknameChangePage = () => {
  const navigate = useNavigate();
  const { userData, updateNickname: updateUserNickname } = useUser();
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState(userData?.nickname || userData?.username || '');
  const [duplicateStatus, setDuplicateStatus] = useState('idle'); // idle, checking, available, unavailable
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate('/myhome');
  };

  const handleDuplicateCheck = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setDuplicateStatus('checking');

    try {
      const response = await checkNicknameDuplicate(nickname);
      console.log('닉네임 중복 확인 결과:', response);
      
      if (response.available) {
        setDuplicateStatus('available');
        setStep(3);
      } else {
        setDuplicateStatus('unavailable');
        setStep(4);
      }
    } catch (error) {
      console.error('닉네임 중복 확인 오류:', error);
      alert('닉네임 중복 확인 중 오류가 발생했습니다.');
      setDuplicateStatus('idle');
      setStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = async () => {
    if (step === 3 && duplicateStatus === 'available') {
      setIsLoading(true);
      
      try {
        const response = await updateNickname(nickname);
        console.log('닉네임 변경 결과:', response);
        
        if (response.success) {
          // UserContext 업데이트
          updateUserNickname(nickname);
          // localStorage 업데이트
          localStorage.setItem('nickname', nickname);
          setStep(5);
        } else {
          alert(response.message || '닉네임 변경에 실패했습니다.');
        }
      } catch (error) {
        console.error('닉네임 변경 오류:', error);
        alert('닉네임 변경 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleConfirm = () => {
    navigate('/myhome');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    
    // 입력값이 변경되면 중복 확인 상태를 초기화
    if (duplicateStatus !== 'idle') {
      setDuplicateStatus('idle');
      setStep(1);
    }
  };

  const renderContent = () => {
    // 성공 메시지 표시
    if (step === 5) {
      return (
        <>
          <ConfirmMessage>
            {nickname}으로 변경되었습니다.
          </ConfirmMessage>
          <ChangeButton onClick={handleConfirm}>
            확인
          </ChangeButton>
        </>
      );
    }

    const getDuplicateButtonText = () => {
      if (isLoading) return '확인 중...';
      switch (duplicateStatus) {
        case 'checking': return '확인 중...';
        case 'available': return '사용 가능';
        case 'unavailable': return '사용 불가';
        default: return '중복 확인';
      }
    };

    const getChangeButtonText = () => {
      if (isLoading) return '변경 중...';
      return '변경하기';
    };

    return (
      <>
        <InputContainer>
          <Input
            value={nickname}
            onChange={handleInputChange}
            placeholder="닉네임을 입력하세요"
            disabled={isLoading}
          />
          <DuplicateButton 
            status={duplicateStatus} 
            onClick={handleDuplicateCheck}
            disabled={isLoading || duplicateStatus === 'checking'}
          >
            {getDuplicateButtonText()}
          </DuplicateButton>
        </InputContainer>
        <ChangeButton 
          onClick={handleChange}
          disabled={isLoading || duplicateStatus !== 'available'}
        >
          {getChangeButtonText()}
        </ChangeButton>
      </>
    );
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <BackIcon src={ArrowLeftIcon} alt="뒤로가기" />
        </BackButton>
        <Title>닉네임 변경</Title>
      </Header>
      
      <Content>
        <BirdContainer>
          <BirdImage src={BirdIcon} alt="새" />
        </BirdContainer>
        {renderContent()}
      </Content>
    </Container>
  );
};

export default NicknameChangePage;
