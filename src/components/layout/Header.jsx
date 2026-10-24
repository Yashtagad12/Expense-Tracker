import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    InputAdornment,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

import { useLocation } from "react-router-dom";

function Header({ onMenuClick }) {
    const location = useLocation();

    const pageTitles = {
        "/": "Dashboard",
        "/transactions": "Transactions",
        "/reports": "Reports",
    };

    const currentTitle = pageTitles[location.pathname] || "Finora";

    return (
        <AppBar
            position="sticky"
            color="transparent"
            elevation={0}
            sx={{
                bgcolor: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            <Toolbar
                sx={{
                    minHeight: { xs: 68, sm: 76 },
                    px: { xs: 2, sm: 3, lg: 4 },
                    gap: { xs: 1, sm: 2 },
                }}
            >
                {/* Mobile menu button */}
                <IconButton
                    onClick={onMenuClick}
                    aria-label="Open navigation menu"
                    sx={{
                        display: { xs: "inline-flex", md: "none" },
                        color: "text.primary",
                    }}
                >
                    <MenuRoundedIcon />
                </IconButton>

                {/* Current page title */}
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: "1rem", sm: "1.15rem" },
                            fontWeight: 700,
                        }}
                    >
                        {currentTitle}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        Welcome back! Here's your financial overview.
                    </Typography>
                </Box>

                {/* Search field */}
                <TextField
                    size="small"
                    placeholder="Search..."
                    aria-label="Search"
                    sx={{
                        width: { xs: 112, sm: 190, md: 220 },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2.5,
                            bgcolor: "#F7F9F8",
                            fontSize: "0.875rem",
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRoundedIcon
                                        fontSize="small"
                                        color="action"
                                    />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                {/* Notifications */}
                <Tooltip title="Notifications">
                    <IconButton
                        aria-label="Notifications"
                        sx={{
                            color: "text.secondary",
                            display: { xs: "none", sm: "inline-flex" },
                        }}
                    >
                        <NotificationsNoneRoundedIcon />
                    </IconButton>
                </Tooltip>

                {/* User profile */}
                <Tooltip title="Your profile">
                    <Avatar
                        alt="Finora user"
                        sx={{
                            width: { xs: 34, sm: 38 },
                            height: { xs: 34, sm: 38 },
                            bgcolor: "primary.light",
                            color: "primary.dark",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                        }}
                    >
                        Y
                    </Avatar>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}

export default Header;