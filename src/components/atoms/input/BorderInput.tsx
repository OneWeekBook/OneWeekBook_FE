import React from 'react';
import styled from 'styled-components';

interface InputProps {
  type: string;
  maxLength?: number;
  placeholder: string;
  value: string;
  pattern?: string;
  disabled?: boolean;
  mref?: React.RefObject<HTMLInputElement>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (
    event: React.KeyboardEvent<Element>,
    ref?: React.RefObject<HTMLInputElement>,
  ) => void;
}

function BorderInput({
  type,
  maxLength,
  placeholder,
  value,
  pattern,
  disabled,
  mref,
  onChange,
  onKeyPress,
  children,
}: React.PropsWithChildren<InputProps>) {
  return (
    <BorderInputAtom>
      <input
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        pattern={pattern}
        onChange={onChange}
        onKeyPress={onKeyPress}
        disabled={disabled}
        ref={mref}
        autoComplete="off"
      />
      {children}
      <span />
    </BorderInputAtom>
  );
}

export default BorderInput;

const BorderInputAtom = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10px;
  input {
    :focus {
      outline: none;
    }
    ::placeholder {
      color: ${({ theme }) => theme.color.COLOR_FONT_FIVE};
    }
    font-size: 16px;
    padding: 5px;
    width: 100%;
    height: 34px;
    box-sizing: border-box;
    border: none;
    border-bottom: solid 2px ${({ theme }) => theme.color.COLOR_LAYOUT_THREE};
  }
  input ~ span {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.color.COLOR_MAIN};
    transition: 0.4s;
  }
  input:focus ~ span {
    width: 100%;
    transition: 0.4s;
    left: 0;
  }
  input:disabled {
    background-color: white;
  }
`;
