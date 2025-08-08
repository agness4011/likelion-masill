import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  background: #fff;
`;

const BackButton = styled.button`
  margin-right: 12px;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.125rem;
`;

export default function ChatHeader({ title }) {
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <BackButton onClick={() => navigate(-1)}>&larr;</BackButton>
      <Title>{title}</Title>
    </HeaderWrapper>
  );
}
