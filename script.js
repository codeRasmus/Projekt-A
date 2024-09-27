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
    printShoppingList(clearList());
  });
  sortNameBtn.addEventListener("click", function () {
    printShoppingList(sortName());
  });
  sortPriceBtn.addEventListener("click", function () {
    printShoppingList(sortPrice());
  });
}

// Submit input
function submitList(event) {
  event.preventDefault();
  createNewObject();
}

// Nyt object
function createNewObject() {
  // Værdierne gemmes i variabler
  let inputItemNameValue = formatName(
    document.querySelector("#item_name").value
  );
  let inputItemPriceValue = Number(document.querySelector("#item_price").value);
  let newItem;

  // Validerer værdierne,
  if (inputItemPriceValue <= 0) {
    alert("Prisen er for lav");
  } else if (inputItemNameValue === "") {
    alert("Udfyld vare");
  } else {
    newItem = {
      name: inputItemNameValue,
      price: inputItemPriceValue,
    };
    console.log(
      `You have added ${newItem.name} for the neat price of ${newItem.price} kr.`
    );
    updateShoppingList(newItem);
  }
}

// Objektet pushes til array
function updateShoppingList(newListItem) {
  // Tilføjer ny vare til array
  shoppingList.push(newListItem);

  // Clearer inputfelter (udover submit)
  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((input) => {
    input.value = "";
    if (input.type === "submit") {
      input.value = "Send";
    }
  });

  // Udskriver listen
  printShoppingList();
}

// Print i DOM
function printShoppingList() {
  let totalPrice = 0;
  const listElement = document.getElementById("shoppinglist");
  listElement.innerHTML = "";

  // Sorteringsknapperne vises hvis listen er længere end to elementer
  if (shoppingList.length >= 2) {
    document.querySelector(".btn_container").style.display = "flex";
  } else if (shoppingList.length === 0) {
    document.querySelector(".btn_container").style.display = "none";
    document.getElementById("totalprice").textContent = "Total: 0 kr.";
  }

  // For hvert objekt i arrayet, tilføjes et li-element hvori værdierne indsættes
  // Der tilføjes en remove-knap til hvert element
  // Li-elementet indsættes i DOM
  shoppingList.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - ${item.price} kr.`;
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn");
    removeBtn.textContent = "ⓧ";
    removeBtn.addEventListener("click", function () {
      printShoppingList(removeItem(index));
    });

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

  return shoppingList;
}
function sortPrice() {
  shoppingList.sort((a, b) => {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  });
  return shoppingList;
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

// Format
function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
