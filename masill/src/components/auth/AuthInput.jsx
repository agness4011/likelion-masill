import React, { useState } from "react";
import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react";

const Field = styled.div`
  margin-bottom: 16px;
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
  width: 100%;
  padding: 12px 40px 12px 12px;
  border: 1px solid #ccc;
  border-radius: 24px;
`;
const ToggleIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
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
