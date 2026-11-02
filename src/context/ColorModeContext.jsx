import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    createTheme,
    CssBaseline,
    ThemeProvider,
} from "@mui/material";

const ColorModeContext = createContext(null);

const STORAGE_KEY = "finora-color-mode";

function getInitialMode() {
    try {
        const savedMode = localStorage.getItem(STORAGE_KEY);

        if (savedMode === "light" || savedMode === "dark") {
            return savedMode;
        }
    } catch {
        // If Local Storage is unavailable, use the default theme.
    }

    return "light";
}

export function ColorModeProvider({ children }) {
    const [mode, setMode] = useState(getInitialMode);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, mode);
        } catch {
            // The theme still works for this session if saving fails.
        }
    }, [mode]);

    const colorMode = useMemo(
        () => ({
            mode,

            toggleColorMode: () => {
                setMode((previousMode) =>
                    previousMode === "light" ? "dark" : "light"
                );
            },
        }),
        [mode]
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,

                    primary: {
                        main: mode === "light" ? "#5267DE" : "#9AA8FF",
                    },

                    secondary: {
                        main: mode === "light" ? "#16845B" : "#69D5A8",
                    },

                    background: {
                        default: mode === "light" ? "#F6F7FB" : "#10131B",
                        paper: mode === "light" ? "#FFFFFF" : "#191E2A",
                    },

                    success: {
                        main: mode === "light" ? "#16845B" : "#69D5A8",
                    },

                    error: {
                        main: mode === "light" ? "#D1435B" : "#FF8092",
                    },

                    warning: {
                        main: mode === "light" ? "#B7791F" : "#FFC66D",
                    },

                    divider:
                        mode === "light"
                            ? "rgba(25, 35, 60, 0.12)"
                            : "rgba(255, 255, 255, 0.12)",
                },

                shape: {
                    borderRadius: 12,
                },

                typography: {
                    fontFamily: [
                        "Inter",
                        "Roboto",
                        "Arial",
                        "sans-serif",
                    ].join(","),

                    h4: {
                        fontWeight: 800,
                        letterSpacing: "-0.5px",
                    },

                    h5: {
                        fontWeight: 700,
                    },

                    h6: {
                        fontWeight: 700,
                    },

                    button: {
                        textTransform: "none",
                        fontWeight: 600,
                    },
                },

                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                borderRadius: 10,
                                paddingInline: 16,
                            },
                        },
                    },

                    MuiCard: {
                        styleOverrides: {
                            root: {
                                backgroundImage: "none",
                            },
                        },
                    },

                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                backgroundImage: "none",
                            },
                        },
                    },

                    MuiOutlinedInput: {
                        styleOverrides: {
                            root: {
                                borderRadius: 10,
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

// A custom hook for accessing the transaction context.
// eslint-disable-next-line react-refresh/only-export-components
export function useColorMode() {
    const context = useContext(ColorModeContext);

    if (!context) {
        throw new Error(
            "useColorMode must be used inside ColorModeProvider."
        );
    }

    return context;
}