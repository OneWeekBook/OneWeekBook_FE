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
    ::placeholder {
      color: ${({ theme }) => theme.color.COLOR_FONT_FIVE};
    }
    font-size: 16px;
    padding: 0 5px;
    width: 100%;
    height: 30px;
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
