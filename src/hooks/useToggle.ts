import { useState } from 'react';

function useToggle(initialValue: boolean): [boolean, () => void] {
  const [toggle, setToggle] = useState<boolean>(initialValue);
  const handleToggle = () => setToggle(!toggle);
  return [toggle, handleToggle];
}

export default useToggle;
