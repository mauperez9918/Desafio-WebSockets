const { Server } = require("socket.io");
const ProductManager = require("./productManager");
const productInstance = new ProductManager();

const init = (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", (socket) => {
    console.log(`Nuevo cliente socket conectado ${socket.id}`);

    socket.emit("getProducts", productInstance.getProducts());

    socket.on("deleteProduct", (id) => {
      productInstance.deleteProduct(id);
      socket.emit("getProducts", productInstance.getProducts());
    });

    socket.on("addProduct", (data) => {
      productInstance.addProduct(
        data.title,
        data.description,
        data.price,
        data.thumbnail,
        data.code,
        data.stock,
        data.category
      );

      socket.emit("getProducts", productInstance.getProducts());
    });
  });
};

module.exports = init;
