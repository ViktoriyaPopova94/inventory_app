// Функция для добавления нового предмета
function addItem() {
    const name = document.getElementById('itemName').value;
    const number = document.getElementById('itemNumber').value;
    const room = document.getElementById('itemRoom').value;

    if (name && number && room) {
        const table = document.querySelector('#inventoryTable tbody');
        const row = table.insertRow();
        row.insertCell(0).textContent = name;
        row.insertCell(1).textContent = number;
        row.insertCell(2).textContent = room;

        // Очистить поля ввода
        document.getElementById('itemName').value = '';
        document.getElementById('itemNumber').value = '';
        document.getElementById('itemRoom').value = '';

        saveData();
    } else {
        alert('Пожалуйста, заполните все поля');
    }
}

// Функция для сохранения данных в localStorage
function saveData() {
    const items = [];
    const rows = document.querySelectorAll('#inventoryTable tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            items.push({
                name: cells[0].textContent,
                number: cells[1].textContent,
                room: cells[2].textContent
            });
        }
    });
    localStorage.setItem('inventoryItems', JSON.stringify(items));
}

// Функция для загрузки данных из localStorage
function loadData() {
    const items = JSON.parse(localStorage.getItem('inventoryItems') || '[]');
    const table = document.querySelector('#inventoryTable tbody');
    items.forEach(item => {
        const row = table.insertRow();
        row.insertCell(0).textContent = item.name;
        row.insertCell(1).textContent = item.number;
        row.insertCell(2).textContent = item.room;
    });
}

// Функция для экспорта данных в CSV с правильной кодировкой UTF-8
function exportData() {
    const rows = Array.from(document.querySelectorAll('#inventoryTable tr'));
    const csvContent = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('td, th'));
        return cells.map(cell => cell.textContent).join(',');
    }).join('\n');

    // Добавляем BOM для правильного распознавания UTF-8 в Excel
    const bom = '\uFEFF';
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory_data.csv';
    a.click();
    URL.revokeObjectURL(url);
}

// Вызов функции загрузки данных при загрузке страницы
window.onload = loadData;
