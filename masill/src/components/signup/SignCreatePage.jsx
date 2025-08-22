import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Bird from "@logo/bird.svg";
import EyeOff from "@logo/eyeoff.svg";
import EyeOn from "@logo/eyeon.svg";
import { signUp, checkNicknameDuplicate, getRegionId } from "../../api/userService";
import { useUser } from "../../contexts/UserContext";

const Container = styled.div`
  width: 100%;
  
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
  width: 70%;
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
  padding: 0 20px 200px 20px;
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
  overflow-y: auto;
  padding-bottom: 100px;
  max-height: calc(100vh - 300px);
`;

const InputBox = styled.div`
  width: 90%;
  max-width: 340px;
  background:#ECF1FF;
  border-radius: 16px;
  padding: 18px 16px 5px 16px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  max-height: ${({ $visible }) => ($visible ? '200px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
  flex-shrink: 0;
  border: 2px solid transparent;

  &:focus-within {
    background: #fff;
    border: 2px solid #1B409C;
  }
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
  color: #222;
  background: transparent;
  width: 100%;
  margin-top: 2px;

  &::placeholder {
    color: #b0b4c0;
    font-size: 16px;
  }
`;

const EmailInputGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const EmailIdInput = styled(Input)`
  flex: 1;
`;

const AtSymbol = styled.span`
  font-size: 17px;
  color: #222;
  margin: 0 4px;
`;

const EmailDomainSelect = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: #e8eaf2;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  color: #222;
  cursor: pointer;
  outline: none;
`;

const CheckButton = styled.button`
  background: #e8eaf2;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: #1B409C;
  cursor: pointer;
  font-weight: 700;
`;

const PasswordInputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordInput = styled(Input)`
  width: 100%;
  
  /* 모든 브라우저의 기본 비밀번호 표시/숨기기 버튼 완전 제거 */
  &::-ms-reveal,
  &::-ms-clear,
  &::-webkit-credentials-auto-fill-button,
  &::-webkit-contacts-auto-fill-button,
  &::-webkit-strong-password-auto-fill-button,
  &::-moz-credentials-auto-fill-button {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    position: absolute !important;
    pointer-events: none !important;
  }
  
  /* 추가적인 Webkit 스타일 완전 제거 */
  &::-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
  }
  
  /* Safari 특별 처리 */
  &::-webkit-search-cancel-button,
  &::-webkit-search-decoration {
    display: none !important;
  }
`;

const TogglePasswordBtn = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  width: 30px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const InfoText = styled.div`
  font-size: 14px;
  color: ${({ color }) => color || "#b0b4c0"};
  text-align: left;
  width: 90%;
  max-width: 340px;
  margin-top: -8px;
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
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  background: white;
  z-index: 10;
