import React from 'react';
import styled from 'styled-components';
import { BorderInputTypes } from 'types/atom';

function BorderInput({
  type,
  maxLength,
  placeholder,
  value,
  pattern,
  disabled,
  mref,
  handleChange,
  onKeyPress,
  children,
}: React.PropsWithChildren<BorderInputTypes>) {
  return (
    <BorderInputAtom>
      <input
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        pattern={pattern}
        onChange={handleChange}
        onKeyDown={onKeyPress}
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
      color: ${({ theme }) => theme.color.COLOR_SIENNA};
    }
    font-size: 1.6rem;
    padding: 5px;
    width: 100%;
    height: 34px;
    box-sizing: border-box;
    border: none;
    border-bottom: solid 2px ${({ theme }) => theme.color.COLOR_DIM_GRAY};
  }
  input ~ span {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.color.COLOR_CORAL};
    transition: 0.4s;
  }
  input:focus ~ span {
    width: 100%;
    transition: 0.4s;
    left: 0;
  }
  input:disabled {
    background-color: ${({ theme }) => theme.color.COLOR_WHITE};
  }
`;
