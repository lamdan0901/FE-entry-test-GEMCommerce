export const normalizeDecimalSeparator = (input: string): string => {
  return input.replace(",", ".");
};

export const removeInvalidCharacters = (input: string): string => {
  return input.replace(/[^0-9.-]/g, "");
};

export const ensureValidMinusSign = (input: string): string => {
  return input.lastIndexOf("-") > 0 ? input.replace(/-/g, "") : input;
};

export const ensureSingleDecimalPoint = (input: string): string => {
  const parts = input.split(".");
  if (parts.length <= 2) return input;

  // Keep first part and join all remaining parts with empty string
  return parts[0] + "." + parts.slice(1).join("");
};

export const parseNumericValue = (input: string): number => {
  if (!input) return 0;

  const numValue = parseFloat(input);
  return isNaN(numValue) ? 0 : numValue;
};
