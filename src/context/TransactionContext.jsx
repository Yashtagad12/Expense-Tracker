import { createContext, useContext, useState } from "react";
import initialTransactions from "../data/initialTransactions";

// Create a context to share transactions across the application.
const TransactionContext = createContext();

// Create a provider that stores and manages transactions.
export function TransactionProvider({ children }) {
    const [transactions, setTransactions] = useState(initialTransactions);

    // Add a new transaction to the list.
    const addTransaction = (transaction) => {
        setTransactions((previousTransactions) => [
            transaction,
            ...previousTransactions,
        ]);
    };

    // Update an existing transaction.
    const updateTransaction = (updatedTransaction) => {
        setTransactions((previousTransactions) =>
            previousTransactions.map((transaction) =>
                transaction.id === updatedTransaction.id
                    ? updatedTransaction
                    : transaction
            )
        );
    };

    // Delete a transaction using its ID.
    const deleteTransaction = (transactionId) => {
        setTransactions((previousTransactions) =>
            previousTransactions.filter(
                (transaction) => transaction.id !== transactionId
            )
        );
    };

    // Make the data and functions available to child components.
    const value = {
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    };

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
}

// A custom hook for accessing the transaction context.
export function useTransactions() {
    const context = useContext(TransactionContext);

    if (!context) {
        throw new Error(
            "useTransactions must be used inside a TransactionProvider"
        );
    }

    return context;
}