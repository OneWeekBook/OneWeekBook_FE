import { useState } from 'react';

function useToggle(initialValue: boolean): [boolean, () => void] {
  const [state, setState] = useState<boolean>(initialValue);
  const toggleState = () => setState(!state);
  return [state, toggleState];
}

export default useToggle;
