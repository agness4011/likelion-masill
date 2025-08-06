import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 14px 0;
  border: 1px solid #ccc;
  border-radius: 24px;
  background: #fafafa;
  font-size: 1rem;
  cursor: pointer;
`;

export default function OnboardingButton({ onClick, children }) {
  return <Button onClick={onClick}>{children}</Button>;
}

