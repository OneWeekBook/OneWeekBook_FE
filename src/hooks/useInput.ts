import { useState } from 'react';

export function useInput(
  initialState: '',
): [
  string,
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
] {
  const [state, setState] = useState<string>(initialState);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setState(event.target.value);
  };

  return [state, onChange];
}
