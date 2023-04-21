import styled from 'styled-components';
import { InputFormTypes } from 'types/module';
import DefaultInput from 'components/atoms/inputs/DefaultInput';
import DefaultText from 'components/atoms/texts/DefaultText';

function InputForm({
  type,
  label,
  placeholder,
  value,
  handleChange,
}: InputFormTypes) {
  return (
    <InputFormContainer>
      <DefaultText content={label} fontSize={1.6} />
      <DefaultInput
        type={type}
        placeholder={placeholder}
        value={value}
        handleChange={handleChange}
        fontSize={1.4}
      />
    </InputFormContainer>
  );
}

export default InputForm;

const InputFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  p {
    flex-shrink: 0;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    p {
      display: none;
    }
  }
`;
