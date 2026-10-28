import { Link } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";

import {
    Add,
    AccountBalanceWallet,
    TrendingUp,
    TrendingDown,
    Savings,
} from "@mui/icons-material";

import { useTransactions } from "../context/TransactionContext";

import SummaryCard from "../components/dashboard/SummaryCard";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";

function formatRupees(amount) {
    return `₹${Number(amount).toLocaleString("en-IN")}`;
}

function Dashboard() {
    // Read the latest transactions from the shared context.
    const { transactions } = useTransactions();

    // Calculate total income.
    const totalIncome = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    // Calculate total expenses.
    const totalExpenses = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    // Calculate the balance from the tracked transactions.
    const totalBalance = totalIncome - totalExpenses;

    // Calculate the percentage of income remaining after expenses.
    const savingsRate =
        totalIncome > 0 ? (totalBalance / totalIncome) * 100 : 0;

    // Prepare data for the four dashboard summary cards.
    const summaryCards = [
        {
            title: "Total Balance",
            value: formatRupees(totalBalance),
            description: "Income minus expenses",
            icon: <AccountBalanceWallet />,
            color: "primary",
        },
        {
            title: "Total Income",
            value: formatRupees(totalIncome),
            description: "All recorded income",
            icon: <TrendingUp />,
            color: "success",
            trend: {
                direction: "up",
                label: "Money received",
            },
        },
        {
            title: "Total Expenses",
            value: formatRupees(totalExpenses),
            description: "All recorded expenses",
            icon: <TrendingDown />,
            color: "error",
            trend: {
                direction: "down",
                label: "Money spent",
            },
        },
        {
            title: "Savings Rate",
            value: `${savingsRate.toFixed(1)}%`,
            description: "Income remaining after expenses",
            icon: <Savings />,
            color: "success",
        },
    ];

    return (
        <Box>
            {/* Dashboard heading */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box>
                    <Typography variant="h4" fontWeight={700}>
                        Dashboard
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Here's an overview of your financial activity.
                    </Typography>
                </Box>

                <Button
                    component={Link}
                    to="/transactions"
                    variant="contained"
                    startIcon={<Add />}
                >
                    Add Transaction
                </Button>
            </Box>

            {/* Summary cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {summaryCards.map((card) => (
                    <Grid key={card.title} size={{ xs: 12, sm: 6, lg: 3 }}>
                        <SummaryCard {...card} />
                    </Grid>
                ))}
            </Grid>

            {/* Income versus expenses chart */}
            <Box sx={{ mb: 3 }}>
                <ExpenseChart />
            </Box>

            {/* Latest transactions */}
            <RecentTransactions transactions={transactions} />
        </Box>
    );
}

export default Dashboard;