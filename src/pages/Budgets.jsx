import { useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Grid,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

import {
    Add,
    AccountBalanceWalletOutlined,
    TrendingDown,
    SavingsOutlined,
} from "@mui/icons-material";

import { useTransactions } from "../context/TransactionContext";
import { useBudgets } from "../context/BudgetContext";

import BudgetCard from "../components/budgets/BudgetCard";
import BudgetDialog from "../components/budgets/BudgetDialog";

const expenseCategories = [
    "Housing",
    "Food",
    "Utilities",
    "Transport",
    "Shopping",
    "Healthcare",
    "Education",
    "Entertainment",
    "Other",
];

function formatRupees(amount) {
    return `₹${Number(amount).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
    })}`;
}

function getCurrentMonth() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
}

function Budgets() {
    const { transactions } = useTransactions();

    const {
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
    } = useBudgets();

    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingBudget, setEditingBudget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const monthOptions = useMemo(() => {
        const months = new Set([getCurrentMonth()]);

        transactions.forEach((transaction) => {
            if (/^\d{4}-\d{2}-\d{2}$/.test(transaction.date)) {
                months.add(transaction.date.slice(0, 7));
            }
        });

        return [...months].sort((a, b) => b.localeCompare(a));
    }, [transactions]);

    // Keep only expenses recorded in the selected month.
    const monthlyExpenses = transactions.filter(
        (transaction) =>
            transaction.type === "expense" &&
            transaction.date.startsWith(selectedMonth)
    );

    // Calculate spending for one category.
    const getCategorySpent = (category) =>
        monthlyExpenses
            .filter((transaction) => transaction.category === category)
            .reduce((total, transaction) => total + transaction.amount, 0);

    // Calculate the total spending limit for configured budgets.
    const totalBudget = budgets.reduce(
        (total, budget) => total + budget.limit,
        0
    );

    // Calculate expenses belonging to configured budget categories.
    const totalBudgetedSpending = budgets.reduce(
        (total, budget) => total + getCategorySpent(budget.category),
        0
    );

    const totalRemaining = totalBudget - totalBudgetedSpending;

    const overBudgetCount = budgets.filter(
        (budget) => getCategorySpent(budget.category) > budget.limit
    ).length;

    // Use the complete expense-category list in the Create Budget dialog.
    const availableCategories = [...expenseCategories];

    const handleOpenAdd = () => {
        setEditingBudget(null);
        setDialogOpen(true);
    };

    const handleOpenEdit = (budget) => {
        setEditingBudget(budget);
        setDialogOpen(true);
    };

    const handleSaveBudget = (budgetData) => {
        if (editingBudget) {
            updateBudget({
                ...editingBudget,
                limit: budgetData.limit,
            });
        } else {
            addBudget(budgetData);
        }

        setDialogOpen(false);
        setEditingBudget(null);
    };

    const handleConfirmDelete = () => {
        if (deleteTarget) {
            deleteBudget(deleteTarget.id);
            setDeleteTarget(null);
        }
    };

    return (
        <Box>
            {/* Page heading and month selector */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                spacing={2}
                sx={{ mb: 3 }}
            >
                <Box>
                    <Typography variant="h4" fontWeight={700}>
                        Budget Management
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Plan your spending and monitor your monthly limits.
                    </Typography>
                </Box>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                >
                    <Select
                        size="small"
                        value={selectedMonth}
                        onChange={(event) => setSelectedMonth(event.target.value)}
                        sx={{ minWidth: 160 }}
                        aria-label="Select budget month"
                    >
                        {monthOptions.map((month) => (
                            <MenuItem key={month} value={month}>
                                {new Date(`${month}-15T12:00:00`).toLocaleDateString(
                                    "en-IN",
                                    {
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </MenuItem>
                        ))}
                    </Select>

                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleOpenAdd}
                    >
                        Create Budget
                    </Button>
                </Stack>
            </Stack>

            {/* Summary cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2.5,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                        }}
                    >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <AccountBalanceWalletOutlined color="primary" />

                            <Typography color="text.secondary">
                                Total Monthly Budget
                            </Typography>
                        </Stack>

                        <Typography variant="h5" fontWeight={700} sx={{ mt: 2 }}>
                            {formatRupees(totalBudget)}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2.5,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                        }}
                    >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <TrendingDown color="error" />

                            <Typography color="text.secondary">
                                Spending in Budgeted Categories
                            </Typography>
                        </Stack>

                        <Typography variant="h5" fontWeight={700} sx={{ mt: 2 }}>
                            {formatRupees(totalBudgetedSpending)}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2.5,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                        }}
                    >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <SavingsOutlined
                                color={totalRemaining < 0 ? "error" : "success"}
                            />

                            <Typography color="text.secondary">
                                Remaining Budget
                            </Typography>
                        </Stack>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                            color={totalRemaining < 0 ? "error.main" : "text.primary"}
                            sx={{ mt: 2 }}
                        >
                            {formatRupees(totalRemaining)}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Budget warning */}
            {overBudgetCount > 0 && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                    You have exceeded the limit in {overBudgetCount}{" "}
                    {overBudgetCount === 1 ? "category" : "categories"}.
                    Review your spending below.
                </Alert>
            )}

            {/* Budget cards */}
            {budgets.length === 0 ? (
                <Paper
                    elevation={0}
                    sx={{
                        p: 5,
                        textAlign: "center",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                    }}
                >
                    <Typography variant="h6" fontWeight={700}>
                        No budgets configured
                    </Typography>

                    <Typography color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                        Create a budget to start tracking your spending.
                    </Typography>

                    <Button variant="contained" onClick={handleOpenAdd}>
                        Create Your First Budget
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={2}>
                    {budgets.map((budget) => (
                        <Grid
                            key={budget.id}
                            size={{ xs: 12, sm: 6, lg: 4 }}
                        >
                            <BudgetCard
                                budget={budget}
                                spent={getCategorySpent(budget.category)}
                                onEdit={handleOpenEdit}
                                onDelete={setDeleteTarget}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Add/Edit dialog */}
            <BudgetDialog
                open={dialogOpen}
                onClose={() => {
                    setDialogOpen(false);
                    setEditingBudget(null);
                }}
                onSave={handleSaveBudget}
                editingBudget={editingBudget}
                availableCategories={
                    editingBudget
                        ? [editingBudget.category]
                        : availableCategories
                }
            />

            {/* Delete confirmation */}
            <Dialog
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle fontWeight={700}>
                    Delete Budget?
                </DialogTitle>

                <DialogContent>
                    <Typography color="text.secondary">
                        Delete the budget for {deleteTarget?.category}? Your
                        transactions will not be deleted.
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button
                        color="inherit"
                        onClick={() => setDeleteTarget(null)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleConfirmDelete}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Budgets;