`;

const NextButton = styled.button`
  width: 90%;
  max-width: 340px;
  height: 48px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  background: ${({ disabled }) => (disabled ? "#c1cae0" : "#1B409C")};
  color: ${({ disabled }) => (disabled ? "#727C94" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.1s, color 0.1s;
`;

export default function SignCreatePage() {
  const nav = useNavigate();
  const { updateNickname } = useUser();
  
  // 단계별 상태 관리
  const [currentStep, setCurrentStep] = useState(1); // 1: 이메일, 2: 닉네임, 3: 비밀번호, 4: 완료
  
  // 입력값 상태
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("gmail.com");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // 각 단계별 완료 상태
  const [emailCompleted, setEmailCompleted] = useState(false);
  const [nicknameCompleted, setNicknameCompleted] = useState(false);
  const [passwordCompleted, setPasswordCompleted] = useState(false);

  // 이메일 단계 처리
  const handleEmailNext = () => {
    if (emailId.length > 0 && emailDomain.length > 0) {
      setEmailCompleted(true);
      setCurrentStep(2);
    }
  };

  // 닉네임 중복확인 및 다음 단계
  const handleNicknameCheck = async () => {
    try {
      if (nickname.length === 0) {
        alert("닉네임을 입력해주세요.");
        return;
      }
      
      const response = await checkNicknameDuplicate(nickname);
      console.log("닉네임 중복 확인 결과:", response);
      
      // API 응답에 따라 처리
      if (response.available) {
        setNicknameCompleted(true);
        alert(response.message || "사용 가능한 닉네임입니다.");
      } else {
        alert(response.message || "이미 사용 중인 닉네임입니다.");
        setNicknameCompleted(false);
      }
    } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handleNicknameNext = () => {
    if (nickname.length > 0) {
      // 중복확인을 하지 않았으면 경고 메시지 표시
      if (!nicknameCompleted) {
        if (confirm("닉네임 중복확인을 하지 않았습니다. 계속 진행하시겠습니까?")) {
          setCurrentStep(3);
        }
      } else {
        setCurrentStep(3);
      }
    }
  };

  // 비밀번호 단계 처리
  const handlePasswordNext = () => {
    if (isPasswordValid()) {
      setPasswordCompleted(true);
      setCurrentStep(4);
    }
  };

    // 최종 완료 - 지역 선택 페이지로 이동
  const handleComplete = () => {
    // 입력된 정보를 localStorage에 저장
    localStorage.setItem('signupEmail', `${emailId}@${emailDomain}`);
    localStorage.setItem('signupNickname', nickname);
    localStorage.setItem('signupPassword', password);
    
    console.log('회원가입 정보 저장:', {
      email: `${emailId}@${emailDomain}`,
      nickname: nickname,
      password: password
    });
    
    // 지역 선택 페이지로 이동
    nav("/signup/region");
  };

  // 이메일 유효성 검사
  const isEmailValid = emailId.length > 0 && emailDomain.length > 0;
  
  // 닉네임 유효성 검사 - 중복확인 없이도 다음으로 넘어갈 수 있도록 수정
  const isNicknameValid = nickname.length > 0;
  
  // 비밀번호 유효성 검사
  const isPasswordValid = () => {
    if (password.length < 6) return false;
    
    // 영문, 숫자, 특수문자 중 2가지 조합 확인
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const conditions = [hasLetter, hasNumber, hasSpecial];
    const validConditions = conditions.filter(Boolean).length;
    
    return validConditions >= 2;
  };

  const passwordValidationMessage = () => {
    if (password.length === 0) return "영문,특수문자,숫자 중 2가지 조합 6자 이상";
    if (isPasswordValid()) return "사용가능한 비밀번호입니다.";
    return "유효하지 않은 비밀번호입니다.";
  };

  const passwordValidationColor = () => {
    if (password.length === 0) return "#b0b4c0";
    if (isPasswordValid()) return "#1B409C";
    return "#ff4757";
  };

  // 버튼 텍스트와 클릭 핸들러 결정
  const getButtonConfig = () => {
    switch (currentStep) {
      case 1:
        return {
          text: "다음",
          disabled: !isEmailValid,
          onClick: handleEmailNext
        };
      case 2:
        return {
          text: "다음",
          disabled: !isNicknameValid,
          onClick: handleNicknameNext
        };
      case 3:
        return {
          text: "다음",
          disabled: !isPasswordValid(),
          onClick: handlePasswordNext
        };
      case 4:
        return {
          text: "다음",
          disabled: false,
          onClick: handleComplete
        };
      default:
        return {
          text: "다음",
          disabled: true,
          onClick: () => {}
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
        <SectionTitle>아이디 생성</SectionTitle>

        <InputsContainer>
          {/* 이메일 입력 */}
          <InputBox $visible={currentStep >= 1}>
            <InputLabel htmlFor="email">이메일</InputLabel>
            <EmailInputGroup>
              <EmailIdInput
                id="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                disabled={currentStep > 1}
              />
              <AtSymbol>@</AtSymbol>
              <EmailDomainSelect
                value={emailDomain}
                onChange={(e) => setEmailDomain(e.target.value)}
                disabled={currentStep > 1}
              >
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="직접입력">직접입력</option>
              </EmailDomainSelect>
            </EmailInputGroup>
          </InputBox>
          
          {/* 닉네임 입력 */}
          <InputBox $visible={currentStep >= 2}>
            <InputLabel htmlFor="nickname">닉네임</InputLabel>
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                style={{ flex: 1 }}
                disabled={currentStep > 2}
              />
              <CheckButton 
                onClick={handleNicknameCheck}
                disabled={currentStep > 2}
              >
                중복확인
              </CheckButton>
            </div>
          </InputBox>
          <InfoText 
            $visible={currentStep >= 2} 
            color={nicknameCompleted ? "#1B409C" : "#b0b4c0"}
          >
            {nicknameCompleted ? "사용가능한 닉네임입니다." : ""}
          </InfoText>

          {/* 비밀번호 입력 */}
          <InputBox $visible={currentStep >= 3}>
            <InputLabel htmlFor="password">비밀번호</InputLabel>
            <PasswordInputGroup>
              <PasswordInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={currentStep > 3}
              />
              <TogglePasswordBtn 
                onClick={() => setShowPassword(!showPassword)}
                disabled={currentStep > 3}
              >
                <img 
                  src={showPassword ? EyeOn : EyeOff} 
                  alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                  style={{ width: "20px", height: "20px" }}
                />
              </TogglePasswordBtn>
            </PasswordInputGroup>
          </InputBox>
          <InfoText 
            $visible={currentStep >= 3} 
            color={passwordValidationColor()}
          >
            {passwordValidationMessage()}
          </InfoText>
        </InputsContainer>

        {/* 고정된 버튼 */}
        <ButtonContainer>
          <NextButton 
            disabled={buttonConfig.disabled} 
            onClick={buttonConfig.onClick}
          >
            {buttonConfig.text}
          </NextButton>
        </ButtonContainer>
      </ContentSection>
    </Container>
  );
}