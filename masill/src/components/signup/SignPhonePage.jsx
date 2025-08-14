import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Bird from "@logo/bird.svg";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #fff;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const TopBar = styled.div`
  width: 100%;
  padding: 0 0 0 8px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
`;

const BackBtn = styled.button`
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #222;
  cursor: pointer;
`;

const TitleText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #222;
`;

const ProgressBarWrap = styled.div`
  width: 100%;
  height: 6px;
  background: #f4f7ff;
  margin-bottom: 24px;
  flex-shrink: 0;
`;

const ProgressBar = styled.div`
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, #4e7aea 0%, #c1cae0 100%);
  border-radius: 3px;
  transition: width 0.3s;
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;
`;

const BirdWrap = styled.div`
  margin: 0 0 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const SectionTitle = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: #222;
  width: 90%;
  max-width: 340px;
  margin-bottom: 24px;
  text-align: left;
  flex-shrink: 0;
`;

const InputsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const InputBox = styled.div`
  width: 90%;
  max-width: 340px;
  background: ${({ $completed }) => ($completed ? '#ECF1FF' : '#fff')};
  border: 2px solid ${({ $completed }) => ($completed ? '#ECF1FF' : '#1B409C')};
  border-radius: 16px;
  padding: 18px 16px 8px 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  max-height: ${({ $visible }) => ($visible ? '200px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
  flex-shrink: 0;
`;

const InputLabel = styled.label`
  font-size: 14px;
  color: #b0b4c0;
  margin-bottom: 2px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 17px;
  color: ${({ completed }) => (completed ? '#959EB7' : '#222')};
  background: transparent;
  width: 100%;
  margin-top: 2px;
  
  &:focus {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  
  &:focus-visible {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  
  &:active {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  
  &::placeholder {
    color: #b0b4c0;
    font-size: 16px;
  }
  
  /* 커서(캐럿) 숨기기 */
  caret-color: transparent;
  
  /* 텍스트 선택 시 배경색 제거 */
  &::selection {
    background: transparent;
  }
  
  &::-moz-selection {
    background: transparent;
  }
`;

const PhoneInputBox = styled.div`
  width: 90%;
  max-width: 340px;
  background: ${({ $completed }) => ($completed ? '#ECF1FF' : '#fff')};
  border: 2px solid ${({ $completed }) => ($completed ? '#ECF1FF' : '#1B409C')};
  border-radius: 16px;
  padding: 18px 16px 8px 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  max-height: ${({ $visible }) => ($visible ? '200px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
  flex-shrink: 0;
`;

const VerificationInputBox = styled.div`
  width: 90%;
  max-width: 340px;
  background: ${({ $completed }) => ($completed ? '#ECF1FF' : '#fff')};
  border: 2px solid ${({ $completed }) => ($completed ? '#ECF1FF' : '#1B409C')};
  border-radius: 16px;
  padding: 18px 16px 8px 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  max-height: ${({ $visible }) => ($visible ? '200px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
  flex-shrink: 0;
`;

const VerificationInput = styled.input`
  border: none;
  outline: none;
  font-size: 17px;
  color: ${({ completed }) => (completed ? '#959EB7' : '#222')};
  background: transparent;
  width: 100%;
  margin-top: 2px;
  
  &:focus {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  
  &:focus-visible {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  
  &:active {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  
  &::placeholder {
    color: #b0b4c0;
    font-size: 16px;
  }
`;

const ResendBtn = styled.button`
  position: absolute;
  right: 16px;
  top: 60%;
  transform: translateY(-50%);
  background: #f8f9fa;
  border: 1px solid #1B409C;
  border-radius: 8px;
  padding: 5px 6px;
  font-size: 9px;
  color: #1B409C;
  cursor: pointer;
`;

const VerificationOptions = styled.div`
  width: 90%;
  max-width: 340px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  max-height: ${({ $visible }) => ($visible ? '50px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
  flex-shrink: 0;
`;

const HelpLink = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #b0b4c0;
  cursor: pointer;
  text-decoration: underline;
`;

const Timer = styled.div`
  font-size: 14px;
  color: #b0b4c0;
