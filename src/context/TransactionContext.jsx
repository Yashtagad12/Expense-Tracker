import { createContext, useContext, useEffect, useState } from "react";
import initialTransactions from "../data/initialTransactions";

const STORAGE_KEY = "finora-transactions";

const TransactionContext = createContext();

function getInitialTransactions() {
    try {
        const savedTransactions = localStorage.getItem(STORAGE_KEY);
        if (savedTransactions !== null) {
            const parsedTransactions = JSON.parse(savedTransactions);

            if (Array.isArray(parsedTransactions)) {
                return parsedTransactions;
            }
        }

    } catch (error) {
        console.error("Unable to load Finora transactions:", error);
    }

    return initialTransactions;
}

export function TransactionProvider({ children }) {
    const [transactions, setTransactions] = useState(getInitialTransactions);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
        } catch (error) {
            console.error("Unable to save Finora transactions:", error);
        }
    }, [transactions]);

    const addTransaction = (transaction) => {
        setTransactions((previousTransactions) => [
            transaction,
            ...previousTransactions,
        ]);
    };

    const updateTransaction = (updatedTransaction) => {
        setTransactions((previousTransactions) =>
            previousTransactions.map((transaction) =>
                transaction.id === updatedTransaction.id
                    ? updatedTransaction
                    : transaction
            )
        );
    };

    const deleteTransaction = (transactionId) => {
        setTransactions((previousTransactions) =>
            previousTransactions.filter(
                (transaction) => transaction.id !== transactionId
            )
        );
    };

    const resetTransactions = () => {
        setTransactions(initialTransactions);
    };

    const value = {
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        resetTransactions,
    };

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
}

// A custom hook for accessing the transaction context.
// eslint-disable-next-line react-refresh/only-export-components
export function useTransactions() {
    const context = useContext(TransactionContext);

    if (!context) {
        throw new Error(
            "useTransactions must be used inside a TransactionProvider"
        );
    }

    return context;
}