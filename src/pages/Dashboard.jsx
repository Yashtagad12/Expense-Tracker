import {
    Box,
    Button,
    Paper,
    Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

function Dashboard() {
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
                        Keep track of your money, one step at a time.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={() => alert("Transaction form coming soon!")}
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

            {/* Welcome panel */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: 4,
                    background:
                        "linear-gradient(135deg, #E3F5EC 0%, #F5FBF7 100%)",
                    border: "1px solid #DDEFE4",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        maxWidth: 520,
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 2,
                            color: "primary.dark",
                        }}
                    >
                        <TrendingUpRoundedIcon fontSize="small" />

                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700 }}
                        >
                            A smarter way to manage money
                        </Typography>
                    </Box>

                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: { xs: "1.65rem", sm: "2.25rem" },
                            lineHeight: 1.25,
                            mb: 2,
                        }}
                    >
                        Make every rupee count.
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            lineHeight: 1.8,
                            maxWidth: 460,
                        }}
                    >
                        Understand your spending, organize your
                        transactions, and build healthier financial
                        habits with your personal finance dashboard.
                    </Typography>
                </Box>
            </Paper>

            {/* Placeholder for upcoming dashboard components */}
            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h6"
                    sx={{ mb: 1 }}
                >
                    Your financial overview
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Your balance, income, expenses, and financial
                    charts will appear here in Part 3.
                </Typography>
            </Box>
        </Box>
    );
}

export default Dashboard;