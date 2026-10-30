import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "finora-budgets";

const initialBudgets = [];

const BudgetContext = createContext();

function getInitialBudgets() {
    try {
        const savedBudgets = localStorage.getItem(STORAGE_KEY);

        if (savedBudgets !== null) {
            const parsedBudgets = JSON.parse(savedBudgets);

            if (
                Array.isArray(parsedBudgets) &&
                parsedBudgets.every(
                    (budget) =>
                        typeof budget.category === "string" &&
                        Number.isFinite(budget.limit) &&
                        budget.limit > 0
                )
            ) {
                return parsedBudgets;
            }
        }
    } catch (error) {
        console.error("Unable to load Finora budgets:", error);
    }

    return initialBudgets;
}

export function BudgetProvider({ children }) {
    const [budgets, setBudgets] = useState(getInitialBudgets);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
        } catch (error) {
            console.error("Unable to save Finora budgets:", error);
        }
    }, [budgets]);

    const addBudget = (budget) => {
        setBudgets((previousBudgets) => [
            ...previousBudgets,
            {
                ...budget,
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            },
        ]);
    };

    const updateBudget = (updatedBudget) => {
        setBudgets((previousBudgets) =>
            previousBudgets.map((budget) =>
                budget.id === updatedBudget.id ? updatedBudget : budget
            )
        );
    };

    const deleteBudget = (budgetId) => {
        setBudgets((previousBudgets) =>
            previousBudgets.filter((budget) => budget.id !== budgetId)
        );
    };

    const value = {
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
    };

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBudgets() {
    const context = useContext(BudgetContext);

    if (!context) {
        throw new Error("useBudgets must be used inside a BudgetProvider");
    }

    return context;
}