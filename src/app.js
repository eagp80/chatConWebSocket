import express from "express";
import {Server} from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";

const app= express();
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/',viewsRouter)


const server = app.listen(80, ()=>console.log("Servidor Efren en  80"));
const io= new Server (server);

// io.on('connection', socket=>{
//     console.log("Nuevo cliente conectado");

//     socket.on('message',data=>{
//         console.log(data);    
//     })

//     socket.emit('message', 'evento_socket_individual','este mensaje solo lo recibe el socket');
//     socket.broakacst.emit('evento_todos_menos_actual','lo ven todos menos actual'); 
//     io.emit('eventos_todos','lo recibiran todos clientes')
// })
io.on('connection', socket=>{
       console.log("Conectado");
       socket.on('message1',data=>{
        io.emit('log',data);
       })
});    