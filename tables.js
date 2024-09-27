// Listen for the DOM content to be loaded, then initialize event listeners and the menu.
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addTableBtn').addEventListener('click', addNewTable);
    initializeMenu();
});
// Variables for tracking table count, the current table being interacted with, and the orders per table.
let tableCounter = 1;
let currentTableId = null;
let tablesOrders = {};
// The menu items along with their categories and prices.
const menu = {
    Food: [
        { name: "Pizza", price: 10 },
        { name: "Burger", price: 8 },
        { name: "Pasta", price: 12 },
        { name: "Salad", price: 7 },
        { name: "Sushi", price: 15 },
        { name: "Aquazan Special", price: 15 },
    ],
    Beverages: {
        Cold: [
            { name: "Iced Coffee", price: 3 },
            { name: "Iced Chocolate", price: 4 },
            { name: "Soda", price: 1 },
            { name: "Water", price: 1 },
            { name: "MilkShake", price: 3 },
            { name: "Iced Tea", price: 4 },
            { name: "Iced Tea", price: 4 }
        ],
        Hot: [
            { name: "Espresso", price: 2.5 },
            { name: "Latte", price: 3.5 },
            { name: "Hot Choclate", price: 3 },
            { name: "Chai Latte", price: 4 },
            { name: "French Vanilla", price: 3 },
            { name: "Arabic Coffee", price: 4 }
        ]
    },
    Argeela: [
        { name: "Apple", price: 20 },
        { name: "Grape", price: 20 },
        { name: "Mint", price: 22 },
        { name: "Watermelon", price: 24 },
        { name: "Blueberry", price: 25 }
    ]
};
// Hides the menu selection area on initialization.
function initializeMenu() {
    const menuSelection = document.getElementById('menuSelection');
    menuSelection.style.display = 'none';
}
// Shows the menu for a selected table, allowing items to be added to the table's order.
function showMenu(tableId) {
    currentTableId = tableId;
    const menuSelection = document.getElementById('menuSelection');
    menuSelection.innerHTML = '';
    menuSelection.style.display = 'block';
    // Creates buttons for each category in the menu.
    Object.keys(menu).forEach(category => {
        const categoryButton = document.createElement('button');
        categoryButton.textContent = category;
        categoryButton.className = 'category-button';
        categoryButton.onclick = () => showCategoryItems(category);
        menuSelection.appendChild(categoryButton);
    });
    addCloseMenuButton(menuSelection);  // Adds a button to close the menu.
}
// Displays items within a selected category.
function showCategoryItems(category) {
    const menuSelection = document.getElementById('menuSelection');
    menuSelection.innerHTML = '';

    if (category === 'Beverages') {
        ['Cold', 'Hot'].forEach(subCategory => {
            const button = document.createElement('button');
            button.textContent = subCategory;
            button.className = 'sub-category-button';
            button.onclick = () => showBeverageOptions(subCategory);
            menuSelection.appendChild(button);
        });
    } else {
        menu[category].forEach(item => {
            const itemButton = document.createElement('button');
            itemButton.textContent = `${item.name} - $${item.price}`;
            itemButton.className = 'item-button';
            itemButton.onclick = () => addItemToTable(currentTableId, item);
            menuSelection.appendChild(itemButton);
        });
    }
    addCloseMenuButton(menuSelection);
}
// For beverages, shows options for cold or hot beverages.
function showBeverageOptions(subCategory) {
    const menuSelection = document.getElementById('menuSelection');
    menuSelection.innerHTML = '';
    menu.Beverages[subCategory].forEach(item => {
        const itemButton = document.createElement('button');
        itemButton.textContent = `${item.name} - $${item.price}`;
        itemButton.className = 'item-button';
        itemButton.onclick = () => addItemToTable(currentTableId, item);
        menuSelection.appendChild(itemButton);
    });
    addCloseMenuButton(menuSelection);
}
// Adds a close button to the menu selection area.
function addCloseMenuButton(parentElement) {
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close Menu';
    closeButton.className = 'close-menu-button';
    closeButton.onclick = () => parentElement.style.display = 'none';
    parentElement.appendChild(closeButton);
}
// Adds a new table to the system and renders it.
function addNewTable() {
    let tableId = `table-${tableCounter}`;
    tablesOrders[tableId] = { items: {}, total: 0 }; // Initializes the table's order.
    renderTable(tableId); // Renders the table in the UI.
    tableCounter++; // Increments the table counter.
}
// Renders a table's UI, including options to show/hide orders, add items, and pay the bill.
function renderTable(tableId) {
    const tablesList = document.getElementById('tables-list');
    const tableDiv = document.createElement('div');
    tableDiv.className = 'table';
    tableDiv.id = tableId;
    tableDiv.innerHTML = `
        <h2><span class="editable-table-name" onclick="editTableName('${tableId}')">Table ${tableCounter}</span></h2>
        <div class="item-list" id="items-${tableId}" style="display: none;"></div>
        <p>Total: $<span id="total-${tableId}">0</span></p>
        <button onclick="toggleItems('${tableId}')" class="button">Show/Hide Orders</button>
        <button onclick="showMenu('${tableId}')" class="button add-items-btn">Add Items</button>
        <button onclick="initiatePayment('${tableId}')" class="button pay-bill-btn">Pay Bill</button>
    `;
    tablesList.appendChild(tableDiv);
}
// Allows the user to change the name of a table.
function editTableName(tableId) {
    const newName = prompt("Enter the new name for the table:");
    if (newName && newName.trim() !== "") {
        const tableNameElement = document.querySelector(`#${tableId} .editable-table-name`);
        if (tableNameElement) {
            tableNameElement.textContent = newName;
        }
    }
}
// Toggles the visibility of the items list for a table.
function toggleItems(tableId) {
    const itemsDiv = document.getElementById(`items-${tableId}`);
    itemsDiv.style.display = itemsDiv.style.display === 'none' ? '' : 'none';
}

