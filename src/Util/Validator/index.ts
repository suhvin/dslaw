export const isValidName = (item: string) => {
  const re = /^.{2,}$/;
  return re.test(item);
};

export const isValidUniv = (item: string) => {
  const re = /^.{2,}$/;
  return re.test(item);
};

export const isValidPw = (item: string) => {
  const re = /^\d{4}$/;
  return re.test(item);
};
