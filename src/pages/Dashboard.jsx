import {
    Box,
    Button,
    Grid,
    Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";

import SummaryCard from "../components/dashboard/SummaryCard";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";

import initialTransactions from "../data/initialTransactions";

function formatRupees(value) {
    return `₹${Number(value).toLocaleString("en-IN")}`;
}

function Dashboard() {
    const totalIncome = initialTransactions
        .filter((transaction) => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpenses = initialTransactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalBalance = totalIncome - totalExpenses;

    const savingsRate =
        totalIncome > 0
            ? (totalBalance / totalIncome) * 100
            : 0;

    const summaryCards = [
        {
            title: "Total Balance",
            value: formatRupees(totalBalance),
            description: "Income minus expenses",
            icon: <AccountBalanceWalletRoundedIcon />,
            color: "primary",
        },
        {
            title: "Total Income",
            value: formatRupees(totalIncome),
            description: "Money received",
            icon: <TrendingUpRoundedIcon />,
            color: "success",
            trend: {
                direction: "up",
                value: "Income",
            },
        },
        {
            title: "Total Expenses",
            value: formatRupees(totalExpenses),
            description: "Money spent",
            icon: <TrendingDownRoundedIcon />,
            color: "error",
            trend: {
                direction: "down",
                value: "Expenses",
            },
        },
        {
            title: "Savings Rate",
            value: `${savingsRate.toFixed(1)}%`,
            description: "Of total income retained",
            icon: <SavingsRoundedIcon />,
            color: "primary",
        },
    ];

    return (
        <Box>
            {/* Page introduction */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", sm: "center" },
                    gap: 2,
                    mb: 4,
                }}
            >
                <Box>
                    <Typography
                        variant="h5"
                        sx={{ mb: 0.75 }}
                    >
                        Your finances, simplified.
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Here's an overview of your financial activity.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={() => alert("Transaction form coming in Part 4!")}
                    sx={{
                        alignSelf: { xs: "flex-start", sm: "auto" },
                        borderRadius: 2.5,
                        px: 2.5,
                        py: 1.2,
                    }}
                >
                    Add Transaction
                </Button>
            </Box>

            {/* Financial summary cards */}
            <Grid
                container
                spacing={2}
                sx={{ mb: 3 }}
            >
                {summaryCards.map((card) => (
                    <Grid
                        key={card.title}
                        size={{ xs: 12, sm: 6, lg: 3 }}
                    >
                        <SummaryCard {...card} />
                    </Grid>
                ))}
            </Grid>

            {/* Monthly financial chart */}
            <Box sx={{ mb: 3 }}>
                <ExpenseChart />
            </Box>

            {/* Recent transaction activity */}
            <RecentTransactions transactions={initialTransactions} />
        </Box>
    );
}

export default Dashboard;