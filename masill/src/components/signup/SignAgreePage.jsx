// src/pages/SignAgreePage.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContainer from "@components/auth/AuthContainer";
import MasilLogo from "@/assets/masill-logo.svg";

const termsList = [
  { label: "[필수] 이용약관 동의", required: true },
  { label: "[필수] 개인정보 수집 및 이용 동의", required: true },
  { label: "[필수] AI기반 서비스 이용약관 동의", required: true },
  { label: "[선택] 마케팅 알림 수신 동의", required: false },
];

const Wrap = styled.div`
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
  width: 25%;
  height: 100%;
  background: linear-gradient(90deg, #4e7aea 0%, #c1cae0 100%);
  border-radius: 3px;
  transition: width 0.3s;
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Logo = styled.img`
  width: 110px;
  height: 90px;
  margin: 32px 0 12px 0;
  flex-shrink: 0;
`;

const MainTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #b0b4c0;
  margin-bottom: 4px;
  flex-shrink: 0;
`;

const BoldText = styled.span`
  color: #222;
  font-weight: 800;
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: #222;
  margin-bottom: 32px;
`;

const TermsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  overflow: hidden;
`;

const TermsBox = styled.div`
  width: 98%;
  max-width: 420px;
  background: #f7f8fc;
  border-radius: 12px;
  padding: 20px 0 px 0;
  margin-bottom: 3px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.03);
  flex-shrink: 0;
`;

const AllAgreeBox = styled.div`
  width: 98%;
  max-width: 350px;
  background: #f7f8fc;
  border-radius: 12px;
  padding: 20px 0 px 0;
  margin-bottom: 10px;
  margin-top: 20px;
  flex-shrink: 0;
`;

const IndividualTermsBox = styled.div`
  width: 98%;
  max-width: 370px;
  background: #f7f8fc;
  border-radius: 12px;
  padding: 20px 0 px 0;
  margin-bottom: 5px;
  flex-shrink: 0;
`;

const Row = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 18px;
  cursor: pointer;
  text-align: left;
  background: transparent;
  border: 0;
  outline: none;
  font-size: 16px;
  color: #727C94;
  border-radius: 8px;
  transition: background 0.15s;
  &:hover {
    background: #f0f3fa;
  }
`;

const CheckBox = styled.input`
  accent-color: #4e7aea;
  width: 20px;
  height: 20px;
  margin-right: 4px;
`;

const AllAgreeRow = styled(Row)`
  background: #fff;
  border: 1.5px solid #c1cae0;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 17px;
`;

const ViewBtn = styled.span`
  margin-left: auto;
  color: #4e7aea;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  flex-shrink: 0;
`;

const NextBtn = styled.button`
  width: 90%;
  max-width: 370px;
  height: 50px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 18px;
  border: 0;
  color: #fff;
  background: ${({ disabled, $active }) => {
    if (disabled) return "#c1cae0";
    if ($active) return "#1B409C";
    return "#1B409C";
  }};
  color: ${({ disabled,$active }) => { 
    if(disabled) return "#727C94";
    if ($active) return "#fff";
    return "#fff";
  }};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.1s, color 0.1s;
`;

export default function SignAgreePage() {
  const nav = useNavigate();
  const [checked, setChecked] = useState({});

  const allRequired = useMemo(
    () => termsList.every((t, i) => (t.required ? !!checked[i] : true)),
    [checked]
  );
  const allIncludingOptional = useMemo(
    () => termsList.every((_, i) => !!checked[i]),
    [checked]
  );

  const toggleAll = (on) => {
    const obj = {};
    termsList.forEach((_, i) => (obj[i] = !!on));
    setChecked(obj);
  };

  const toggleOne = (i) => setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <AuthContainer scroll={false}>
      <Wrap>
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
          <Logo src={MasilLogo} alt="마실 로고" />
          <MainTitle>
            시작을 위해서는<br />
            <BoldText>약관 동의</BoldText>가 필요해요
          </MainTitle>
          
          <TermsContainer>
            {/* 전체 동의 박스 */}
            <AllAgreeBox>
              <AllAgreeRow
                type="button"
                onClick={() => toggleAll(!allIncludingOptional)}
              >
                <CheckBox type="checkbox" readOnly checked={allIncludingOptional} />
                전체 동의{" "}
                <span style={{ color: "#b0b4c0", fontWeight: 400, fontSize: 15 }}>
                  {" "}
                  [선택항목 포함]
                </span>
              </AllAgreeRow>
            </AllAgreeBox>

            {/* 개별 약관 박스 */}
            <IndividualTermsBox>
              {termsList.map((t, i) => (
                <Row key={i} type="button" onClick={() => toggleOne(i)}>
                  <CheckBox type="checkbox" readOnly checked={!!checked[i]} />
                  {t.label}
                  <ViewBtn>보기</ViewBtn>
                </Row>
              ))}
            </IndividualTermsBox>
          </TermsContainer>

          {/* 고정된 버튼 */}
          <ButtonContainer>
            <NextBtn disabled={!allRequired} onClick={() => nav("/signup/phone")}>
              다음
            </NextBtn>
          </ButtonContainer>
        </ContentSection>
      </Wrap>
    </AuthContainer>
  );
}
