import { useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import {
    AccountBalanceWalletOutlined,
    DownloadOutlined,
    SavingsOutlined,
    TrendingDown,
    TrendingUp,
} from "@mui/icons-material";

import { useTransactions } from "../context/TransactionContext";

import ReportSummaryCard from "../components/reports/ReportSummaryCard";
import ExpenseCategoryChart from "../components/reports/ExpenseCategoryChart";
import IncomeExpenseChart from "../components/reports/IncomeExpenseChart";

function getCurrentMonth() {
    const now = new Date();

    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
        2,
        "0"
    )}`;
}

function formatRupees(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
}

function formatMonth(monthKey) {
    const [year, month] = monthKey.split("-").map(Number);

    return new Date(year, month - 1, 1).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
    });
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function getLastSixMonths() {
    const now = new Date();

    return Array.from({ length: 6 }, (_, index) => {
        const date = new Date(
            now.getFullYear(),
            now.getMonth() - 5 + index,
            1
        );

        const key = `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, "0")}`;

        return {
            key,
            month: date.toLocaleDateString("en-IN", {
                month: "short",
            }),
            income: 0,
            expenses: 0,
        };
    });
}

// Escape CSV values so commas and quotation marks don't break the file.
function escapeCSV(value) {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
}

function downloadCSV(rows, filename) {
    const csvContent = rows
        .map((row) => row.map(escapeCSV).join(","))
        .join("\r\n");

    const blob = new Blob(["\uFEFF", csvContent], {
        type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}

function Reports() {
    const { transactions } = useTransactions();

    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth);

    // Create a list of months found in transaction history,
    // always including the current month.
    const monthOptions = useMemo(() => {
        const months = new Set([getCurrentMonth()]);

        transactions.forEach((transaction) => {
            if (/^\d{4}-\d{2}-\d{2}$/.test(transaction.date)) {
                months.add(transaction.date.slice(0, 7));
            }
        });

        return [...months].sort((a, b) => b.localeCompare(a));
    }, [transactions]);

    // Transactions for the selected month.
    const monthlyTransactions = useMemo(() => {
        return transactions.filter(
            (transaction) =>
                typeof transaction.date === "string" &&
                transaction.date.startsWith(`${selectedMonth}-`)
        );
    }, [transactions, selectedMonth]);

    const monthlyIncome = useMemo(() => {
        return monthlyTransactions
            .filter((transaction) => transaction.type === "income")
            .reduce((total, transaction) => total + Number(transaction.amount), 0);
    }, [monthlyTransactions]);

    const monthlyExpenses = useMemo(() => {
        return monthlyTransactions
            .filter((transaction) => transaction.type === "expense")
            .reduce((total, transaction) => total + Number(transaction.amount), 0);
    }, [monthlyTransactions]);

    const netSavings = monthlyIncome - monthlyExpenses;

    const savingsRate =
        monthlyIncome > 0
            ? `${((netSavings / monthlyIncome) * 100).toFixed(1)}%`
            : "—";

    // Group the selected month's expenses by category.
    const categoryData = useMemo(() => {
        const totals = {};

        monthlyTransactions
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
                percentage:
                    monthlyExpenses > 0
                        ? (amount / monthlyExpenses) * 100
                        : 0,
            }))
            .sort((a, b) => b.amount - a.amount);
    }, [monthlyTransactions, monthlyExpenses]);

    // Calculate income and expenses for the last six months.
    const sixMonthData = useMemo(() => {
        const months = getLastSixMonths();

        const totalsByMonth = Object.fromEntries(
            months.map((month) => [
                month.key,
                {
                    ...month,
                    income: 0,
                    expenses: 0,
                },
            ])
        );

        transactions.forEach((transaction) => {
            if (
                typeof transaction.date !== "string" ||
                !/^\d{4}-\d{2}-\d{2}$/.test(transaction.date)
            ) {
                return;
            }

            const monthKey = transaction.date.slice(0, 7);
            const monthData = totalsByMonth[monthKey];

            if (!monthData) {
                return;
            }

            if (transaction.type === "income") {
                monthData.income += Number(transaction.amount);
            } else if (transaction.type === "expense") {
                monthData.expenses += Number(transaction.amount);
            }
        });

        return Object.values(totalsByMonth);
    }, [transactions]);

    function handleExportCSV() {
        const rows = [
            ["Finora - Monthly Financial Report"],
            ["Report Month", formatMonth(selectedMonth)],
            [],
            ["Financial Summary"],
            ["Metric", "Amount"],
            ["Total Income", monthlyIncome],
            ["Total Expenses", monthlyExpenses],
            ["Net Savings", netSavings],
            ["Savings Rate", savingsRate],
            [],
            ["Expense Breakdown"],
            ["Category", "Amount", "Percentage of Expenses"],
            ...categoryData.map((item) => [
                item.category,
                item.amount,
                `${item.percentage.toFixed(1)}%`,
            ]),
            [],
            ["Transactions"],
            ["Date", "Title", "Category", "Type", "Amount"],
            ...monthlyTransactions.map((transaction) => [
                transaction.date,
                transaction.title,
                transaction.category,
                transaction.type,
                transaction.amount,
            ]),
        ];

        downloadCSV(rows, `finora-report-${selectedMonth}.csv`);
    }

    const hasTransactions = monthlyTransactions.length > 0;

    return (
        <Box sx={{ pb: 4 }}>
            {/* Page heading and month filter */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                spacing={2}
                sx={{ mb: 3 }}
            >
                <Box>
                    <Typography variant="h4" fontWeight={800}>
                        Reports & Analytics
                    </Typography>

                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                        Understand your financial habits and track your progress.
                    </Typography>
                </Box>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                >
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel id="report-month-label">Report Month</InputLabel>

                        <Select
                            labelId="report-month-label"
                            id="report-month"
                            value={selectedMonth}
                            label="Report Month"
                            onChange={(event) => setSelectedMonth(event.target.value)}
                        >
                            {monthOptions.map((month) => (
                                <MenuItem key={month} value={month}>
                                    {formatMonth(month)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        startIcon={<DownloadOutlined />}
                        onClick={handleExportCSV}
                        sx={{ whiteSpace: "nowrap" }}
                    >
                        Export CSV
                    </Button>
                </Stack>
            </Stack>

            {!hasTransactions && (
                <Alert severity="info" sx={{ mb: 3 }}>
                    No transactions were found for {formatMonth(selectedMonth)}.
                    Choose another month or add a transaction to see its report.
                </Alert>
            )}

            {/* Financial summary cards */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, minmax(0, 1fr))",
                        xl: "repeat(3, minmax(0, 1fr))",
                    },
                    gap: 2,
                    mb: 3,
                }}
            >
                <ReportSummaryCard
                    title="Total Income"
                    amount={formatRupees(monthlyIncome)}
                    description={`Income in ${formatMonth(selectedMonth)}`}
                    icon={<TrendingUp />}
                    color="#16845B"
                />

                <ReportSummaryCard
                    title="Total Expenses"
                    amount={formatRupees(monthlyExpenses)}
                    description={`Expenses in ${formatMonth(selectedMonth)}`}
                    icon={<TrendingDown />}
                    color="#E45B78"
                />

                <ReportSummaryCard
                    title="Net Savings"
                    amount={formatRupees(netSavings)}
                    description={`Savings rate: ${savingsRate}`}
                    icon={
                        netSavings >= 0 ? (
                            <SavingsOutlined />
                        ) : (
                            <AccountBalanceWalletOutlined />
                        )
                    }
                    color={netSavings >= 0 ? "#6478E8" : "#D97706"}
                />
            </Box>

            {/* Category breakdown and six-month comparison */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
                    },
                    gap: 3,
                    mb: 3,
                    alignItems: "stretch",
                }}
            >
                <ExpenseCategoryChart data={categoryData} />

                <IncomeExpenseChart data={sixMonthData} />
            </Box>

            {/* Category-wise report table */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                }}
            >
                <Typography variant="h6" fontWeight={700}>
                    Category-wise Spending
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    A detailed breakdown of your spending for {formatMonth(selectedMonth)}.
                </Typography>

                {categoryData.length === 0 ? (
                    <Box sx={{ py: 5, textAlign: "center" }}>
                        <Typography color="text.secondary">
                            No expense categories to display for this month.
                        </Typography>
                    </Box>
                ) : (
                    <TableContainer sx={{ mt: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Category</strong>
                                    </TableCell>

                                    <TableCell align="right">
                                        <strong>Amount</strong>
                                    </TableCell>

                                    <TableCell align="right">
                                        <strong>Share of Expenses</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {categoryData.map((item) => (
                                    <TableRow key={item.category} hover>
                                        <TableCell>{item.category}</TableCell>

                                        <TableCell align="right">
                                            {formatRupees(item.amount)}
                                        </TableCell>

                                        <TableCell align="right">
                                            {item.percentage.toFixed(1)}%
                                        </TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell>
                                        <strong>Total Expenses</strong>
                                    </TableCell>

                                    <TableCell align="right">
                                        <strong>{formatRupees(monthlyExpenses)}</strong>
                                    </TableCell>

                                    <TableCell align="right">
                                        <strong>
                                            {monthlyExpenses > 0 ? "100.0%" : "0.0%"}
                                        </strong>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>

            {/* Recent transactions for the selected month */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                }}
            >
                <Typography variant="h6" fontWeight={700}>
                    Monthly Transactions
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    All transactions included in this month's report.
                </Typography>

                {!hasTransactions ? (
                    <Box sx={{ py: 5, textAlign: "center" }}>
                        <Typography color="text.secondary">
                            No transactions available.
                        </Typography>
                    </Box>
                ) : (
                    <TableContainer sx={{ mt: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Date</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Transaction</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Category</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Type</strong>
                                    </TableCell>

                                    <TableCell align="right">
                                        <strong>Amount</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {[...monthlyTransactions]
                                    .sort((a, b) => b.date.localeCompare(a.date))
                                    .map((transaction) => (
                                        <TableRow key={transaction.id} hover>
                                            <TableCell>{formatDate(transaction.date)}</TableCell>

                                            <TableCell>{transaction.title}</TableCell>

                                            <TableCell>{transaction.category}</TableCell>

                                            <TableCell>
                                                <Typography
                                                    component="span"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color:
                                                            transaction.type === "income"
                                                                ? "success.main"
                                                                : "error.main",
                                                    }}
                                                >
                                                    {transaction.type === "income" ? "Income" : "Expense"}
                                                </Typography>
                                            </TableCell>

                                            <TableCell align="right">
                                                <Typography
                                                    component="span"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color:
                                                            transaction.type === "income"
                                                                ? "success.main"
                                                                : "error.main",
                                                    }}
                                                >
                                                    {transaction.type === "income" ? "+" : "−"}
                                                    {formatRupees(Number(transaction.amount))}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Box>
    );
}

export default Reports;