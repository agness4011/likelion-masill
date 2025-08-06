import React from "react";
import styled from "styled-components";

const Bar = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  background: #fafafa;
`;

export default function HeaderBar() {
  return (
    <Bar>
      <a href="/main">홈</a>
      <a href="/login">로그인</a>
    </Bar>
  );
}
