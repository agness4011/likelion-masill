import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Bird from "@logo/bird1.svg";
import { signUp, getRegionId } from "../../api/userService";
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
  const { updateNickname } = useUser();
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {
    // 회원가입 진행
    handleSignUp();
  }, []);

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      
      // localStorage에서 회원가입 정보 가져오기
      const email = localStorage.getItem('signupEmail');
      const savedNickname = localStorage.getItem('signupNickname');
      const password = localStorage.getItem('signupPassword');
      const selectedRegion = localStorage.getItem('selectedRegion') || '';
      const selectedDistrict = localStorage.getItem('selectedDistrict') || '';
      const savedRegionId = localStorage.getItem('selectedRegionId');
      
      console.log('회원가입 정보 확인:', {
        email, savedNickname, selectedRegion, selectedDistrict, savedRegionId
      });
      
      // 지역 ID 조회 (이미 저장된 것이 있으면 사용, 없으면 새로 조회)
      let regionId = null;
      if (savedRegionId) {
        console.log('저장된 지역 ID 사용:', savedRegionId);
        regionId = parseInt(savedRegionId);
      } else if (selectedRegion && selectedDistrict) {
        try {
          console.log('지역 정보 확인:', { selectedRegion, selectedDistrict });
          regionId = await getRegionId(selectedRegion, selectedDistrict);
          console.log('조회된 지역 ID:', regionId);
          // 조회된 지역 ID 저장
          localStorage.setItem('selectedRegionId', regionId);
        } catch (error) {
          console.error('지역 ID 조회 실패:', error);
          // 지역 ID 조회 실패 시 기본값 사용
          regionId = 11680; // 서울 강남구 기본값
        }
      } else {
        console.warn('지역 정보가 없습니다. 기본값을 사용합니다.');
        regionId = 11680; // 서울 강남구 기본값
      }
      
      // 회원가입 데이터 준비 - 지역 ID와 지역명 모두 포함
      const userDataOptions = [
        {
          email: email,
          password: password,
          username: savedNickname,
          phoneNumber: "01012345678",
          regionId: regionId,
          region: selectedRegion,
          district: selectedDistrict
        },
        {
          email: email,
          password: password,
          username: savedNickname,
          phone: "01012345678",
          regionId: regionId,
          region: selectedRegion,
          district: selectedDistrict
        },
        {
          email: email,
          password: password,
          nickname: savedNickname,
          phoneNumber: "01012345678",
          regionId: regionId,
          region: selectedRegion,
          district: selectedDistrict
        },
        {
          email: email,
          password: password,
          nickname: savedNickname,
          phone: "01012345678",
          regionId: regionId,
          region: selectedRegion,
          district: selectedDistrict
        },
        // 백엔드에서 regionId 대신 region, district만 기대하는 경우
        {
          email: email,
          password: password,
          username: savedNickname,
          phoneNumber: "01012345678",
          region: selectedRegion,
          district: selectedDistrict
        }
      ];
      
      console.log("회원가입 데이터 옵션들:", userDataOptions);
      
      // 첫 번째 옵션으로 시도
      const response = await signUp(userDataOptions[0]);
      console.log("회원가입 응답:", response);
      
      // API 응답 구조에 맞춰 처리
      if (response.success) {
        // 성공 시 닉네임을 localStorage에 저장하고 UserContext 업데이트
        const finalNickname = response.data?.nickname || savedNickname;
        localStorage.setItem('nickname', finalNickname);
        updateNickname(finalNickname);
        setNickname(finalNickname);
        setSignupSuccess(true);
        
        // 회원가입 완료 후 localStorage 정리
        localStorage.removeItem('signupEmail');
        localStorage.removeItem('signupNickname');
        localStorage.removeItem('signupPassword');
        
        console.log('회원가입 성공!');
      } else {
        // 실패 시 에러 메시지 표시
        alert(response.message || "회원가입에 실패했습니다.");
        nav("/signup/create"); // 다시 회원가입 페이지로
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
      nav("/signup/create"); // 다시 회원가입 페이지로
    } finally {
      setIsLoading(false);
    }
  };

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
          {isLoading ? (
            <MessageText>
              회원가입을 진행하고 있습니다...
            </MessageText>
          ) : signupSuccess ? (
            <MessageText>
              <NicknameText>{nickname}</NicknameText>님의<br />
              회원가입이 완료되었습니다.
            </MessageText>
          ) : (
            <MessageText>
              회원가입 중 오류가 발생했습니다.
            </MessageText>
          )}
        </CompletionMessage>
      </ContentSection>

      {/* 고정된 버튼 */}
      <ButtonContainer>
        {!isLoading && signupSuccess && (
          <LoginButton onClick={handleLogin}>
            로그인
          </LoginButton>
        )}
      </ButtonContainer>
    </Container>
  );
}
