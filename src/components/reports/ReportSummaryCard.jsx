import { Box, Paper, Stack, Typography } from "@mui/material";

function ReportSummaryCard({ title, amount, description, icon, color }) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
            >
                <Box>
                    <Typography color="text.secondary" variant="body2">
                        {title}
                    </Typography>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{ mt: 1, overflowWrap: "anywhere" }}
                    >
                        {amount}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 1 }}
                    >
                        {description}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 44,
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: `${color}18`,
                        color,
                    }}
                >
                    {icon}
                </Box>
            </Stack>
        </Paper>
    );
}

export default ReportSummaryCard;