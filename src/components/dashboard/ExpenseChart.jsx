import { useMemo } from "react";

import {
    Box,
    Paper,
    Typography,
    useTheme,
} from "@mui/material";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function formatRupees(value) {
    return `₹${Number(value).toLocaleString("en-IN")}`;
}

function getLastSixMonths() {
    const months = [];
    const currentDate = new Date();

    for (let offset = 5; offset >= 0; offset -= 1) {
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - offset,
            1
        );

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");

        months.push({
            key: `${year}-${month}`,
            label: date.toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
            }),
        });
    }

    return months;
}

function ExpenseChart({ transactions = [] }) {
    const theme = useTheme();
    const incomeColor = theme.palette.success.main;
    const expenseColor = theme.palette.mode === "light" ? "#A9C9B8" : "#FF8092";
    const axisColor = theme.palette.text.secondary;
    const gridColor = theme.palette.divider;
    const tooltipStyles = {
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.divider,
        color: theme.palette.text.primary,
    };

    const monthlyData = useMemo(() => {
        const months = getLastSixMonths();

        return months.map((month) => {
            const monthTransactions = transactions.filter(
                (transaction) =>
                    transaction.date.startsWith(month.key)
            );

            const income = monthTransactions
                .filter((transaction) => transaction.type === "income")
                .reduce((total, transaction) => total + transaction.amount, 0);

            const expenses = monthTransactions
                .filter((transaction) => transaction.type === "expense")
                .reduce((total, transaction) => total + transaction.amount, 0);

            return {
                month: month.label,
                income,
                expenses,
            };
        });
    }, [transactions]);

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, sm: 3 },
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
            }}
        >
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight={700}>
                    Income vs Expenses
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Your actual recorded transactions over the last six months.
                </Typography>
            </Box>

            <Box sx={{ width: "100%", height: { xs: 280, sm: 330 } }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={monthlyData}
                        margin={{
                            top: 8,
                            right: 8,
                            left: 8,
                            bottom: 8,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={gridColor}
                        />

                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fill: axisColor }}
                        />

                        <YAxis
                            tickFormatter={(value) =>
                                value >= 1000
                                    ? `₹${value / 1000}k`
                                    : `₹${value}`
                            }
                            tick={{ fontSize: 12, fill: axisColor }}
                            width={60}
                        />

                        <Tooltip
                            formatter={(value) => [
                                formatRupees(value),
                            ]}
                            contentStyle={tooltipStyles}
                        />

                        <Legend />

                        <Bar
                            dataKey="income"
                            name="Income"
                            fill={incomeColor}
                            radius={[4, 4, 0, 0]}
                        />

                        <Bar
                            dataKey="expenses"
                            name="Expenses"
                            fill={expenseColor}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}

export default ExpenseChart;