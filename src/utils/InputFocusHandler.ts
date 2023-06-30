export const inputFocusHandler = (
  event: React.KeyboardEvent<Element>,
  ref: React.RefObject<HTMLInputElement>,
) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    ref.current?.focus();
  }
};
