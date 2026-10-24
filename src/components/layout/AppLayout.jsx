import { useState } from "react";

import { Box } from "@mui/material";

import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

const DRAWER_WIDTH = 250;

function AppLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleOpenMenu = () => {
        setMobileOpen(true);
    };

    const handleCloseMenu = () => {
        setMobileOpen(false);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "background.default",
            }}
        >
            {/* Sidebar navigation */}
            <Sidebar
                mobileOpen={mobileOpen}
                onClose={handleCloseMenu}
            />

            {/* Main application area */}
            <Box
                sx={{
                    ml: { xs: 0, md: `${DRAWER_WIDTH}px` },
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                }}
            >
                {/* Top header */}
                <Header onMenuClick={handleOpenMenu} />

                {/* Page content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        width: "100%",
                        maxWidth: "1600px",
                        mx: "auto",
                        p: { xs: 2, sm: 3, lg: 4 },
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default AppLayout;