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
    });
  });
};

module.exports = init;
