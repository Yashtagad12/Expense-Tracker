import {
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

function SummaryCard({
    title,
    value,
    description,
    icon,
    color = "primary",
    trend,
}) {
    const isPositive = trend?.direction === "up";

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                borderRadius: 3,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",

                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 24px rgba(23, 43, 36, 0.07)",
                },
            }}
        >
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                {/* Card heading and icon */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                        mb: 2.5,
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                    >
                        {title}
                    </Typography>

                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            flexShrink: 0,
                            display: "grid",
                            placeItems: "center",
                            borderRadius: 2.5,
                            bgcolor: `${color}.light`,
                            color: `${color}.main`,
                        }}
                    >
                        {icon}
                    </Box>
                </Box>

                {/* Main financial value */}
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: { xs: "1.3rem", sm: "1.5rem" },
                        fontWeight: 700,
                        mb: 1,
                        overflowWrap: "anywhere",
                    }}
                >
                    {value}
                </Typography>

                {/* Supporting information */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 0.75,
                    }}
                >
                    {trend && (
                        <Box
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 0.25,
                                color: isPositive ? "success.main" : "error.main",
                            }}
                        >
                            {isPositive ? (
                                <TrendingUpRoundedIcon sx={{ fontSize: 16 }} />
                            ) : (
                                <TrendingDownRoundedIcon sx={{ fontSize: 16 }} />
                            )}

                            <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                {trend.value}
                            </Typography>
                        </Box>
                    )}

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        {description}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default SummaryCard;