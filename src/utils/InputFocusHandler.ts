export const inputFocusHandler = (
  event: React.KeyboardEvent<Element>,
  ref: React.RefObject<HTMLInputElement>,
) => {
  if (event.key === 'Enter') {
    ref.current?.focus();
  }
};
