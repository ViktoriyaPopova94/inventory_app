// db.js

const dbName = 'inventoryDB';
const dbVersion = 1;
let db;

// Открытие базы данных
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains('items')) {
        db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject('Error opening database.');
    };
  });
}

// Добавление элемента в базу данных
function addItem(item) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['items'], 'readwrite');
    const objectStore = transaction.objectStore('items');
    const request = objectStore.add(item);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject('Error adding item.');
    };
  });
}

// Получение всех элементов из базы данных
function getItems() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['items'], 'readonly');
    const objectStore = transaction.objectStore('items');
    const request = objectStore.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject('Error fetching items.');
    };
  });
}

// Обновление элемента в базе данных
function updateItem(item) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['items'], 'readwrite');
    const objectStore = transaction.objectStore('items');
    const request = objectStore.put(item);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject('Error updating item.');
    };
  });
}

// Удаление элемента из базы данных
function deleteItem(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['items'], 'readwrite');
    const objectStore = transaction.objectStore('items');
    const request = objectStore.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject('Error deleting item.');
    };
  });
}

// Инициализация базы данных
async function initDB() {
  try {
    await openDB();
    console.log('Database initialized.');
  } catch (error) {
    console.error(error);
  }
}

initDB();
