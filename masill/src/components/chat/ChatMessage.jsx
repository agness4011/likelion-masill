import React from "react";
import styled from "styled-components";

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
`;

const TimeStamp = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  text-align: ${({ fromMe }) => (fromMe ? "right" : "left")};
  padding: 0 4px;
`;

export default function ChatMessage({ text, fromMe, time }) {
  return (
    <MessageWrapper fromMe={fromMe}>
      <MessageContent>
        <Bubble fromMe={fromMe}>{text}</Bubble>
        <TimeStamp fromMe={fromMe}>{time}</TimeStamp>
      </MessageContent>
    </MessageWrapper>
  );
}
