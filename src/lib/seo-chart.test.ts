import { describe, expect, test } from "bun:test";
import { seoSteps, visibleStepCount } from "./seo-chart";

describe("SEO staircase timeline", () => {
  test("starts at conception on day zero", () => { expect(seoSteps[0]?.day).toBe(0); });
  test("every increment spans fourteen days", () => {
    expect(seoSteps.filter(step => step.day !== 1).map(step => step.day)).toEqual([0, 14, 28, 42, 56, 70]);
  });
  test("contact takes place on day one", () => {
    expect(seoSteps.find(step => step.label === "Contact website.gg")?.day).toBe(1);
  });
  test("scroll reveals successive steps", () => {
    expect(visibleStepCount(0)).toBe(1);
    expect(visibleStepCount(0.4)).toBe(3);
    expect(visibleStepCount(1)).toBe(7);
  });
});