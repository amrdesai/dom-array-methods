// Variables
const main = document.getElementById('main');
const addDeviceBtn = document.getElementById('add-device');
const doubleBtn = document.getElementById('double');
const millionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcquantityBtn = document.getElementById('calculate-stock');

// Data
let data = [];

// Function: Add new user to data array
const addData = (object) => {
    data.push(object);
    updateDOM();
};

// Function: Update DOM when new user is added
const updateDOM = (providedData = data) => {
    // Clear main div
    main.innerHTML = `<h2><strong>Person</strong> quantity</h2>`;

    providedData.forEach((item) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('person');
        newDiv.innerHTML = `<strong>${item.name}</strong> ${formatQuantity(
            item.quantity
        )}`;
        main.appendChild(newDiv);
    });
};

// Function: Fetch random user and add quantity
const getNewDevice = async () => {
    // Fetch user data (using proxy for CORS)
    const res = await fetch(
        `https://random-data-api.com/api/device/random_device`
    );
    const data = await res.json();
    const deviceModel = data.model;

    // Create a new user object
    const newUser = {
        name: deviceModel,
        quantity: Math.floor(Math.random() * 1000000),
    };

    // Add user to data arr
    addData(newUser);
};

// Function: Double everyones quantity
const doubleQuantity = () => {
    data = data.map((user) => {
        return { ...user, quantity: user.quantity * 2 };
    });

    updateDOM();
};

// Function: Sort by richest
const sortByHighest = () => {
    data.sort((a, b) => b.quantity - a.quantity);
    updateDOM();
};

// Function: Show only millionaire
const showMillionaires = () => {
    data = data.filter((user) => user.quantity >= 1000000);
    updateDOM();
};

// Function: Add total quantity
const calculateQuantity = () => {
    const quantity = data.reduce((acc, user) => (acc += user.quantity), 0);

    const quantityEl = document.createElement('div');
    quantityEl.innerHTML = `<h3>Total quantity: <strong>${formatQuantity(
        quantity
    )}</strong></h3>`;

    main.appendChild(quantityEl);
};

// Function: Format number as quantity
const formatQuantity = (num) => {
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

getNewDevice();
getNewDevice();
getNewDevice();

// Event Listener: Add new user button
addDeviceBtn.addEventListener('click', getNewDevice);

// Event Listener: Double quantity button
doubleBtn.addEventListener('click', doubleQuantity);

// Event Listener: Sort people by quantity button
sortBtn.addEventListener('click', sortByHighest);

// Event Listener: Show on millionaires button
millionaireBtn.addEventListener('click', showMillionaires);

// Event Listener: All total quantity
calcquantityBtn.addEventListener('click', calculateQuantity);
