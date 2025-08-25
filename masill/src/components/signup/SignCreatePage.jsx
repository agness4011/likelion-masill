import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Bird from "@logo/bird.svg";
import EyeOff from "@logo/eyeoff.svg";
import EyeOn from "@logo/eyeon.svg";
import { checkNicknameDuplicate } from "../../api/userService";
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
  padding: 16px 28px 14px 20px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  max-height: ${({ $visible }) => ($visible ? '220px' : '0')};
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
  color: #727C94;
  margin-bottom: 6px;
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
    font-size: 12px;
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
  background: ${({ $isDuplicate }) => ($isDuplicate ? "#fff" : "#e8eaf2")};
  border: ${({ $isDuplicate }) => ($isDuplicate ? "1px solid #ff4757" : "none")};
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 10px;
  color: ${({ $isDuplicate }) => ($isDuplicate ? "#ff4757" : "#727C94")};
  cursor: pointer;
  font-weight: 700;
`;

const PasswordInputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordInput = styled(Input)`
  width: 100%;
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
  font-size: 12px;
  color: ${({ color }) => color || "#b0b4c0"};
  text-align: left;
  width: 100%;
  margin-bottom: 6px;   /* 라벨 위쪽에 작게 간격 */
  min-height: 16px;
  transition: all 0.3s ease;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
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

  // 단계: 1 이메일, 2 닉네임, 3 비밀번호, 4 비밀번호 재입력
  const [currentStep, setCurrentStep] = useState(1);

  // 입력값
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("gmail.com");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 유틸 상태
  const [emailCompleted, setEmailCompleted] = useState(false);
  const [nicknameCompleted, setNicknameCompleted] = useState(false);
  const [duplicateCheckAttempted, setDuplicateCheckAttempted] = useState(false);

  // 이메일
  const handleEmailNext = () => {
    if (emailId && emailDomain) {
      setEmailCompleted(true);
      setCurrentStep(2);
    }
  };

  // 닉네임
  const handleNicknameCheck = async () => {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    setDuplicateCheckAttempted(true);
    try {
      const response = await checkNicknameDuplicate(nickname);
      if (response && response.available) {
        setNicknameCompleted(true);
        setCurrentStep(3);
      } else {
        alert("이미 사용 중인 닉네임입니다.");
        setNicknameCompleted(false);
      }
    } catch (e) {
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
      setNicknameCompleted(false);
    }
  };

  // 비밀번호
  const handlePasswordNext = () => {
    if (isPasswordValid()) {
      setCurrentStep(4);
    }
  };

  // 완료
  const handleComplete = () => {
    if (!isConfirmPasswordValid()) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    localStorage.setItem("signupEmail", `${emailId}@${emailDomain}`);
    localStorage.setItem("signupNickname", nickname);
    localStorage.setItem("signupPassword", password);
    nav("/signup/region");
  };

  // 유효성
  const isEmailValid = emailId && emailDomain;
  const isNicknameValid = nickname && nicknameCompleted;

  const isPasswordValid = () => {
    if (password.length < 6) return false;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return [hasLetter, hasNumber, hasSpecial].filter(Boolean).length >= 2;
  };

  const isConfirmPasswordValid = () =>
    confirmPassword.length > 0 && confirmPassword === password;

  // 메시지
  const passwordValidationMessage = () => {
    if (!password) return "영문, 특수문자, 숫자 중 2가지 조합 6자 이상";
    return isPasswordValid()
      ? "사용가능한 비밀번호입니다."
      : "유효하지 않은 비밀번호입니다.";
  };

  const confirmPasswordValidationMessage = () => {
    if (!confirmPassword) return "비밀번호를 다시 입력해주세요.";
    return isConfirmPasswordValid()
      ? "비밀번호가 일치합니다."
      : "비밀번호가 일치하지 않습니다.";
  };

  const getButtonConfig = () => {
    switch (currentStep) {
      case 1:
        return { text: "다음", disabled: !isEmailValid, onClick: handleEmailNext };
      case 2:
        return { text: "다음", disabled: !isNicknameValid, onClick: () => setCurrentStep(3) };
      case 3:
        return { text: "다음", disabled: !isPasswordValid(), onClick: handlePasswordNext };
      case 4:
        return { text: "다음", disabled: !isConfirmPasswordValid(), onClick: handleComplete };
      default:
        return { text: "다음", disabled: true, onClick: () => {} };
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
          {/* 이메일 */}
          <InputBox $visible={currentStep >= 1}>
            {/* 이메일은 별도 메시지 없음 */}
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

          {/* 닉네임 */}
          <InputBox $visible={currentStep >= 2}>
            <InfoText
              $visible={currentStep >= 2}
              color={nicknameCompleted ? "#1B409C" : "#b0b4c0"}
            >
              {nicknameCompleted ? "사용가능한 닉네임입니다." : ""}
            </InfoText>
            <InputLabel htmlFor="nickname">닉네임</InputLabel>
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setNicknameCompleted(false);
                  setDuplicateCheckAttempted(false);
                }}
                style={{ flex: 1 }}
                disabled={currentStep > 2}
              />
              <CheckButton
                onClick={handleNicknameCheck}
                disabled={currentStep > 2}
                $isDuplicate={duplicateCheckAttempted && !nicknameCompleted}
              >
                {nicknameCompleted ? "사용가능" : "중복확인"}
              </CheckButton>
            </div>
          </InputBox>

          {/* 비밀번호 */}
          <InputBox $visible={currentStep >= 3}>
            <InfoText
              $visible={currentStep >= 3}
              color={isPasswordValid() || !password ? "#1B409C" : "#ff4757"}
            >
              {passwordValidationMessage()}
            </InfoText>
            <InputLabel htmlFor="password">비밀번호</InputLabel>
            <PasswordInputGroup>
              <PasswordInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (currentStep >= 4) setConfirmPassword("");
                }}
                disabled={currentStep > 3}
              />
              <TogglePasswordBtn
                onClick={() => setShowPassword(!showPassword)}
                disabled={currentStep > 3}
              >
                <img
                  src={showPassword ? EyeOn : EyeOff}
                  alt="비밀번호 토글"
                  style={{ width: 20, height: 20 }}
                />
              </TogglePasswordBtn>
            </PasswordInputGroup>
          </InputBox>

          {/* 비밀번호 재입력 */}
          <InputBox $visible={currentStep >= 4}>
            <InfoText
              $visible={currentStep >= 4}
              color={isConfirmPasswordValid() || !confirmPassword ? "#1B409C" : "#ff4757"}
            >
              {confirmPasswordValidationMessage()}
            </InfoText>
            <InputLabel htmlFor="confirmPassword">비밀번호 재입력</InputLabel>
            <PasswordInputGroup>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={currentStep > 4}
              />
              <TogglePasswordBtn
                onClick={() => setShowPassword(!showPassword)}
                disabled={currentStep > 4}
              >
                <img
                  src={showPassword ? EyeOn : EyeOff}
                  alt="비밀번호 토글"
                  style={{ width: 20, height: 20 }}
                />
              </TogglePasswordBtn>
            </PasswordInputGroup>
          </InputBox>
        </InputsContainer>

        <ButtonContainer>
          <NextButton disabled={buttonConfig.disabled} onClick={buttonConfig.onClick}>
            {buttonConfig.text}
          </NextButton>
        </ButtonContainer>
      </ContentSection>
    </Container>
  );
}
