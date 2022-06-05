export function useInputEnter(): {
  handleInputEnter: (
    event: React.KeyboardEvent<Element>,
    ref: React.RefObject<HTMLInputElement>,
  ) => void;
} {
  const handleInputEnter = (
    event: React.KeyboardEvent<Element>,
    ref: React.RefObject<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      ref.current?.focus();
    }
  };

  return { handleInputEnter };
}
