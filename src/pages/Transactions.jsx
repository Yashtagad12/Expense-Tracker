import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import {
    Add,
    DeleteOutlineOutlined,
    EditOutlined,
    ReceiptLongOutlined,
} from "@mui/icons-material";

import { useTransactions } from "../context/TransactionContext";

const categories = [
    "Salary",
    "Freelance",
    "Food",
    "Housing",
    "Utilities",
    "Transport",
    "Shopping",
    "Healthcare",
    "Education",
    "Entertainment",
    "Other",
];

const emptyForm = {
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: new Date().toLocaleDateString("en-CA"),
};

function formatRupees(amount) {
    return `₹${Number(amount).toLocaleString("en-IN")}`;
}

function Transactions() {
    const {
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    } = useTransactions();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [deleteTarget, setDeleteTarget] = useState(null);

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // Open the dialog for adding a transaction.
    const handleOpenAdd = () => {
        setEditingTransaction(null);
        setFormData({ ...emptyForm });
        setErrors({});
        setDialogOpen(true);
    };

    // Open the dialog with an existing transaction's details.
    const handleOpenEdit = (transaction) => {
        setEditingTransaction(transaction);

        setFormData({
            title: transaction.title,
            amount: String(transaction.amount),
            type: transaction.type,
            category: transaction.category,
            date: transaction.date,
        });

        setErrors({});
        setDialogOpen(true);
    };

    // Close the add/edit dialog.
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingTransaction(null);
        setErrors({});
    };

    // Update a form field whenever the user changes it.
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousFormData) => ({
            ...previousFormData,
            [name]: value,
        }));

        // Remove the field's error as the user corrects it.
        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: "",
        }));
    };

    // Check whether the form contains valid values.
    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Please enter a transaction title.";
        }

        if (
            formData.amount === "" ||
            !Number.isFinite(Number(formData.amount)) ||
            Number(formData.amount) <= 0
        ) {
            newErrors.amount = "Enter an amount greater than zero.";
        }

        if (!formData.category) {
            newErrors.category = "Please select a category.";
        }

        if (!formData.date) {
            newErrors.date = "Please select a date.";
        } else if (
            !/^\d{4}-\d{2}-\d{2}$/.test(formData.date) ||
            Number.isNaN(Date.parse(`${formData.date}T12:00:00`))
        ) {
            newErrors.date = "Please enter a valid date.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Display a success or error notification.
    const showNotification = (message, severity = "success") => {
        setNotification({
            open: true,
            message,
            severity,
        });
    };

    // Add a new transaction or update an existing one.
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const transactionData = {
            id: editingTransaction
                ? editingTransaction.id
                : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,

            title: formData.title.trim(),
            amount: Number(formData.amount),
            type: formData.type,
            category: formData.category,
            date: formData.date,
        };

        if (editingTransaction) {
            updateTransaction(transactionData);
            showNotification("Transaction updated successfully.");
        } else {
            addTransaction(transactionData);
            showNotification("Transaction added successfully.");
        }

        handleCloseDialog();
    };

    // Remember which transaction the user wants to delete.
    const handleDeleteRequest = (transaction) => {
        setDeleteTarget(transaction);
    };

    // Delete the selected transaction after confirmation.
    const handleConfirmDelete = () => {
        if (!deleteTarget) {
            return;
        }

        deleteTransaction(deleteTarget.id);

        showNotification("Transaction deleted successfully.");

        setDeleteTarget(null);
    };

    // Sort transactions from newest to oldest.
    const sortedTransactions = [...transactions].sort((a, b) =>
        b.date.localeCompare(a.date)
    );

    return (
        <Box>
            {/* Page heading */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                spacing={2}
                sx={{ mb: 3 }}
            >
                <Box>
                    <Typography variant="h4" fontWeight={700}>
                        Transactions
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Manage your income and expenses in one place.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleOpenAdd}
                    sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
                >
                    Add Transaction
                </Button>
            </Stack>

            {/* Transactions table */}
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: "action.hover" }}>
                            <TableCell>Transaction</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {sortedTransactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Stack
                                        alignItems="center"
                                        spacing={1}
                                        sx={{ py: 6 }}
                                    >
                                        <ReceiptLongOutlined
                                            sx={{ fontSize: 42, color: "text.secondary" }}
                                        />

                                        <Typography fontWeight={600}>
                                            No transactions yet
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            Add your first transaction to get started.
                                        </Typography>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedTransactions.map((transaction) => (
                                <TableRow
                                    key={transaction.id}
                                    hover
                                    sx={{
                                        "&:last-child td": { borderBottom: 0 },
                                    }}
                                >
                                    <TableCell>
                                        <Typography fontWeight={600}>
                                            {transaction.title}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>{transaction.category}</TableCell>

                                    <TableCell>
                                        {new Date(
                                            `${transaction.date}T12:00:00`
                                        ).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={
                                                transaction.type === "income" ? "Income" : "Expense"
                                            }
                                            color={
                                                transaction.type === "income" ? "success" : "error"
                                            }
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>

                                    <TableCell align="right">
                                        <Typography
                                            fontWeight={700}
                                            color={
                                                transaction.type === "income"
                                                    ? "success.main"
                                                    : "text.primary"
                                            }
                                        >
                                            {transaction.type === "income" ? "+" : "−"}
                                            {formatRupees(transaction.amount)}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            spacing={0.5}
                                        >
                                            <IconButton
                                                aria-label={`Edit ${transaction.title}`}
                                                color="primary"
                                                onClick={() => handleOpenEdit(transaction)}
                                                size="small"
                                            >
                                                <EditOutlined fontSize="small" />
                                            </IconButton>

                                            <IconButton
                                                aria-label={`Delete ${transaction.title}`}
                                                color="error"
                                                onClick={() => handleDeleteRequest(transaction)}
                                                size="small"
                                            >
                                                <DeleteOutlineOutlined fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
            >
                {transactions.length}{" "}
                {transactions.length === 1 ? "transaction" : "transactions"} in total
            </Typography>
        {/* Add/Edit Transaction Dialog */}
<Dialog
    open={dialogOpen}
    onClose={handleCloseDialog}
    fullWidth
    maxWidth="sm"
>
    <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogTitle fontWeight={700}>
            {editingTransaction ? "Edit Transaction" : "Add Transaction"}
        </DialogTitle>

        <DialogContent dividers>
            <Grid container spacing={2} sx={{ pt: 1 }}>
                {/* Transaction title */}
                <Grid size={{ xs: 12 }}>
                    <TextField
                        name="title"
                        label="Transaction Title"
                        placeholder="e.g. Monthly Salary"
                        value={formData.title}
                        onChange={handleChange}
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                        fullWidth
                        required
                    />
                </Grid>

                {/* Transaction amount */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="amount"
                        label="Amount (₹)"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        error={Boolean(errors.amount)}
                        helperText={errors.amount}
                        fullWidth
                        required
                        slotProps={{
                            htmlInput: {
                                min: 0,
                                step: "0.01",
                            },
                        }}
                    />
                </Grid>

                {/* Income or expense */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                        <InputLabel id="transaction-type-label">
                            Transaction Type
                        </InputLabel>

                        <Select
                            labelId="transaction-type-label"
                            name="type"
                            label="Transaction Type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <MenuItem value="income">Income</MenuItem>
                            <MenuItem value="expense">Expense</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Transaction category */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl
                        fullWidth
                        required
                        error={Boolean(errors.category)}
                    >
                        <InputLabel id="transaction-category-label">
                            Category
                        </InputLabel>

                        <Select
                            labelId="transaction-category-label"
                            name="category"
                            label="Category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>

                        {errors.category && (
                            <Typography
                                variant="caption"
                                color="error"
                                sx={{ mt: 0.5, ml: 1.75 }}
                            >
                                {errors.category}
                            </Typography>
                        )}
                    </FormControl>
                </Grid>

                {/* Transaction date */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="date"
                        label="Transaction Date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        error={Boolean(errors.date)}
                        helperText={errors.date}
                        fullWidth
                        required
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseDialog} color="inherit">
                Cancel
            </Button>

            <Button type="submit" variant="contained">
                {editingTransaction ? "Save Changes" : "Add Transaction"}
            </Button>
        </DialogActions>
    </Box>
</Dialog>

{/* Delete Confirmation Dialog */}
<Dialog
    open={Boolean(deleteTarget)}
    onClose={() => setDeleteTarget(null)}
    fullWidth
    maxWidth="xs"
>
    <DialogTitle fontWeight={700}>
        Delete Transaction?
    </DialogTitle>

    <DialogContent>
        <Typography color="text.secondary">
            Are you sure you want to delete{" "}
            <Box
                component="span"
                sx={{ fontWeight: 700, color: "text.primary" }}
            >
                {deleteTarget?.title}
            </Box>
            ? This action cannot be undone.
        </Typography>
    </DialogContent>

    <DialogActions sx={{ p: 2 }}>
        <Button onClick={() => setDeleteTarget(null)} color="inherit">
            Cancel
        </Button>

        <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
        >
            Delete
        </Button>
    </DialogActions>
</Dialog>

{/* Success and error notifications */}
<Snackbar
    open={notification.open}
    autoHideDuration={3000}
    onClose={() =>
        setNotification((previous) => ({
            ...previous,
            open: false,
        }))
    }
    anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
    }}
>
    <Alert
        severity={notification.severity}
        variant="filled"
        onClose={() =>
            setNotification((previous) => ({
                ...previous,
                open: false,
            }))
        }
    >
        {notification.message}
    </Alert>
</Snackbar>
        </Box>
    );
}

export default Transactions;
