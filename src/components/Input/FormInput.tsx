import React from 'react';
import styled from 'styled-components';

type PropsTypes = {
  type: string;
  maxLength?: number;
  placeholder: string;
  state: string;
  pattern?: string;
  disabled?: boolean;
  mref?: React.RefObject<HTMLInputElement>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (
    event: React.KeyboardEvent<Element>,
    ref?: React.RefObject<HTMLInputElement>,
  ) => void;
};

function FormInput({
  type,
  maxLength,
  placeholder,
  state,
  pattern,
  disabled,
  mref,
  onChange,
  onKeyPress,
  children,
}: React.PropsWithChildren<PropsTypes>) {
  return (
    <InputWrapper>
      <input
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        value={state}
        pattern={pattern}
        onChange={onChange}
        onKeyPress={onKeyPress}
        disabled={disabled}
        ref={mref}
      />
      {children}
      <span />
    </InputWrapper>
  );
}

export default FormInput;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10px;
  input {
    :focus {
      outline: none;
    }
    box-sizing: border-box;
    padding: 0 5px;
    height: 30px;
    border: none;
    width: 100%;
    border-bottom: solid 1px black;
  }
  input ~ span {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #1e90ff;
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
