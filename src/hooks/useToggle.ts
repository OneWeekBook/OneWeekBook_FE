import { useState } from 'react';

export function useToggle(initialValue: boolean): [boolean, () => void] {
  const [state, setState] = useState<boolean>(initialValue);
  const toggleState = () => setState(!state);
  return [state, toggleState];
}
