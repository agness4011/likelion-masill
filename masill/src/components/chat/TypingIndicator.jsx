import React from "react";
import styled, { keyframes } from "styled-components";

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${({ fromMe }) => (fromMe ? "flex-end" : "flex-start")};
  padding: 4px 16px;
  margin-bottom: 8px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
`;

const Bubble = styled.div`
  padding: 12px 16px;
  border-radius: 18px;
  background: ${({ fromMe }) => (fromMe ? "#007AFF" : "#FFD700")};
  color: ${({ fromMe }) => (fromMe ? "#fff" : "#000")};
  font-size: 16px;
  line-height: 1.4;
  word-wrap: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #666;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  
  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
  
  &:nth-child(3) {
    animation-delay: 0s;
  }
`;

const TimeStamp = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  text-align: ${({ fromMe }) => (fromMe ? "right" : "left")};
  padding: 0 4px;
`;

export default function TypingIndicator({ fromMe = false, username = "상대방" }) {
  return (
    <MessageWrapper fromMe={fromMe}>
      <MessageContent>
        <Bubble fromMe={fromMe}>
          <span>{fromMe ? "입력 중" : `${username}이(가) 입력 중`}</span>
          <Dot />
          <Dot />
          <Dot />
        </Bubble>
        <TimeStamp fromMe={fromMe}>방금 전</TimeStamp>
      </MessageContent>
    </MessageWrapper>
  );
}
