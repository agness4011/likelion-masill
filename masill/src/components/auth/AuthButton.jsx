import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  width: 345px;
  height: 50px;
  padding: 5px 90px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 18px;

  cursor: pointer;
  border: ${({ variant }) =>
    variant === "secondary" ? "1px solid #ccc" : "none"};

  background: ${({ variant }) =>
    variant === "secondary" ? "#1B409C" : "#C1CAE0"};
  color: #fff;

  /* 클릭/호버 시 색상 변경 */
  &:hover,
  &:active {
    background: ${({ variant }) =>
      variant === "secondary" ? "#15337a" : "#1B409C"};
  }

  transition: background 0.2s ease;
`;

export default function AuthButton({ children, variant = "primary", ...rest }) {
  return (
    <Button variant={variant} {...rest}>
      {children}
    </Button>
  );
}
