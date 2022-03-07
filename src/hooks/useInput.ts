import { useCallback, useState } from 'react';

export function useInput(
  initialState: '',
): [
  string,
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  React.Dispatch<React.SetStateAction<string>>,
  React.Dispatch<React.SetStateAction<string>>,
] {
  const [state, setState] = useState<string>(initialState);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setState(event.target.value);
  };
  const onReset = useCallback(
    (): void => setState(initialState),
    [initialState],
  );
  return [state, onChange, setState, onReset];
}
