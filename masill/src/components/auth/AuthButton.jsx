import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  padding: 14px 0;
  border-radius: 24px;
  font-size: 1rem;
  cursor: pointer;
  background: ${({ variant }) =>
    variant === 'secondary' ? '#fff' : '#fafafa'};
  border: ${({ variant }) =>
    variant === 'secondary' ? '1px solid #ccc' : 'none'};
  margin-bottom: 12px;
`;

export default function AuthButton({ children, variant = 'primary', ...rest }) {
  return (
    <Button variant={variant} {...rest}>
      {children}
    </Button>
  );
}
