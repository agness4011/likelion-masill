import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Bird from "@logo/bird.svg";
import EyeOff from "@logo/eyeoff.svg";
import EyeOn from "@logo/eyeon.svg";
import { signUp, checkNicknameDuplicate } from "../../api/userService";
import { useUser } from "../../contexts/UserContext";

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
  background:#ECF1FF;
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
  width: calc(100% - 32px);
`;

const TogglePasswordBtn = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  width: 30px;
  height: 30px;
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
  const [emailId, setEmailId] = useState("ABC123");
  const [emailDomain, setEmailDomain] = useState("gmail.com");
  const [nickname, setNickname] = useState("masill_love");
  const [password, setPassword] = useState("masill@1");
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
    if (nickname.length > 0 && nicknameCompleted) {
      setCurrentStep(3);
    }
  };

  // 비밀번호 단계 처리
  const handlePasswordNext = () => {
    if (isPasswordValid()) {
      setPasswordCompleted(true);
      setCurrentStep(4);
    }
  };

  // 최종 완료
  const handleComplete = async () => {
    try {
      // 회원가입 데이터 준비 (백엔드 API 구조에 맞춤)
      const userData = {
        email: `${emailId}@${emailDomain}`,
        password: password,
        username: nickname, // 백엔드에서 username으로 닉네임을 받음
        phoneNumber: "01012345678" // 백엔드에서 phoneNumber로 받음
      };
      
      // 백엔드에서 기대하는 다른 형태의 데이터 구조도 시도
      const alternativeUserData = {
        email: `${emailId}@${emailDomain}`,
        password: password,
        username: nickname,
        phone: "01012345678" // phoneNumber 대신 phone으로 시도
      };
      
      console.log("회원가입 데이터 (기본):", userData);
      console.log("회원가입 데이터 (대안):", alternativeUserData);
      
      console.log("회원가입 데이터:", userData);
      
      // 회원가입 API 호출
      const response = await signUp(userData);
      console.log("회원가입 응답:", response);
      
      // API 응답 구조에 맞춰 처리
      if (response.success) {
        // 성공 시 닉네임을 localStorage에 저장하고 UserContext 업데이트
        const finalNickname = response.data?.nickname || nickname;
        localStorage.setItem('nickname', finalNickname);
        updateNickname(finalNickname);
        alert("회원가입이 완료되었습니다!");
        nav("/signup/region");
      } else {
        // 실패 시 에러 메시지 표시
        alert(response.message || "회원가입에 실패했습니다.");
      }
      
    } catch (error) {
      console.error("회원가입 오류:", error);
      
      // 에러 메시지 처리
      let errorMessage = "회원가입 중 오류가 발생했습니다.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = "입력 정보를 확인해주세요.";
      } else if (error.response?.status === 409) {
        errorMessage = "이미 가입된 이메일입니다.";
      } else if (error.response?.status === 500) {
        errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      }
      
      alert(errorMessage);
    }
  };

  // 이메일 유효성 검사
  const isEmailValid = emailId.length > 0 && emailDomain.length > 0;
  
  // 닉네임 유효성 검사
  const isNicknameValid = nickname.length > 0 && nicknameCompleted;
  
  // 비밀번호 유효성 검사
  const isPasswordValid = () => {
    if (password.length < 8) return false;
    
    // 영문, 숫자, 특수문자 중 3가지 조합 확인
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const conditions = [hasLetter, hasNumber, hasSpecial];
    const validConditions = conditions.filter(Boolean).length;
    
    return validConditions >= 3;
  };

  const passwordValidationMessage = () => {
    if (password.length === 0) return "영문,특수문자,숫자 3가지 조합 8자 이상";
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