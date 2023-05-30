import React, { useState, useCallback, ChangeEvent } from 'react';

type onChangeType = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

const useInput = (initValue = '') => {
  const [value, setValue] = useState(initValue);

  const handler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      setValue(val);
    },
    [],
  );

  return [value, handler, setValue] as [string, onChangeType, typeof setValue];
};

export default useInput;
