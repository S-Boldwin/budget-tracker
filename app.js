// ===================================
// BUDGET TRACKER - JAVASCRIPT
// ===================================

// Get DOM Elements
const expenseForm = document.getElementById("expense-form");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseNameInput = document.getElementById("expense-name");
const expenseCategoryInput = document.getElementById("expense-category");
const submitBtn = document.getElementById("submit-btn");
const expenseContainer = document.getElementById("expense-container");
const filterBtns = document.querySelectorAll(".filter-btn");

// Summary elements
const totalAmountEl = document.getElementById("total-amount");
const foodTotalEl = document.getElementById("food-total");
const transportTotalEl = document.getElementById("transport-total");
const entertainmentTotalEl = document.getElementById("entertainment-total");

// Data
let expenses = [];
let currentFilter = "all"; // Changed from "All" to "all" (lowercase!)
let isEditing = false;
let editingId = null;

// Category configuration
const categories = {
    food: { name: "Food", icon: "🍔", color: "food" },
    transport: { name: "Transport", icon: "🚗", color: "transport" },
    entertainment: { name: "Entertainment", icon: "🎮", color: "entertainment" },
    utilities: { name: "Utilities", icon: "💡", color: "utilities" },
    other: { name: "Other", icon: "📦", color: "other" }
};

// ===================================
// INITIALIZATION
// ===================================

function init() {
    loadExpenses();
    displayExpense();
    updateSummary();
}

// ===================================
// LOCALSTORAGE FUNCTIONS
// ===================================

function loadExpenses() {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
    }
}

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// ===================================
// ADD EXPENSE FUNCTION (OUTSIDE EVENT LISTENER!)
// ===================================

function addExpense(name, amount, category) {
    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category,
        date: new Date().toLocaleDateString("en-IN"),
        timestamp: Date.now()
    };

    expenses.unshift(expense);
    saveExpenses();
    displayExpense();
    updateSummary();
}

// ===================================
// UPDATE EXPENSE FUNCTION (OUTSIDE EVENT LISTENER!)
// ===================================

function updateExpense(id, name, amount, category) {
    const expense = expenses.find(exp => exp.id === id);
    if (expense) {
        expense.name = name;
        expense.amount = amount;
        expense.category = category;
        expense.date = new Date().toLocaleDateString("en-IN");

        saveExpenses();
        displayExpense();
        updateSummary();
    }
}

// ===================================
// DISPLAY EXPENSES
// ===================================

function displayExpense() {
    let filteredExpenses = expenses;
    if (currentFilter !== "all") {
        filteredExpenses = expenses.filter(exp => exp.category === currentFilter);
    }

    expenseContainer.innerHTML = "";

    if (filteredExpenses.length === 0) {
        expenseContainer.innerHTML = `
            <p class="no-expenses">
                ${currentFilter === 'all' 
                    ? 'No expenses yet. Add your first one above!' 
                    : 'No expenses in this category yet.'}
            </p>
        `;
        return;
    }

    filteredExpenses.forEach(expense => {
        const expenseItem = createExpenseElement(expense);
        expenseContainer.appendChild(expenseItem);
    });
}

// ===================================
// CREATE EXPENSE ELEMENT
// ===================================

function createExpenseElement(expense) {
    const div = document.createElement("div");
    div.className = "expense-item";

    const categoryInfo = categories[expense.category];

    div.innerHTML = `
        <div class="expense-info">
            <div class="expense-name">${expense.name}</div>
            <div class="expense-details">
                <span class="category-badge category-${categoryInfo.color}">
                    ${categoryInfo.icon} ${categoryInfo.name}
                </span>
                <span>${expense.date}</span>
            </div>
        </div>
        <div class="expense-amount">₹${formatAmount(expense.amount)}</div>
        <div class="expense-actions">
            <button class="edit-btn" onclick="editExpense(${expense.id})">Edit</button>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
        </div>
    `;
    return div;
}

// ===================================
// FORMAT AMOUNT
// ===================================

function formatAmount(amount) {
    return amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// ===================================
// EDIT EXPENSE
// ===================================

function editExpense(id) {
    const expense = expenses.find(exp => exp.id === id);
    if (!expense) return;

    expenseNameInput.value = expense.name;
    expenseAmountInput.value = expense.amount;
    expenseCategoryInput.value = expense.category;

    isEditing = true;
    editingId = id;
    submitBtn.textContent = "Update Expense";

    expenseForm.scrollIntoView({ behavior: "smooth" });
    expenseNameInput.focus();
}

// ===================================
// DELETE EXPENSE
// ===================================

function deleteExpense(id) {
    if (!confirm("Are you sure you want to delete this expense?")) {
        return;
    }

    expenses = expenses.filter(exp => exp.id !== id);
    saveExpenses();
    displayExpense();
    updateSummary();
}

// ===================================
// FORM SUBMIT EVENT LISTENER
// ===================================

expenseForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategoryInput.value;

    if (!name || !amount || !category) {
        alert("Please fill in all fields!");
        return;
    }

    if (amount <= 0) {
        alert("Amount must be greater than zero!");
        return;
    }

    if (isEditing) {
        updateExpense(editingId, name, amount, category);
    } else {
        addExpense(name, amount, category);
    }

    expenseForm.reset();
    isEditing = false;
    editingId = null;
    submitBtn.textContent = "Add Expense";
});

// ===================================
// FILTER BUTTONS EVENT LISTENERS
// ===================================

filterBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        filterBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        currentFilter = this.dataset.category;
        displayExpense();
    });
});

// ===================================
// UPDATE SUMMARY
// ===================================

function updateSummary() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    const foodTotal = expenses
        .filter(exp => exp.category === "food")
        .reduce((sum, exp) => sum + exp.amount, 0);

    const transportTotal = expenses
        .filter(exp => exp.category === "transport")
        .reduce((sum, exp) => sum + exp.amount, 0);

    const entertainmentTotal = expenses
        .filter(exp => exp.category === "entertainment")
        .reduce((sum, exp) => sum + exp.amount, 0);

    totalAmountEl.textContent = `₹${formatAmount(total)}`;
    foodTotalEl.textContent = `₹${formatAmount(foodTotal)}`;
    transportTotalEl.textContent = `₹${formatAmount(transportTotal)}`;
    entertainmentTotalEl.textContent = `₹${formatAmount(entertainmentTotal)}`;
}

// ===================================
// START THE APP
// ===================================

init();