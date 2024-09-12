const express = require("express");
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const socketReseptor = require("./src/controllers/conexionChat");
const { registrarMensaje, desconectado, registrarUsuario } = require("./src/services/chatBd");
require('dotenv').config();


const app = express();

const server = http.createServer(app);

//configuracion cors
const corsOptions = {
    origin:"http://142.93.50.145", 
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  };
  app.use(cors(corsOptions));

  // api

  app.use('/api', require('./src/api/index'));
// configuracion de socket
 
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Permitir este origen
        methods: ['GET', 'POST'],
        credentials: true
      }
});
io.on('connection', (client) => {
    const id= client.id;
    registrarUsuario(id, '', "activo");
    /*client.on('registro', (data) => {
        
    })*/
    
    client.on('mensaje', (data) => {
        io.emit("mensaje",data);
        registrarMensaje(data)
        
    })

    client.on("escribiendo", (id) => {
        io.emit("escribiendo", id);
    })


    client.on("disconnect", () => {
        desconectado(id);
        client.emit("desconectado", "desconectado");
    })
});

//inicio del servidor 

server.listen(process.env.PORT, () => {
    console.log("servidor iniciado");
})

module.exports = io