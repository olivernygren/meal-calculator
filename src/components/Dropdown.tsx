import { CaretDown, CaretUp } from '@phosphor-icons/react';
import React, { useState } from 'react'
import styled from 'styled-components';

interface DropdownProps {
  label?: string;
  placeholder?: string;
  value?: any;
  onChange: (value: any) => void;
  onBlur?: () => void;
  options: Array<string>;
}

const Dropdown = ({ label, value, onChange, onBlur, placeholder, options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Wrapper>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledDropdown
        placeholder={placeholder}
        onChange={onChange}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={onBlur}
      >
        <span>{value}</span>
        {isOpen ? <CaretUp /> : <CaretDown />}
      </StyledDropdown>
      {isOpen && (
        <MenuContainer onClick={() => setIsOpen(false)}>
          {options.map((option: any) => (
            <MenuOption value={option} onClick={onChange}>{option}</MenuOption>
          ))}
        </MenuContainer>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div` 
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledDropdown = styled.div`
  width: 100%;
  height: 48px;
  border: 1px solid #C4CED8;
  border-radius: 8px;
  background-color: white;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLabel = styled.span`
  font-size: 18px;
  color: #25292D;
  line-height: 2.2;
  font-weight: 500;
  font-size: 15px;
`;

const MenuContainer = styled.div`
  width: 100%;
  height: fit-content;
  border: 1px solid #C4CED8;
  border-radius: 8px;
  background-color: white;
  padding: 8px;
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: calc(48px + 4px);
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const MenuOption = styled.option`
  padding: 4px 0px;
  /* padding: 2px 0px 8px 0px;
  border-bottom: 1px solid #dde2e8;

  &:last-child {
    border-bottom: none;
  } */
`;

export default Dropdown;