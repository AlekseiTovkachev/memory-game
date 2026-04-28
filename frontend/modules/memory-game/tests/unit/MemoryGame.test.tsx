import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryGame } from "../../src";

describe("MemoryGame", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a playable board and restarts visible progress", async () => {
    const user = userEvent.setup();
    render(<MemoryGame pairCount={2} seed="ordered" />);

    await user.click(screen.getByTestId("card-1"));
    await user.click(screen.getByTestId("card-2"));
    expect(screen.getByText("1/2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Restart" }));
    expect(screen.getByText("0/2")).toBeInTheDocument();
  });

  it("disables mismatched cards until the mismatch is resolved", async () => {
    vi.useFakeTimers();
    render(<MemoryGame pairCount={2} seed="ordered" resolveDelayMs={500} />);

    fireEvent.click(screen.getByTestId("card-1"));
    fireEvent.click(screen.getByTestId("card-3"));

    expect(screen.getByTestId("card-2")).toBeDisabled();
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.getByTestId("card-2")).not.toBeDisabled();
  });

  it("shows the win summary after every pair is matched", async () => {
    const user = userEvent.setup();
    render(<MemoryGame pairCount={2} seed="ordered" />);

    await user.click(screen.getByTestId("card-1"));
    await user.click(screen.getByTestId("card-2"));
    await user.click(screen.getByTestId("card-3"));
    await user.click(screen.getByTestId("card-4"));

    expect(screen.getByRole("heading", { name: "You found every pair." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Play again" })).toBeInTheDocument();
  });
});
