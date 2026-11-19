import { describe, it, expect } from "vitest";

import {
    calculateTotal,
    calculateNetSavings,
    calculateSavingsRate,
    calculateCategoryExpenses,
    getMonthlyTransactions,
} from "./finance";

const sampleTransactions = [
    {
        id: 1,
        title: "Salary",
        category: "Salary",
        date: "2026-10-01",
        amount: 45000,
        type: "income",
    },
    {
        id: 2,
        title: "Rent",
        category: "Housing",
        date: "2026-10-03",
        amount: 10000,
        type: "expense",
    },
    {
        id: 3,
        title: "Groceries",
        category: "Food",
        date: "2026-10-05",
        amount: 2500,
        type: "expense",
    },
    {
        id: 4,
        title: "Freelance",
        category: "Freelance",
        date: "2026-10-08",
        amount: 8000,
        type: "income",
    },
    {
        id: 5,
        title: "Internet",
        category: "Utilities",
        date: "2026-11-02",
        amount: 900,
        type: "expense",
    },
];

describe("Financial Utility Functions", () => {
    it("calculates total income correctly", () => {
        expect(
            calculateTotal(sampleTransactions, "income")
        ).toBe(53000);
    });

    it("calculates total expenses correctly", () => {
        expect(
            calculateTotal(sampleTransactions, "expense")
        ).toBe(13400);
    });

    it("calculates net savings correctly", () => {
        expect(calculateNetSavings(53000, 13400)).toBe(39600);
    });

    it("calculates savings percentage correctly", () => {
        expect(calculateSavingsRate(53000, 13400)).toBeCloseTo(
            74.7169,
            3
        );
    });

    it("returns zero savings rate when income is zero", () => {
        expect(calculateSavingsRate(0, 1000)).toBe(0);
    });

    it("groups expenses by category", () => {
        expect(
            calculateCategoryExpenses(sampleTransactions)
        ).toEqual([
            { category: "Housing", amount: 10000 },
            { category: "Food", amount: 2500 },
            { category: "Utilities", amount: 900 },
        ]);
    });

    it("returns transactions for the selected month", () => {
        const result = getMonthlyTransactions(
            sampleTransactions,
            "2026-10"
        );

        expect(result).toHaveLength(4);

        expect(
            result.every((transaction) =>
                transaction.date.startsWith("2026-10-")
            )
        ).toBe(true);
    });

    it("returns an empty array when no transactions match", () => {
        expect(
            getMonthlyTransactions(sampleTransactions, "2026-12")
        ).toEqual([]);
    });
});