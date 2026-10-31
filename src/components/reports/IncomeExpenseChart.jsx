import {
    Box,
    Paper,
    Typography,
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

function formatRupees(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
}

function IncomeExpenseChart({ data }) {
    return (
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
                Income vs. Expenses
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Compare your income and spending over the last six months.
            </Typography>

            <Box sx={{ width: "100%", height: 340, mt: 3 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />

                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tickFormatter={(value) =>
                                new Intl.NumberFormat("en-IN", {
                                    notation: "compact",
                                    maximumFractionDigits: 1,
                                }).format(value)
                            }
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            width={55}
                        />

                        <Tooltip
                            formatter={(value) => formatRupees(Number(value))}
                        />

                        <Legend />

                        <Bar
                            dataKey="income"
                            name="Income"
                            fill="#16845B"
                            radius={[5, 5, 0, 0]}
                        />

                        <Bar
                            dataKey="expenses"
                            name="Expenses"
                            fill="#E45B78"
                            radius={[5, 5, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
}

export default IncomeExpenseChart;