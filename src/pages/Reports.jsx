import {
    Box,
    Paper,
    Typography,
} from "@mui/material";

import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

function Reports() {
    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ mb: 0.75 }}>
                    Financial Reports
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Explore your spending patterns and financial trends.
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
                    <BarChartRoundedIcon fontSize="large" />
                </Box>

                <Typography variant="h6" sx={{ mb: 1 }}>
                    Your financial insights are on the way
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ maxWidth: 420, mx: "auto", lineHeight: 1.8 }}
                >
                    This page will eventually display monthly spending
                    trends, category breakdowns, and income-versus-expense
                    charts.
                </Typography>
            </Paper>
        </Box>
    );
}

export default Reports;