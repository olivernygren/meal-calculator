import React from 'react'
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button = ({ children, onClick, disabled, fullWidth }: ButtonProps) => {
  return (
    <StyledButton 
      onClick={onClick} 
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  )
}

interface StyledButtonProps {
  disabled?: boolean;
  fullWidth?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  border-radius: 8px;
  padding: 16px;
  color: white;
  background-color: ${({ disabled }) => disabled ? '#9da6af' : '#139CE9'};
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'fit-content'};
  color: ${({ disabled }) => disabled ? '#C4CED8' : 'white'};
  font-size: 16px;
  font-weight: 500;
`;

export default Button;