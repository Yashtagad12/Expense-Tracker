import {
    Box,
    Paper,
    Typography,
} from "@mui/material";

import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

function Transactions() {
    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ mb: 0.75 }}>
                    Transactions
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Review and manage your income and expenses.
                </Typography>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, sm: 5 },
                    borderRadius: 3,
                    textAlign: "center",
                }}
            >
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        mx: "auto",
                        mb: 2,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 3,
                        bgcolor: "primary.light",
                        color: "primary.dark",
                    }}
                >
                    <ReceiptLongRoundedIcon fontSize="large" />
                </Box>

                <Typography variant="h6" sx={{ mb: 1 }}>
                    Your transactions will appear here
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ maxWidth: 420, mx: "auto", lineHeight: 1.8 }}
                >
                    Soon, you'll be able to add transactions, search
                    your records, filter by category, and manage
                    your financial activity from this page.
                </Typography>
            </Paper>
        </Box>
    );
}

export default Transactions;