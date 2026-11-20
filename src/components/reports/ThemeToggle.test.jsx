import { describe, it, expect } from "vitest";

import {
    render,
    screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { ColorModeProvider, useColorMode } from "../../context/ColorModeContext";

function ThemeToggle() {
    const { mode, toggleColorMode } = useColorMode();

    return (
        <div>
            <p>Current theme: {mode}</p>

            <button onClick={toggleColorMode}>
                Toggle theme
            </button>
        </div>
    );
}

describe("Theme Toggle", () => {
    it("starts in light mode when no preference is saved", () => {
        localStorage.removeItem("finora-color-mode");

        render(
            <ColorModeProvider>
                <ThemeToggle />
            </ColorModeProvider>
        );

        expect(
            screen.getByText("Current theme: light")
        ).toBeInTheDocument();
    });

    it("switches to dark mode when clicked", async () => {
        localStorage.removeItem("finora-color-mode");

        const user = userEvent.setup();

        render(
            <ColorModeProvider>
                <ThemeToggle />
            </ColorModeProvider>
        );

        await user.click(
            screen.getByRole("button", { name: "Toggle theme" })
        );

        expect(
            screen.getByText("Current theme: dark")
        ).toBeInTheDocument();
    });
});