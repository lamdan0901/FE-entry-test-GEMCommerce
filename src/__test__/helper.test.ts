import { describe, it, expect } from "vitest";
import {
  normalizeDecimalSeparator,
  removeInvalidCharacters,
  ensureValidMinusSign,
  ensureSingleDecimalPoint,
  parseNumericValue,
} from "../helper";

describe("Helper Functions", () => {
  describe("normalizeDecimalSeparator", () => {
    it("should replace comma with dot", () => {
      expect(normalizeDecimalSeparator("1,23")).toBe("1.23");
      expect(normalizeDecimalSeparator("1,")).toBe("1.");
      expect(normalizeDecimalSeparator("1.23")).toBe("1.23");
    });
  });

  describe("removeInvalidCharacters", () => {
    it("should remove all non-numeric characters except dots and minus", () => {
      expect(removeInvalidCharacters("abc123.45-")).toBe("123.45-");
      expect(removeInvalidCharacters("!@#$%^&*()")).toBe("");
      expect(removeInvalidCharacters("12.34-56")).toBe("12.34-56");
    });
  });

  describe("ensureValidMinusSign", () => {
    it("should handle minus sign correctly", () => {
      expect(ensureValidMinusSign("-123")).toBe("-123");
      expect(ensureValidMinusSign("123-")).toBe("123");
      expect(ensureValidMinusSign("12-3")).toBe("123");
    });
  });

  describe("ensureSingleDecimalPoint", () => {
    it("should keep only first decimal point", () => {
      expect(ensureSingleDecimalPoint("1.23")).toBe("1.23");
      expect(ensureSingleDecimalPoint("1.2.3")).toBe("1.23");
      expect(ensureSingleDecimalPoint("1.2.3.4")).toBe("1.234");
    });
  });

  describe("parseNumericValue", () => {
    it("should parse string to number correctly", () => {
      expect(parseNumericValue("123.45")).toBe(123.45);
      expect(parseNumericValue("-123.45")).toBe(-123.45);
      expect(parseNumericValue("abc")).toBe(0);
      expect(parseNumericValue("")).toBe(0);
    });
  });
});