import { expect, test } from "@playwright/test";

test.describe("Memory Pairs", () => {
  test("plays a deterministic small board, wins, and restarts", async ({ page }) => {
    await page.goto("/?pairs=2&seed=ordered");

    await expect(page.getByRole("heading", { name: "Memory Pairs" })).toBeVisible();
    await expect(page.getByLabel("Game stats")).toContainText("0/2");

    await page.getByTestId("card-1").click();
    await page.getByTestId("card-2").click();
    await expect(page.getByLabel("Game stats")).toContainText("1/2");

    await page.getByTestId("card-3").click();
    await page.getByTestId("card-4").click();
    await expect(page.getByRole("heading", { name: "You found every pair." })).toBeVisible();
    await expect(page.getByText("Finished in 2 moves")).toBeVisible();

    await page.getByRole("button", { name: "Play again" }).click();
    await expect(page.getByLabel("Game stats")).toContainText("0/2");
  });

  test("supports keyboard card selection", async ({ page }) => {
    await page.goto("/?pairs=1&seed=ordered");

    await page.getByTestId("card-1").focus();
    await page.keyboard.press("Enter");
    await page.getByTestId("card-2").focus();
    await page.keyboard.press("Enter");

    await expect(page.getByRole("heading", { name: "You found every pair." })).toBeVisible();
  });

  test("captures desktop and mobile screenshots", async ({ page }) => {
    await page.goto("/?pairs=2&seed=ordered");
    await page.screenshot({ path: "tests/screenshots/memory-game-desktop.png", fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/?pairs=2&seed=ordered");
    await page.screenshot({ path: "tests/screenshots/memory-game-mobile.png", fullPage: true });
  });
});
