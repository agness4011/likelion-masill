import React from "react";
import styled from "styled-components";
import KakaoIcon from "@logo/kakao.svg";
import NaverIcon from "@logo/naver.svg";

const Container = styled.div`
  text-align: center;
`;
const Divider = styled.div`
  position: relative;
  margin: 24px 0;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background: #ccc;
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
  span {
    padding: 0 8px;
    background: #fff;
  }
`;
const Icons = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;
const IconBtn = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: #eee;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
  }
`;

export default function SocialLogin() {
  return (
    <Container>
      <Divider>
        <span>소셜 로그인</span>
      </Divider>
      <Icons>
        <IconBtn
          onClick={() => {
            /* 카카오 로그인 로직 */
          }}
        >
          <img src={KakaoIcon} alt="카카오 로그인" />
        </IconBtn>
        <IconBtn
          onClick={() => {
            /* 네이버 로그인 로직 */
          }}
        >
          <img src={NaverIcon} alt="네이버 로그인" />
        </IconBtn>
      </Icons>
    </Container>
  );
}
