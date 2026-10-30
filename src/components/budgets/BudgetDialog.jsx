import { useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";

function BudgetDialog({
    open,
    onClose,
    onSave,
    editingBudget,
    availableCategories,
}) {
    if (!open) {
        return null;
    }

    return (
        <BudgetDialogForm
            key={editingBudget?.id || "new-budget"}
            onClose={onClose}
            onSave={onSave}
            editingBudget={editingBudget}
            availableCategories={availableCategories}
        />
    );
}

function BudgetDialogForm({
    onClose,
    onSave,
    editingBudget,
    availableCategories,
}) {
    const [category, setCategory] = useState(editingBudget?.category || "");
    const [limit, setLimit] = useState(editingBudget ? String(editingBudget.limit) : "");
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};
        const numericLimit = Number(limit);

        if (!category) {
            newErrors.category = "Please select a category.";
        }

        if (
            limit.trim() === "" ||
            !Number.isFinite(numericLimit) ||
            numericLimit <= 0
        ) {
            newErrors.limit = "Enter a budget greater than zero.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        onSave({
            ...(editingBudget || {}),
            category,
            limit: numericLimit,
        });
    };

    return (
        <Dialog
            open
            onClose={onClose}
            fullWidth
            maxWidth="xs"
        >
            <Stack
                component="form"
                onSubmit={handleSubmit}
            >
                <DialogTitle fontWeight={700}>
                    {editingBudget ? "Edit Budget" : "Create Budget"}
                </DialogTitle>

                <DialogContent dividers>
                    <Stack spacing={2.5} sx={{ pt: 1 }}>
                        <FormControl
                            fullWidth
                            error={Boolean(errors.category)}
                            required
                        >
                            <InputLabel id="budget-category-label">
                                Category
                            </InputLabel>

                            <Select
                                labelId="budget-category-label"
                                label="Category"
                                value={category}
                                displayEmpty
                                renderValue={(selected) =>
                                    selected || "Select a category"
                                }
                                disabled={Boolean(editingBudget)}
                                onChange={(event) => {
                                    setCategory(event.target.value);
                                    setErrors((previous) => ({
                                        ...previous,
                                        category: "",
                                    }));
                                }}
                            >
                                <MenuItem value="" disabled>
                                    Select a category
                                </MenuItem>
                                {availableCategories.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>

                            {errors.category && (
                                <span
                                    style={{
                                        color: "#d32f2f",
                                        fontSize: "0.75rem",
                                        marginTop: 5,
                                        marginLeft: 14,
                                    }}
                                >
                                    {errors.category}
                                </span>
                            )}
                        </FormControl>

                        <TextField
                            label="Monthly Budget (₹)"
                            type="number"
                            value={limit}
                            onChange={(event) => {
                                setLimit(event.target.value);
                                setErrors((previous) => ({
                                    ...previous,
                                    limit: "",
                                }));
                            }}
                            error={Boolean(errors.limit)}
                            helperText={errors.limit}
                            fullWidth
                            required
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                    step: "0.01",
                                },
                            }}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} color="inherit">
                        Cancel
                    </Button>

                    <Button type="submit" variant="contained">
                        {editingBudget ? "Save Changes" : "Create Budget"}
                    </Button>
                </DialogActions>
            </Stack>
        </Dialog>
    );
}

export default BudgetDialog;