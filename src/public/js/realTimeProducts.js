const socket = io();

socket.on("getProducts", (products) => {
  let productCard = document.getElementById("productCard");
  productCard.innerHTML = "";
  products.forEach((product) => {
    productCard.innerHTML += `
    <p>${product.id}</p> <p>${product.title}</p>`;
  });
});

const deleteForm = document.getElementById("deleteForm");
const input = document.getElementById("inputId");

deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  input.value = "";
  socket.emit("deleteProduct", input.value);
});
