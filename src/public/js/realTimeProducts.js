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
  socket.emit("deleteProduct", input.value);
  input.value = "";
});

const addProductForm = document.getElementById("addProductForm");

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(addProductForm);
  let title = formData.get("title");
  let description = formData.get("description");
  let price = formData.get("price");
  let thumbnail = formData.get("thumbnail");
  let code = formData.get("code");
  let stock = formData.get("stock");
  let category = formData.get("category");

  const data = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  };

  socket.emit("addProduct", data);
});
