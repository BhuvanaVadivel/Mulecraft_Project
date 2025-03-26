document.addEventListener("DOMContentLoaded", function() {
    fetchExpenses();

    document.getElementById("expense-form").addEventListener("submit", function(event) {
        event.preventDefault();
        addExpense();
    });
});

function addExpense() {
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;

    fetch('/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({amount, category, description, date})
    })
    .then(response => response.json())
    .then(() => {
        fetchExpenses();
        document.getElementById("expense-form").reset();
    });
}

function fetchExpenses() {
    fetch('/expenses')
    .then(response => response.json())
    .then(data => {
        const expenseList = document.getElementById("expense-list");
        expenseList.innerHTML = "";
        data.forEach(expense => {
            const li = document.createElement("li");
            li.textContent = `${expense[1]} - ${expense[2]} - ${expense[3]} - ${expense[4]}`;
            const btn = document.createElement("button");
            btn.textContent = "Delete";
            btn.onclick = () => deleteExpense(expense[0]);
            li.appendChild(btn);
            expenseList.appendChild(li);
        });
    });
}

function deleteExpense(id) {
    fetch(`/delete/${id}`, {method: 'DELETE'})
    .then(response => response.json())
    .then(() => fetchExpenses());
}
