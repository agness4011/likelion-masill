import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Bird from "@logo/bird1.svg";

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
  width: 100%;
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
  position: relative;
`;

const BirdIcon = styled.img`
  width: 65px;
  height: 290px;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
`;

const CompletionMessage = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NicknameText = styled.span`
  font-weight: 700;
  color:rgb(0, 0, 0);
  line-height: 1.5;
  
`;

const MessageText = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #222;
  line-height: 1.5;
  white-space: nowrap;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  flex-shrink: 0;
`;

const LoginButton = styled.button`
  width: 90%;
  max-width: 340px;
  height: 48px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  background: #1B409C;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #153a8a;
  }
`;

export default function SignCompletePage() {
  const nav = useNavigate();
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    // localStorage에서 닉네임 가져오기
    const savedNickname = localStorage.getItem('nickname') || "사용자";
    setNickname(savedNickname);
  }, []);

  const handleLogin = () => {
    // 로그인 페이지로 이동
    nav("/login");
  };

  return (
    <Container>
      <TopBar>
        <TitleText>회원가입</TitleText>
      </TopBar>
      <ProgressBarWrap>
        <ProgressBar />
      </ProgressBarWrap>
      <ContentSection>
        <BirdIcon src={Bird} alt="bird" />
        
                <CompletionMessage>
          <MessageText>
            <NicknameText>{nickname}</NicknameText>님의<br />
            회원가입이 완료되었습니다.
          </MessageText>
        </CompletionMessage>
      </ContentSection>

      {/* 고정된 버튼 */}
      <ButtonContainer>
        <LoginButton onClick={handleLogin}>
          로그인
        </LoginButton>
      </ButtonContainer>
    </Container>
  );
}
