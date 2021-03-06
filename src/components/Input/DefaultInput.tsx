import styled from 'styled-components';

type PropsTypes = {
  type: string;
  title: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

function DefaultInput({
  type,
  title,
  placeholder,
  value,
  onChange,
}: PropsTypes) {
  return (
    <InputWrapper>
      <p>{title}</p>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        onBlur={onChange}
      />
    </InputWrapper>
  );
}

export default DefaultInput;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  margin: 5px auto;
  width: 100%;
  p {
    flex-shrink: 0;
  }
  input {
    box-sizing: border-box;
    padding-left: 10px;
    max-width: 300px;
    width: 100%;
    height: 40px;
    margin-left: 10px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    margin: 20px auto;
    font-size: 14px;
  }
`;
