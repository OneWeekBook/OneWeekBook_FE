export const setDateFormat = (date: string) => {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  return `${year}. ${month}. ${day}`;
};

export const setReadDateFormat = (date: string | null) => {
  let year = '';
  let month = '';
  let day = '';
  if (date) {
    year = date.slice(0, 4);
    month = date.slice(5, 7);
    day = date.slice(8, 10);
  }
  return `${year}. ${month}. ${day}`;
};
