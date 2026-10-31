import {
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const CHART_COLORS = [
    "#6478E8",
    "#19A974",
    "#F5A623",
    "#E45B78",
    "#35A7C8",
    "#9966CC",
    "#E88745",
    "#607D8B",
    "#A3B83D",
];

function formatRupees(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
}

function ExpenseCategoryChart({ data }) {
    const hasExpenses = data.some((item) => item.amount > 0);

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                height: "100%",
            }}
        >
            <Typography variant="h6" fontWeight={700}>
                Expense Breakdown
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                See how your spending is distributed by category.
            </Typography>

            {!hasExpenses ? (
                <Box
                    sx={{
                        minHeight: 280,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <Typography color="text.secondary">
                        No expenses recorded for this month.
                    </Typography>
                </Box>
            ) : (
                <>
                    <Box sx={{ width: "100%", height: 280, mt: 2 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.filter((item) => item.amount > 0)}
                                    dataKey="amount"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={65}
                                    outerRadius={100}
                                    paddingAngle={3}
                                >
                                    {data
                                        .filter((item) => item.amount > 0)
                                        .map((item) => (
                                            <Cell
                                                key={item.category}
                                                fill={
                                                    CHART_COLORS[
                                                    data.findIndex(
                                                        (entry) => entry.category === item.category
                                                    ) % CHART_COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                </Pie>

                                <Tooltip
                                    formatter={(value) => formatRupees(Number(value))}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>

                    <Stack spacing={1.5} sx={{ mt: 2 }}>
                        {data
                            .filter((item) => item.amount > 0)
                            .map((item) => {
                                const originalIndex = data.findIndex(
                                    (entry) => entry.category === item.category
                                );

                                return (
                                    <Stack
                                        key={item.category}
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        spacing={2}
                                    >
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{ minWidth: 0 }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    flexShrink: 0,
                                                    borderRadius: "50%",
                                                    bgcolor:
                                                        CHART_COLORS[
                                                        originalIndex % CHART_COLORS.length
                                                        ],
                                                }}
                                            />

                                            <Typography variant="body2" noWrap>
                                                {item.category}
                                            </Typography>
                                        </Stack>

                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                            sx={{ flexShrink: 0 }}
                                        >
                                            {formatRupees(item.amount)}
                                        </Typography>
                                    </Stack>
                                );
                            })}
                    </Stack>
                </>
            )}
        </Paper>
    );
}

export default ExpenseCategoryChart;