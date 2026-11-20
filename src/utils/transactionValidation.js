export function validateTransaction(transaction) {
    const errors = {};

    if (!transaction.title?.trim()) {
        errors.title = "Transaction title is required.";
    }

    if (!transaction.category?.trim()) {
        errors.category = "Category is required.";
    }

    if (
        !transaction.date ||
        !/^\d{4}-\d{2}-\d{2}$/.test(transaction.date)
    ) {
        errors.date = "Please select a valid date.";
    }

    const amount = Number(transaction.amount);

    if (
        transaction.amount === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        errors.amount = "Amount must be greater than zero.";
    }

    if (!["income", "expense"].includes(transaction.type)) {
        errors.type = "Please select a valid transaction type.";
    }

    return errors;
}