`;

const ErrorMessage = styled.div`
  width: 90%;
  max-width: 340px;
  color: #ff4757;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
  min-height: 20px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  max-height: ${({ $visible }) => ($visible ? '20px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
  flex-shrink: 0;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  flex-shrink: 0;
`;

const ConfirmBtn = styled.button`
  width: 90%;
  max-width: 340px;
  height: 48px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  background: ${({ disabled, $active }) => {
    if (disabled) return "#c1cae0";
    if ($active) return "#1B409C";
    return "#1B409C";
  }};
  color: ${({ disabled, $active }) => { 
    if(disabled) return "#727C94";
    if ($active) return "#fff";
    return "#fff";
  }};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.1s, color 0.1s;
`;

export default function SignNamePage() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showFinalStep, setShowFinalStep] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isVerificationFocused, setIsVerificationFocused] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5분 = 300초
  const [error, setError] = useState("");

  useEffect(() => {
    if (showVerification && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showVerification, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleConfirmName = () => {
    if (!name) {
      setError("이름을 입력해주세요.");
      return;
    }

    setShowPhone(true);
    setError("");
  };

  const handleSendVerification = () => {
    if (!phone) {
      setError("휴대폰 번호를 입력해주세요.");
      return;
    }

    setShowVerification(true);
    setIsButtonPressed(true);
    setTimeLeft(300);
    setError("");
  };

  const handleResend = () => {
    setTimeLeft(300);
    setError("");
  };

  const handleVerifyAndSignup = () => {
    if (!verificationCode) {
      setError("인증번호를 입력해주세요.");
      return;
    }

    // 인증번호 검증 (567567)
    if (verificationCode !== "567567") {
      setError("인증번호가 올바르지 않습니다.");
      return;
    }

    // 최종 단계로 이동
    setShowFinalStep(true);
    setError("");
  };

  const handleNext = () => {
    // 회원가입 완료 후 다음 페이지로 이동
    nav("/signup/create");
  };

    // 버튼 텍스트와 클릭 핸들러 결정
  const getButtonConfig = () => {
    if (showFinalStep) {
      return {
        text: "다음",
        disabled: false,
        onClick: handleNext
      };
    } else if (showVerification) {
      return {
        text: "인증하기",
        disabled: !verificationCode,
        onClick: handleVerifyAndSignup
      };
    } else if (showPhone) {
      return {
        text: "인증번호 받기",
        disabled: !phone,
        onClick: handleSendVerification
      };
    } else {
      return {
        text: "확인",
        disabled: !name,
        onClick: handleConfirmName
      };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <Container>
      <TopBar>
        <BackBtn onClick={() => nav(-1)} aria-label="뒤로가기">
          &#8592;
        </BackBtn>
        <TitleText>회원가입</TitleText>
      </TopBar>
      <ProgressBarWrap>
        <ProgressBar />
      </ProgressBarWrap>
      <ContentSection>
        <BirdWrap>
          <img src={Bird} alt="bird" style={{ width: 80, height: 80 }} />
        </BirdWrap>
        <SectionTitle>본인인증</SectionTitle>

        <InputsContainer>
                                {/* 이름 입력 */}
           <InputBox $visible={true} $completed={showPhone}>
             <InputLabel htmlFor="name">이름</InputLabel>
             <Input
               id="name"
               placeholder="이름을 입력해주세요"
               value={name}
               onChange={(e) => setName(e.target.value)}
               onFocus={() => setIsNameFocused(true)}
               onBlur={() => setIsNameFocused(false)}
               disabled={showPhone}
               completed={showPhone}
             />
           </InputBox>

           {/* 휴대폰 번호 입력 */}
           <PhoneInputBox $visible={showPhone} $completed={showVerification}>
             <InputLabel htmlFor="phone">휴대폰 번호</InputLabel>
             <Input
               id="phone"
               placeholder="'-'를 제외하고 입력해주세요"
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
               onFocus={() => setIsPhoneFocused(true)}
               onBlur={() => setIsPhoneFocused(false)}
               disabled={showVerification}
               completed={showVerification}
             />
           </PhoneInputBox>

           {/* 인증번호 입력 */}
           <VerificationInputBox $visible={showVerification} $completed={showFinalStep}>
             <InputLabel htmlFor="verification">인증번호</InputLabel>
             <VerificationInput
               id="verification"
               placeholder="인증번호를 입력해주세요"
               value={verificationCode}
               onChange={(e) => setVerificationCode(e.target.value)}
               onFocus={() => setIsVerificationFocused(true)}
               onBlur={() => setIsVerificationFocused(false)}
               disabled={showFinalStep}
               completed={showFinalStep}
             />
             <ResendBtn onClick={handleResend} disabled={showFinalStep}>
               재전송
             </ResendBtn>
           </VerificationInputBox>

          {/* 인증 옵션 */}
          <VerificationOptions $visible={showVerification && !showFinalStep}>
            <HelpLink>인증번호를 못 받으셨나요?</HelpLink>
            <Timer>인증시간 : {formatTime(timeLeft)}</Timer>
          </VerificationOptions>

          {/* 에러 메시지 */}
          <ErrorMessage $visible={error.length > 0}>
            {error}
          </ErrorMessage>
        </InputsContainer>

        {/* 고정된 버튼 */}
        <ButtonContainer>
          <ConfirmBtn 
            disabled={buttonConfig.disabled} 
            $active={isButtonPressed}
            onClick={buttonConfig.onClick}
          >
            {buttonConfig.text}
          </ConfirmBtn>
        </ButtonContainer>
      </ContentSection>
    </Container>
  );
}
