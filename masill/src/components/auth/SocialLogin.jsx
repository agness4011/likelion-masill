import React from "react";
import styled from "styled-components";
//import KakaoIcon from "@logo/kakao.svg";
//import NaverIcon from "@logo/naver.svg";

const Block = styled.div`
  max-width: 320px;
  margin: 0 auto;
  text-align: center;
`;

const Divider = styled.div`
  position: relative;
  margin: 30px 0;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #ddd;
  }
`;

const DividerText = styled.span`
  background: #fff;
  padding: 0 16px;
  color: #666;
  font-size: 14px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const SocialBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background: #f5f5f5;
  }
`;

const Signup = styled.div`
  margin-top: 30px;
  font-size: 14px;
  color: #666;

  a {
    color: #4e7aea;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 4px;
  }
`;

export default function SocialLogin({ onSignup }) {
  const handleKakao = () => {
    // TODO: 카카오/톡 소셜 로그인
    alert("소셜 로그인은 추후 연동");
  };

  const handleNaver = () => {
    // TODO: 네이버 로그인
    alert("네이버 로그인은 추후 연동");
  };

  return (
    <Block>
      <Divider>
        <DividerText>소셜 로그인</DividerText>
      </Divider>

      <Row>
        <SocialBtn onClick={handleKakao} aria-label="카카오톡으로 로그인">
          💬
        </SocialBtn>
        <SocialBtn onClick={handleNaver} aria-label="네이버로 로그인">
          <div
            style={{
              width: "20px",
              height: "20px",
              background: "#03c75a",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            N
          </div>
        </SocialBtn>
      </Row>

      <Signup>
        아직 회원이 아니신가요?<a onClick={onSignup}>회원가입</a>
      </Signup>
    </Block>
  );
}
