import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { stepsGenerator, colorCalculator } from "./utils/tools";

test("test stepGenerator", () => {
  expect(stepsGenerator(8, 3)).toStrictEqual([8, 16, 24]);
});

test("test colorCalculator", () => {
  expect(colorCalculator(0)).toBe(1);
  expect(colorCalculator(254)).toBe(255);
  expect(colorCalculator(255)).toBe(0);
  expect(colorCalculator(3000)).toBe(0);
});
