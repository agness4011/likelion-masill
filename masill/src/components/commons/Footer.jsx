import React from "react";
import styled from "styled-components";

const FooterWrap = styled.footer`
  width: 100%;
  padding: 10px;
  text-align: center;
  color: #888;
  font-size: 0.875rem;
`;

export default function Footer() {
  return <FooterWrap>© 2025 Masill. All rights reserved.</FooterWrap>;
}