function initializeMenu() {
    const menuSelection = document.getElementById('menuSelection');
    menuSelection.innerHTML = '';
    Object.keys(menu).forEach(itemName => {
        const itemButton = document.createElement('button');
        itemButton.textContent = `${itemName} - $${menu[itemName].price}`;
        itemButton.addEventListener('click', function () {
            addItemToTable(currentTableId, itemName);
        });
        menuSelection.appendChild(itemButton);
    });
    menuSelection.style.display = 'none';
}

function closeMenu() {
    const menuSelection = document.getElementById('menuSelection');
    menuSelection.style.display = 'none';
}
// Adds an item to a table's order and updates the table display.
function addItemToTable(tableId, item) {
    let tableOrder = tablesOrders[tableId];
    if (!tableOrder.items[item.name]) {
        tableOrder.items[item.name] = { quantity: 1, price: item.price };
    } else {
        tableOrder.items[item.name].quantity += 1;
    }
    tableOrder.total += item.price;
    updateTableDisplay(tableId);
}
// Updates the display of a table's orders and total amount.
function updateTableDisplay(tableId) {
    const itemsList = document.getElementById(`items-${tableId}`);
    itemsList.innerHTML = '';
    let tableOrder = tablesOrders[tableId];
    Object.entries(tableOrder.items).forEach(([itemName, itemDetails]) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${itemName} x ${itemDetails.quantity} - $${itemDetails.price * itemDetails.quantity}`;
        itemsList.appendChild(listItem);
    });
    const totalSpan = document.getElementById(`total-${tableId}`);
    totalSpan.textContent = tableOrder.total.toFixed(2);
}
// Initiates the payment process for a table's order.
function initiatePayment(tableId) {
    const totalAmount = tablesOrders[tableId].total;
    const amountReceived = prompt(`Total bill is $${totalAmount.toFixed(2)}. How much did the customer pay?`);
    if (amountReceived !== null) {
        const change = calculateChange(totalAmount, amountReceived);
        if (change >= 0) {
            alert(`Change to return to the customer: $${change.toFixed(2)}`);
            closeTable(tableId);
        } else {
            alert("The customer didn't pay enough. Please enter a valid amount.");
        }
    }
}
// Calculates the change due back to the customer.
function calculateChange(total, received) {
    return received - total;
}
// Closes out a table after payment, removing it from the system.
function closeTable(tableId) {
    delete tablesOrders[tableId]; // Removes the table's order from the tracking object.
    const tableDiv = document.getElementById(tableId); // Finds the table's div.
    tableDiv.parentNode.removeChild(tableDiv); // Removes the table's div from the DOM.
}