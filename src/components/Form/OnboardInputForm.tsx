import _ from 'lodash';
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
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onKeyPress?: (
    event: React.KeyboardEvent<Element>,
    ref?: React.RefObject<HTMLInputElement>,
  ) => void;
};

function OnboardInputForm({
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
        defaultValue={state}
        pattern={pattern}
        onChange={_.debounce(onChange, 200)}
        onKeyPress={onKeyPress}
        disabled={disabled}
        ref={mref}
      />
      {children}
      <span />
    </InputWrapper>
  );
}

export default OnboardInputForm;

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
