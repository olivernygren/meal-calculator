import React from 'react'
import styled from 'styled-components';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: any;
  onChange: (value: any) => void;
  onBlur?: () => void;
  fullWidth?: boolean;
  type?: 'text' | 'number';
}

const Input = ({ label, value, onChange, onBlur, placeholder, fullWidth }: InputProps) => {
  return (
    <Wrapper>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput
        fullWidth={fullWidth}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
    </Wrapper>
  )
}

interface StyledInputProps {
  fullWidth?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 16px;
`;

const StyledInput = styled.input<StyledInputProps>`
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  height: 48px;
  border: 1px solid #C4CED8;
  border-radius: 8px;
  background-color: white;
  padding: 4px 8px;
  font-size: 15px;

  :focus {
    border: 1px solid #C4CED8;
  }
`;

const StyledLabel = styled.span`
  font-size: 15px;
  color: #25292D;
  line-height: 2.2;
  font-weight: 500;
  font-size: 18px;
`;

export default Input;