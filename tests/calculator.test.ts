import { Calculator } from "../src/index";

describe("Calculator", () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe("add", () => {
    it("should add two positive numbers correctly", () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it("should handle negative numbers", () => {
      expect(calculator.add(-2, 3)).toBe(1);
      expect(calculator.add(2, -3)).toBe(-1);
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    it("should handle decimal numbers", () => {
      expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe("subtract", () => {
    it("should subtract two positive numbers correctly", () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    it("should handle negative numbers", () => {
      expect(calculator.subtract(-2, 3)).toBe(-5);
      expect(calculator.subtract(2, -3)).toBe(5);
      expect(calculator.subtract(-2, -3)).toBe(1);
    });

    it("should handle decimal numbers", () => {
      expect(calculator.subtract(0.3, 0.1)).toBeCloseTo(0.2);
    });
  });

  describe("multiply", () => {
    it("should multiply two positive numbers correctly", () => {
      expect(calculator.multiply(2, 3)).toBe(6);
    });

    it("should handle negative numbers", () => {
      expect(calculator.multiply(-2, 3)).toBe(-6);
      expect(calculator.multiply(2, -3)).toBe(-6);
      expect(calculator.multiply(-2, -3)).toBe(6);
    });

    it("should handle decimal numbers", () => {
      expect(calculator.multiply(0.1, 0.2)).toBeCloseTo(0.02);
    });
  });

  describe("divide", () => {
    it("should divide two positive numbers correctly", () => {
      expect(calculator.divide(6, 2)).toBe(3);
    });

    it("should handle negative numbers", () => {
      expect(calculator.divide(-6, 2)).toBe(-3);
      expect(calculator.divide(6, -2)).toBe(-3);
      expect(calculator.divide(-6, -2)).toBe(3);
    });

    it("should handle decimal numbers", () => {
      expect(calculator.divide(0.4, 0.2)).toBeCloseTo(2);
    });

    it("should throw an error when dividing by zero", () => {
      expect(() => calculator.divide(1, 0)).toThrow(
        "Division by zero is not allowed"
      );
    });
  });
});
