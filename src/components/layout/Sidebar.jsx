import {
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";

import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { NavLink } from "react-router-dom";

const DRAWER_WIDTH = 250;

const navigationItems = [
    {
        label: "Dashboard",
        path: "/",
        icon: <DashboardRoundedIcon />,
    },
    {
        label: "Transactions",
        path: "/transactions",
        icon: <ReceiptLongRoundedIcon />,
    },
    {
        label: "Reports",
        path: "/reports",
        icon: <BarChartRoundedIcon />,
    },
];

function Sidebar({ mobileOpen, onClose }) {
    const sidebarContent = (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                px: 2,
                py: 3,
                bgcolor: "background.paper",
            }}
        >
            {/* Brand */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 1,
                    mb: 4,
                }}
            >
                <Box
                    sx={{
                        width: 42,
                        height: 42,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 2.5,
                        bgcolor: "primary.main",
                        color: "#FFFFFF",
                    }}
                >
                    <AccountBalanceWalletRoundedIcon />
                </Box>

                <Box>
                    <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
                        Finora
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        Personal Finance
                    </Typography>
                </Box>
            </Box>

            {/* Navigation heading */}
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                    px: 1.5,
                    mb: 1.5,
                    fontWeight: 700,
                    letterSpacing: 1,
                }}
            >
                WORKSPACE
            </Typography>

            {/* Navigation links */}
            <List disablePadding>
                {navigationItems.map((item) => (
                    <ListItemButton
                        key={item.path}
                        component={NavLink}
                        to={item.path}
                        end={item.path === "/"}
                        onClick={onClose}
                        sx={{
                            minHeight: 48,
                            mb: 0.75,
                            px: 1.5,
                            borderRadius: 2.5,
                            color: "text.secondary",

                            "& .MuiListItemIcon-root": {
                                minWidth: 42,
                                color: "inherit",
                            },

                            "& .MuiListItemText-primary": {
                                fontSize: "0.9rem",
                                fontWeight: 500,
                            },

                            "&.active": {
                                bgcolor: "primary.light",
                                color: "primary.dark",
                            },

                            "&.active .MuiListItemText-primary": {
                                fontWeight: 700,
                            },

                            "&:hover": {
                                bgcolor: "action.hover",
                            },

                            "&.active:hover": {
                                bgcolor: "primary.light",
                            },
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>

                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>

            <Divider sx={{ my: 2.5 }} />

            {/* Settings */}
            <List disablePadding>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        px: 1.5,
                        borderRadius: 2.5,
                        color: "text.secondary",
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 42, color: "inherit" }}>
                        <SettingsRoundedIcon />
                    </ListItemIcon>

                    <ListItemText primary="Settings" />
                </ListItemButton>
            </List>

            {/* Spacer pushes the bottom content down */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Upgrade card */}
            <Box
                sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "#F0F8F3",
                    border: "1px solid #DDEFE4",
                    mb: 2,
                }}
            >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.75 }}>
                    Your money, in focus
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", lineHeight: 1.6, mb: 1.5 }}
                >
                    Build better habits by keeping your finances organized.
                </Typography>

                <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={onClose}
                >
                    Explore Finora
                </Button>
            </Box>

            {/* Sign-out placeholder */}
            <ListItemButton
                sx={{
                    minHeight: 44,
                    px: 1.5,
                    borderRadius: 2.5,
                    color: "text.secondary",
                }}
            >
                <ListItemIcon sx={{ minWidth: 42, color: "inherit" }}>
                    <LogoutRoundedIcon />
                </ListItemIcon>

                <ListItemText primary="Sign out" />
            </ListItemButton>
        </Box>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },

                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        boxSizing: "border-box",
                        borderRight: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                    },
                }}
            >
                {sidebarContent}
            </Drawer>

            {/* Mobile sidebar */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", md: "none" },

                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        maxWidth: "85vw",
                        boxSizing: "border-box",
                    },
                }}
            >
                {sidebarContent}
            </Drawer>
        </>
    );
}

export default Sidebar;