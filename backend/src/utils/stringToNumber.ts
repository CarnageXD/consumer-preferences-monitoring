export const stringToNumber = (str: string): number =>
  Number(str.replace(/[^0-9.]/g, ''));
