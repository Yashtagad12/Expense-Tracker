export function calculateTotal(transactions, type) {
    return transactions
        .filter((transaction) => transaction.type === type)
        .reduce(
            (total, transaction) => total + Number(transaction.amount),
            0
        );
}

export function calculateNetSavings(income, expenses) {
    return income - expenses;
}

export function calculateSavingsRate(income, expenses) {
    if (income <= 0) {
        return 0;
    }

    return ((income - expenses) / income) * 100;
}

export function calculateCategoryExpenses(transactions) {
    const totals = {};

    transactions
        .filter((transaction) => transaction.type === "expense")
        .forEach((transaction) => {
            const category = transaction.category || "Other";

            totals[category] =
                (totals[category] || 0) + Number(transaction.amount);
        });

    return Object.entries(totals)
        .map(([category, amount]) => ({
            category,
            amount,
        }))
        .sort((a, b) => b.amount - a.amount);
}

export function getMonthlyTransactions(transactions, month) {
    return transactions.filter(
        (transaction) =>
            typeof transaction.date === "string" &&
            transaction.date.startsWith(`${month}-`)
    );
}