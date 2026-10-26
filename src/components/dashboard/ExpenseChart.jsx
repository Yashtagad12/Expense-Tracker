import {
    Box,
    Paper,
    Typography,
} from "@mui/material";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const monthlyData = [
    { month: "May", income: 42000, expenses: 27000 },
    { month: "Jun", income: 48000, expenses: 31000 },
    { month: "Jul", income: 45000, expenses: 29000 },
    { month: "Aug", income: 52000, expenses: 34000 },
    { month: "Sep", income: 50000, expenses: 32000 },
    { month: "Oct", income: 58000, expenses: 19400 },
];

function formatRupees(value) {
    return `₹${Number(value).toLocaleString("en-IN")}`;
}

function ExpenseChart() {
    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, sm: 3 },
                height: "100%",
                borderRadius: 3,
                minWidth: 0,
            }}
        >
            {/* Chart heading */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                    Income vs Expenses
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Your financial activity over the last six months
                </Typography>
            </Box>

            {/* Responsive chart */}
            <Box sx={{ width: "100%", height: { xs: 260, sm: 310 } }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={monthlyData}
                        margin={{
                            top: 8,
                            right: 4,
                            left: -16,
                            bottom: 0,
                        }}
                        barGap={5}
                    >
                        <CartesianGrid
                            stroke="#E7ECE9"
                            strokeDasharray="4 4"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#718078", fontSize: 12 }}
                            tickMargin={10}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#718078", fontSize: 11 }}
                            tickFormatter={(value) => `₹${value / 1000}k`}
                            width={52}
                        />

                        <Tooltip
                            formatter={(value, name) => [
                                formatRupees(value),
                                name === "income" ? "Income" : "Expenses",
                            ]}
                            contentStyle={{
                                borderRadius: 12,
                                border: "1px solid #E7ECE9",
                                boxShadow: "0 4px 16px rgba(23, 43, 36, 0.08)",
                            }}
                        />

                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value) =>
                                value === "income" ? "Income" : "Expenses"
                            }
                        />

                        <Bar
                            dataKey="income"
                            name="income"
                            fill="#16845B"
                            radius={[5, 5, 0, 0]}
                            maxBarSize={28}
                        />

                        <Bar
                            dataKey="expenses"
                            name="expenses"
                            fill="#A9C9B8"
                            radius={[5, 5, 0, 0]}
                            maxBarSize={28}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}

export default ExpenseChart;