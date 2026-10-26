import {
    Avatar,
    Box,
    Chip,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

import initialTransactions from "../../data/initialTransactions";

const categoryIcons = {
    Salary: <PaymentsRoundedIcon />,
    Freelance: <WorkRoundedIcon />,
    Housing: <HomeRoundedIcon />,
    Food: <RestaurantRoundedIcon />,
    Utilities: <WifiRoundedIcon />,
    Shopping: <ShoppingBagRoundedIcon />,
    Transport: <DirectionsCarRoundedIcon />,
};

function formatRupees(value) {
    return `₹${Number(value).toLocaleString("en-IN")}`;
}

function formatDate(dateString) {
    return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
    });
}

function RecentTransactions({ transactions = initialTransactions }) {
    const recentTransactions = [...transactions]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5);

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
            }}
        >
            {/* Section heading */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    mb: 2.5,
                }}
            >
                <Box>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>
                        Recent Transactions
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Your latest financial activity
                    </Typography>
                </Box>

                <Chip
                    label={`${recentTransactions.length} records`}
                    size="small"
                    sx={{
                        bgcolor: "primary.light",
                        color: "primary.dark",
                        fontWeight: 600,
                    }}
                />
            </Box>

            {/* Transaction list */}
            <Stack spacing={0}>
                {recentTransactions.length === 0 ? (
                    <Box sx={{ py: 5, textAlign: "center" }}>
                        <ReceiptLongRoundedIcon
                            sx={{ fontSize: 36, color: "text.secondary", mb: 1 }}
                        />

                        <Typography variant="body2" color="text.secondary">
                            No transactions to display yet.
                        </Typography>
                    </Box>
                ) : (
                    recentTransactions.map((transaction) => {
                        const isIncome = transaction.type === "income";

                        return (
                            <Box
                                key={transaction.id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: { xs: 1.25, sm: 2 },
                                    py: 1.75,
                                    borderBottom: "1px solid",
                                    borderColor: "divider",

                                    "&:last-child": {
                                        borderBottom: "none",
                                    },
                                }}
                            >
                                {/* Category icon */}
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        flexShrink: 0,
                                        bgcolor: isIncome ? "#E3F5EC" : "#F2F4F3",
                                        color: isIncome ? "#16845B" : "#64748B",
                                    }}
                                >
                                    {categoryIcons[transaction.category] || (
                                        <ReceiptLongRoundedIcon />
                                    )}
                                </Avatar>

                                {/* Transaction title and category */}
                                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            overflowWrap: "anywhere",
                                        }}
                                    >
                                        {transaction.title}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {transaction.category} · {formatDate(transaction.date)}
                                    </Typography>
                                </Box>

                                {/* Amount */}
                                <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 700,
                                            color: isIncome ? "success.main" : "text.primary",
                                            fontSize: { xs: "0.78rem", sm: "0.875rem" },
                                        }}
                                    >
                                        {isIncome ? "+" : "−"}
                                        {formatRupees(transaction.amount)}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {isIncome ? "Income" : "Expense"}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })
                )}
            </Stack>
        </Paper>
    );
}

export default RecentTransactions;