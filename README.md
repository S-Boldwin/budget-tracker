# 💰 Budget Tracker

A clean, intuitive personal finance tracker to manage daily expenses with real-time calculations and persistent storage.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![CSS3](https://img.shields.io/badge/CSS3-Responsive-blue)
![Status](https://img.shields.io/badge/status-active-success)

## 🚀 [Live Demo](https://s-boldwin.github.io/budget-tracker/)

## 📸 Screenshot

![Budget Tracker Screenshot](webpage_screenshot.jpeg)

---

## ✨ Features

- ➕ **Add Expenses** - Quick entry with name, amount, and category
- 📊 **Real-time Summary** - Instant calculation of total and category-wise spending
- 🎨 **Category Organization** - 5 predefined categories (Food, Transport, Entertainment, Utilities, Other)
- 🔍 **Smart Filtering** - View expenses by specific category
- ✏️ **Edit Expenses** - Modify existing entries with form auto-population
- 🗑️ **Delete with Confirmation** - Safe removal of expenses
- 💾 **Data Persistence** - localStorage keeps your data even after browser refresh
- 📱 **Fully Responsive** - Mobile-first design with CSS Grid and Flexbox
- 🎯 **No Dependencies** - Pure vanilla JavaScript, no frameworks

---

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients, transitions, and animations
- **JavaScript (ES6)** - Core functionality

---

## 🎯 What I Learned

### 1. Array Method Mastery
Using `reduce()` for complex calculations:
```javascript
const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

const foodTotal = expenses
    .filter(exp => exp.category === "food")
    .reduce((sum, exp) => sum + exp.amount, 0);
```

### 2. State Management
Managing application state with plain JavaScript:
```javascript
let expenses = [];
let isEditing = false;
let currentFilter = "all";
let editingId = null;
```

### 3. CRUD Operations
- **Create:** `addExpense()` - Add new expenses with validation
- **Read:** `displayExpense()` - Display and filter expenses
- **Update:** `updateExpense()` - Edit existing expenses
- **Delete:** `deleteExpense()` - Remove with confirmation

### 4. localStorage Implementation
```javascript
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpenses() {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
    }
}
```

### 5. Dynamic DOM Manipulation
```javascript
function createExpenseElement(expense) {
    const div = document.createElement("div");
    div.className = "expense-item";
    div.innerHTML = `...`;
    return div;
}
```

### 6. Edit Mode Pattern
Toggling between add and update modes:
```javascript
if (isEditing) {
    updateExpense(editingId, name, amount, category);
} else {
    addExpense(name, amount, category);
}
```

### 7. Number Formatting
Using `toLocaleString()` for proper currency display:
```javascript
function formatAmount(amount) {
    return amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
```

---

## 🏗️ Code Structure
```javascript
// DOM Elements
const expenseForm = document.getElementById("expense-form");
const expenseContainer = document.getElementById("expense-container");
// ... other elements

// Data
let expenses = [];
let currentFilter = "all";

// Category Configuration
const categories = {
    food: { name: "Food", icon: "🍔", color: "food" },
    transport: { name: "Transport", icon: "🚗", color: "transport" },
    // ... other categories
};

// Core Functions
init();              // Initialize app
loadExpenses();      // Load from localStorage
saveExpenses();      // Save to localStorage
addExpense();        // Create new expense
updateExpense();     // Edit existing expense
deleteExpense();     // Remove expense
displayExpense();    // Show expenses
createExpenseElement(); // Generate HTML
formatAmount();      // Format currency
updateSummary();     // Calculate totals

// Event Listeners
expenseForm.addEventListener("submit", ...);
filterBtns.forEach(btn => btn.addEventListener("click", ...));
```

---

## 🎨 Design Features

### Color Scheme
- **Primary Green:** `#2ecc71` - Money and growth theme
- **Background:** `#f5f7fa` - Clean, professional
- **Category Colors:** Unique colors for each expense category

### CSS Highlights
- Gradient header with box shadow
- Hover effects on cards and buttons
- Smooth transitions (0.3s)
- `slideIn` animation for expense items
- Responsive breakpoint at 768px

### Responsive Design
```css
@media (max-width: 768px) {
    #expense-form {
        grid-template-columns: 1fr;
    }
    .expense-item {
        flex-direction: column;
    }
}
```

---

## 💻 How to Run Locally

1. Clone this repository:
```bash
   git clone https://github.com/S-Boldwin/budget-tracker.git
   cd budget-tracker
```

2. Open `index.html` in your browser

3. Start tracking expenses!

---

## 📂 Project Structure
```
budget-tracker/
├── index.html          # HTML structure
├── style.css           # Styling and responsive design
├── app.js              # JavaScript functionality
├── README.md           # Documentation
└── .gitignore          # Git ignore rules
```

---

## 🔮 Future Enhancements

- [ ] Add Chart.js for visual spending analytics
- [ ] Implement date range filtering (week/month/year)
- [ ] Set monthly budget limits with warnings
- [ ] Export data as CSV
- [ ] Add more categories with custom icons
- [ ] Dark mode toggle
- [ ] Search functionality

---

## 🐛 Known Limitations

- localStorage not available in incognito/private mode
- Data stored locally per device (no cloud sync)
- localStorage limit: ~5-10MB

---

## 🎓 Learning Context

**Project #4** in my JavaScript learning journey

**Previous Projects:**
1. [To-Do App](https://github.com/S-Boldwin/todo-app) - Basic CRUD, localStorage
2. [Weather App](https://github.com/S-Boldwin/weather-app) - API integration, fetch()
3. [Quote Generator](https://github.com/S-Boldwin/quote-generator) - async/await

**Skills Progression:**
- To-Do: Basic state management
- Weather: API calls and promises
- Quotes: Async/await pattern
- **Budget: Complex array methods + filtering** ← Current

---

## 👨‍💻 Author

**Swithin Boldwin**
- 3rd Year B.Tech Computer Engineering Student
- IBM Q2D Pearl Program (AI/ML Track)
- GitHub: [@S-Boldwin](https://github.com/S-Boldwin)
- LinkedIn: [Swithin Boldwin](https://linkedin.com/in/swithin-boldwin-53217a291)
- Email: swithinparangath23@gmail.com

---

## 📚 Resources Used

- MDN Web Docs - JavaScript Array Methods
- JavaScript.info - localStorage guide
- CSS-Tricks - Flexbox and Grid layouts

---

## 📄 License

This project is open source and available under the MIT License.

---

⭐ **Star this repo if you found it helpful!**

💬 **Feedback welcome!**
