import {
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";

import {
    Alert,
    Snackbar,
} from "@mui/material";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const showNotification = useCallback((message, severity = "success") => {
        setNotification({
            open: true,
            message,
            severity,
        });
    }, []);

    const closeNotification = (_, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setNotification((previous) => ({
            ...previous,
            open: false,
        }));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            <Snackbar
                open={notification.open}
                autoHideDuration={3500}
                onClose={closeNotification}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Alert
                    onClose={closeNotification}
                    severity={notification.severity}
                    variant="filled"
                    elevation={6}
                    sx={{ width: "100%" }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
}


// A custom hook for accessing the transaction context.
// eslint-disable-next-line react-refresh/only-export-components
export function useNotification() {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotification must be used inside NotificationProvider."
        );
    }

    return context;
}