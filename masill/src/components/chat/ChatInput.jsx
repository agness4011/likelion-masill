import React, { useState } from "react";
import styled from "styled-components";

const InputBar = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
  gap: 8px;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 16px;
  outline: none;
  
  &:focus {
    border-color: #007AFF;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: #007AFF;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #0056CC;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export default function ChatInput({ onSend, onTypingChange }) {
  const [value, setValue] = useState("");
  
  const handleSend = () => {
    if (value.trim()) {
      onSend(value.trim());
      setValue("");
      // 메시지 전송 시 타이핑 상태 해제
      onTypingChange?.(false);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    // 입력 상태 변경 시 타이핑 상태 업데이트
    onTypingChange?.(newValue.length > 0);
  };
  
  return (
    <InputBar>
      <TextInput
        type="text"
        placeholder="메시지를 입력하세요"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <SendButton onClick={handleSend} disabled={!value.trim()}>
        ✈️
      </SendButton>
    </InputBar>
  );
}
