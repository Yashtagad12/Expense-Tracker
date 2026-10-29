import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    LinearProgress,
    Stack,
    Typography,
} from "@mui/material";

import {
    DeleteOutline,
    EditOutlined,
    WarningAmberOutlined,
} from "@mui/icons-material";

function formatRupees(amount) {
    return `₹${Number(amount).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
    })}`;
}

function BudgetCard({
    budget,
    spent,
    onEdit,
    onDelete,
}) {

    const remaining = budget.limit - spent;

    const percentage =
        budget.limit > 0 ? (spent / budget.limit) * 100 : 0;

    const progress = Math.min(Math.max(percentage, 0), 100);

    const isOverBudget = spent > budget.limit;

    const isNearLimit = percentage >= 80 && !isOverBudget;

    const progressColor = isOverBudget
        ? "error"
        : isNearLimit
            ? "warning"
            : "success";

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 3,
                },
            }}
        >
            <CardContent sx={{ p: 2.5 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Box>
                        <Typography variant="h6" fontWeight={700}>
                            {budget.category}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Monthly spending limit
                        </Typography>
                    </Box>

                    {isOverBudget ? (
                        <Chip
                            label="Over budget"
                            color="error"
                            size="small"
                        />
                    ) : isNearLimit ? (
                        <Chip
                            label="Near limit"
                            color="warning"
                            size="small"
                        />
                    ) : (
                        <Chip
                            label="On track"
                            color="success"
                            size="small"
                        />
                    )}
                </Stack>

                <Box sx={{ mt: 3, mb: 1 }}>
                    <Typography variant="h5" fontWeight={700}>
                        {formatRupees(spent)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        of {formatRupees(budget.limit)} spent
                    </Typography>
                </Box>

                <LinearProgress
                    variant="determinate"
                    value={progress}
                    color={progressColor}
                    sx={{
                        height: 8,
                        borderRadius: 5,
                        my: 2,
                    }}
                />

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="body2" color="text.secondary">
                        {percentage.toFixed(1)}% used
                    </Typography>

                    <Typography
                        variant="body2"
                        fontWeight={700}
                        color={isOverBudget ? "error.main" : "text.primary"}
                    >
                        {isOverBudget
                            ? `${formatRupees(Math.abs(remaining))} over`
                            : `${formatRupees(remaining)} left`}
                    </Typography>
                </Stack>

                {isOverBudget && (
                    <Stack
                        direction="row"
                        spacing={0.75}
                        alignItems="center"
                        sx={{ mt: 2 }}
                    >
                        <WarningAmberOutlined
                            fontSize="small"
                            color="error"
                        />

                        <Typography variant="body2" color="error.main">
                            You have exceeded this category's budget.
                        </Typography>
                    </Stack>
                )}

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 2.5 }}
                >
                    <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        startIcon={<EditOutlined />}
                        onClick={() => onEdit(budget)}
                    >
                        Edit
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<DeleteOutline />}
                        onClick={() => onDelete(budget)}
                    >
                        Delete
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default BudgetCard;