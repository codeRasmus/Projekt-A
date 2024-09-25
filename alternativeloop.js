for (let index = 0; index < shoppingList.length; index++) {
  const item = shoppingList[index];

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
  totalPrice += item.price;
  document.getElementById("totalprice").textContent =
    "Total: " + totalPrice + " kr.";
  listItem.appendChild(removeBtn);
}
