import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 14px 0;
  border-radius: 24px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 12px;
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
