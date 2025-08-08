import React, { useState } from "react";
import styled from "styled-components";

const InputBar = styled.div`
  display: flex;
  padding: 12px;
  border-top: 1px solid #ddd;
  background: #fff;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 8px;
`;

const SendButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: #4f46e5;
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
`;

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState("");
  const handleSend = () => {
    if (value.trim()) {
      onSend(value.trim());
      setValue("");
    }
  };
  return (
    <InputBar>
      <TextInput
        type="text"
        placeholder="메시지 입력..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <SendButton onClick={handleSend}>전송</SendButton>
    </InputBar>
  );
}
