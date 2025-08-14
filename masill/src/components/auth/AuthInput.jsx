import React, { useState } from "react";
import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react";

const Field = styled.div`
  margin-bottom: 16px;
  margin-left: -100px;
`;
const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
  display: block;
`;
const Wrapper = styled.div`
  position: relative;
`;
const Input = styled.input`
  width: 140%;
  border: none;
  border-bottom: 1.5px solid #c1cae0;
  padding: 12px 40px 12px 0;
  background: transparent;
  outline: none;
  font-size: 16px;
`;
const ToggleIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
`;

// Divider 스타일 정의
export const Divider = styled.div`
  position: relative;
  margin: 30px 0;
  height: 1.5px;
  background: #c1cae0;
  width: 100%;
`;

export default function AuthInput({ label, type = "text", ...rest }) {
  const isPw = type === "password";
  const [show, setShow] = useState(false);
  return (
    <Field>
      <Label>{label}</Label>
      <Wrapper>
        <Input type={isPw && show ? "text" : type} {...rest} />
        {isPw && (
          <ToggleIcon onClick={() => setShow((v) => !v)}>
            {show ? <EyeOff /> : <Eye />}
          </ToggleIcon>
        )}
      </Wrapper>
    </Field>
  );
}
