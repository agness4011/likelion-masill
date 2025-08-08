import React from "react";
import styled from "styled-components";

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${({ fromMe }) => (fromMe ? "flex-end" : "flex-start")};
  padding: 4px 16px;
`;

const Bubble = styled.div`
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 16px;
  background: ${({ fromMe }) => (fromMe ? "#4f46e5" : "#e5e7eb")};
  color: ${({ fromMe }) => (fromMe ? "#fff" : "#000")};
  font-size: 0.95rem;
`;

export default function ChatMessage({ text, fromMe }) {
  return (
    <MessageWrapper fromMe={fromMe}>
      <Bubble fromMe={fromMe}>{text}</Bubble>
    </MessageWrapper>
  );
}
