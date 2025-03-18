import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  beforeEach(() => {
    cleanup();
    render(<App />);
  });

  afterEach(() => {
    cleanup();
  });

  const switchToPixels = () => {
    const pxButton = screen.getByRole("button", { name: /px/i });
    fireEvent.click(pxButton);
  };

  const switchToPercentage = () => {
    const percentButton = screen.getByRole("button", { name: /%/i });
    fireEvent.click(percentButton);
  };

  describe("Input Handling", () => {
    it("should handle valid numeric input in percentage mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "42.5" } });
      expect(input.value).toBe("42.5");
    });

    it("should handle valid numeric input in pixel mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      switchToPixels();
      fireEvent.change(input, { target: { value: "150.5" } });
      expect(input.value).toBe("150.5");
    });

    it("should clean invalid input", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "abc123.45def" } });
      expect(input.value).toBe("123.45");
    });

    it("should handle negative numbers in pixel mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      switchToPixels();
      fireEvent.change(input, { target: { value: "-42.5" } });
      expect(input.value).toBe("-42.5");
    });

    it("should normalize decimal separator", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "42,5" } });
      expect(input.value).toBe("42.5");
    });
  });

  describe("Value Constraints", () => {
    it("should not allow values below 0 in percentage mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "-42.5" } });
      fireEvent.blur(input);
      expect(input.value).toBe("0");
    });

    it("should not allow negative values in pixel mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      switchToPixels();
      fireEvent.change(input, { target: { value: "-42.5" } });
      fireEvent.blur(input);
      expect(input.value).toBe("0");
    });

    it("should limit percentage to 100 in percentage mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "150" } });
      fireEvent.blur(input);
      expect(input.value).toBe("100");
    });

    it("should not limit values in pixel mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      switchToPixels();
      fireEvent.change(input, { target: { value: "150" } });
      fireEvent.blur(input);
      expect(input.value).toBe("150");
    });
  });

  describe("Increment/Decrement", () => {
    it("should increment value in percentage mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      const incrementButton = screen.getByRole("button", {
        name: /increment/i,
      });

      fireEvent.change(input, { target: { value: "42" } });
      fireEvent.click(incrementButton);
      expect(input.value).toBe("43");
    });

    it("should increment value in pixel mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      const incrementButton = screen.getByRole("button", {
        name: /increment/i,
      });

      switchToPixels();
      fireEvent.change(input, { target: { value: "150" } });
      fireEvent.click(incrementButton);
      expect(input.value).toBe("151");
    });

    it("should decrement value in percentage mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      const decrementButton = screen.getByRole("button", {
        name: /decrement/i,
      });

      fireEvent.change(input, { target: { value: "42" } });
      fireEvent.click(decrementButton);
      expect(input.value).toBe("41");
    });

    it("should decrement value in pixel mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      const decrementButton = screen.getByRole("button", {
        name: /decrement/i,
      });

      switchToPixels();
      fireEvent.change(input, { target: { value: "150" } });
      fireEvent.click(decrementButton);
      expect(input.value).toBe("149");
    });

    it("should not decrement below 0 in percentage mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      const decrementButton = screen.getByRole("button", {
        name: /decrement/i,
      });

      fireEvent.change(input, { target: { value: "0" } });
      fireEvent.click(decrementButton);
      expect(input.value).toBe("0");
    });

    it("should not allow decrement below 0 in pixel mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      const decrementButton = screen.getByRole("button", {
        name: /decrement/i,
      });

      switchToPixels();
      fireEvent.change(input, { target: { value: "0" } });
      fireEvent.click(decrementButton);
      expect(input.value).toBe("0");
    });

    it("should not increment percentage above 100", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      const incrementButton = screen.getByRole("button", {
        name: /increment/i,
      });

      fireEvent.change(input, { target: { value: "100" } });
      fireEvent.click(incrementButton);
      expect(input.value).toBe("100");
    });

    it("should allow increment above 100 in pixel mode", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;
      const incrementButton = screen.getByRole("button", {
        name: /increment/i,
      });

      switchToPixels();
      fireEvent.change(input, { target: { value: "100" } });
      fireEvent.click(incrementButton);
      expect(input.value).toBe("101");
    });
  });

  describe("Unit Switching", () => {
    it("should adjust value when switching to percentage if over 100", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;

      switchToPixels();
      fireEvent.change(input, { target: { value: "150" } });
      switchToPercentage();
      expect(input.value).toBe("100");
    });

    it("should preserve value when switching to pixels", () => {
      const input = screen.getByTestId("value-input") as HTMLInputElement;

      fireEvent.change(input, { target: { value: "75" } });
      switchToPixels();
      expect(input.value).toBe("75");
    });
  });
});
