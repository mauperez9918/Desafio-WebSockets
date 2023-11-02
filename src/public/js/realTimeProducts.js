const socket = io();

socket.on("getProducts", (products) => {
  let productCard = document.getElementById("productCard");

  products.forEach((product) => {
    productCard.innerHTML += `
    <p>${product.id}</p> <p>${product.title}</p>`;
  });
});

let deleteForm = document.getElementsByClassName("deleteForm");
deleteForm.innerHTML = `<button class="btnDelete" data-id=${product.id}>Eliminar Producto</button>`;
let button = document.getElementsByClassName("btnDelete");
button.addEventListener("click", () => {
  socket.emit("deleteProduct", boton.dataset.id);
});
