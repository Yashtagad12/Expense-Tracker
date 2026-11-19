import { describe, it, expect } from "vitest";

import {
    render,
    screen,
} from "@testing-library/react";

import ReportSummaryCard from "./ReportSummaryCard";

describe("ReportSummaryCard Component", () => {
    it("renders the card title", () => {
        render(

            <ReportSummaryCard
                title="Total Income"
                amount="₹58,000"
                description="Income for October"
                icon={<span>Icon</span>}
                color="#16845B"
            />
        );

        expect(
            screen.getByText("Total Income")
        ).toBeInTheDocument();
    });

    it("renders the financial amount", () => {
        render(
            <ReportSummaryCard
                title="Total Income"
                amount="₹58,000"
                description="Income for October"
                icon={<span>Icon</span>}
                color="#16845B"
            />
        );

        expect(
            screen.getByText("₹58,000")
        ).toBeInTheDocument();
    });

    it("renders the description", () => {
        render(
            <ReportSummaryCard
                title="Total Income"
                amount="₹58,000"
                description="Income for October"
                icon={<span>Icon</span>}
                color="#16845B"
            />
        );

        expect(
            screen.getByText("Income for October")
        ).toBeInTheDocument();
    });

    it("renders the supplied icon", () => {
        render(
            <ReportSummaryCard
                title="Total Income"
                amount="₹58,000"
                description="Income for October"
                icon={<span>Income Icon</span>}
                color="#16845B"
            />
        );

        expect(
            screen.getByText("Income Icon")
        ).toBeInTheDocument();
    });
});