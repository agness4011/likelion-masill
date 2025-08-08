import React from "react";
import styled from "styled-components";
/*import Logo from '@logo/logo.png';*/

const Header = styled.div`
  text-align: center;
`;
/*const Img = styled.img`
  width: 160px;
  margin-bottom: 16px;
`;
*/
const Title = styled.h1`
  font-size: 1.25rem;
  margin: 0;
`;

export default function AuthHeader() {
  return (
    <Header>
      <Title>마실 masill</Title>
    </Header>
  );
}
