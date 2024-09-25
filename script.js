"use strict";
window.addEventListener("DOMContentLoaded", init);
let shoppingList = [];

// Setup eventlisteners
function init() {
  const submitBtn = document.getElementById("submit");
  const sortNameBtn = document.querySelector("#sortName");
  const sortPriceBtn = document.querySelector("#sortPrice");
  const clearListBtn = document.querySelector("#clearList");
  submitBtn.addEventListener("click", submitList);
  clearListBtn.addEventListener("click", function () {
    createShoppingList(clearList()); // Pass the cleared list to update the DOM
  });
  sortNameBtn.addEventListener("click", function () {
    createShoppingList(sortName()); // Pass the returned sorted list
  });

  sortPriceBtn.addEventListener("click", function () {
    createShoppingList(sortPrice()); // Pass the returned sorted list
  });
}

// Submit input
function submitList(event) {
  event.preventDefault();
  createNewObject();
}

// Create new object for values
function createNewObject() {
  // Får værdierne fra inputs
  let inputItemNameValue = document.querySelector("#item_name").value;
  let inputItemPriceValue = Number(document.querySelector("#item_price").value);

  // Validerer værdierne,
  // hvis navnet er tomt eller prisen er 0 el. negativ accepteres indkøb ikke
  if (inputItemPriceValue <= 0) {
    alert("Prisen er for lav");
  } else if (inputItemNameValue === "") {
    alert("Udfyld indkøb");
  } else {
    let newItem = {
      name: inputItemNameValue,
      price: inputItemPriceValue,
    };
    console.log(newItem);
    updateShoppingList(newItem);
  }
}

// Updates the array and clears inputs
function updateShoppingList(newListItem) {
  // Tilføj nyt indkøb til array
  shoppingList.push(newListItem);

  // Clearer inputfelter udover submit
  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((input) => {
    input.value = "";
    if (input.type === "submit") {
      input.value = "Send";
    }
  });

  // Udskriver listen
  createShoppingList(shoppingList);
}

// Print objects
function createShoppingList(shoppingList) {
  let totalPrice = 0;
  const listElement = document.getElementById("shoppinglist");
  listElement.innerHTML = "";

  // Hvis arrayet er kortere end 1, skal sorter knapperne ikke vises
  // og prisen nulstilles.
  if (shoppingList.length >= 2) {
    document.querySelector(".btn_container").style.display = "flex";
  } else if (shoppingList.length === 0) {
    document.querySelector(".btn_container").style.display = "none";
    document.getElementById("totalprice").textContent = "Total: 0 kr.";
  }

  // For hvert objekt i arrayet, tilføjes et li-element hvori værdierne indsættes
  // Der tilføjes en remove-knap til hvert element med en eventlistener,
  // som starter removeItem funktionen.
  // Dette li-element indsættes i listen.
  shoppingList.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - ${item.price} kr.`;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn");
    removeBtn.textContent = "ⓧ";
    removeBtn.addEventListener("click", function () {
      createShoppingList(removeItem(index)); // Call removeItem and pass the result to update the list
    });

    // Append the list item to the shopping list container
    listElement.appendChild(listItem);
    totalPrice = item.price + totalPrice;
    document.getElementById("totalprice").textContent =
      "Total: " + totalPrice + " kr.";
    listItem.appendChild(removeBtn);
  });
}

// Sorters
function sortName() {
  shoppingList.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return shoppingList; // Return the sorted list
}
function sortPrice() {
  shoppingList.sort((a, b) => a.price - b.price);
  return shoppingList; // Return the sorted list
}
// Remover
function removeItem(index) {
  shoppingList.splice(index, 1); // Remove the item by index
  return shoppingList; // Return the modified list
}
// Clear list
function clearList() {
  shoppingList = [];
  return shoppingList;
}
