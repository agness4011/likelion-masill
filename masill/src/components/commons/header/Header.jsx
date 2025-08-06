import React from "react";
import styled from "styled-components";

const HeaderWrap = styled.header`
  width: 100%;
  padding: 16px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function Header() {
  return (
    <HeaderWrap>
      <h1>마실 masill</h1>
    </HeaderWrap>
  );
}
