const socket =io();


let user;
const chatbox=document.getElementById('chatBox');

//Modal
Swal.fire({
    title:"Identifiquese",
    input:"text",
    text:"Ingresar tu nombre de usuario para ingresar al chat",
    inputValidator:(value)=>{
        return !value && "Necesita un nombre de usuario para ingresar al chat";
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    icon:"success"//icono verde verificacion
}).then(result=>{
    user=result.value;
    socket.emit('authenticated', user);
});

chatbox.addEventListener('keyup', evt=>{
    if (evt.key==='Enter'){
        if(chatbox.value.trim().length>0){
            socket.emit('message', {user,message:chatbox.value});
            chatbox.value='';//limpiar el input en cliente
        }
    }
})

socket.on('messageLogs', data=>{
    let log = document.getElementById('messageLogs');//le damos un alias al identificadir en html
    let messages='';//para ir guardando todos los mensajes por usuario
    data.forEach(message => {
        messages+=`${message.user} dice: ${message.message}<br/>`
        log.innerHTML=messages;//este cliente escribe en el identificador del html lo recibido 
        
    });
})

socket.on('newUserConnected', data=>{

    Swal.fire({
        toast:true,
        position:'top-end',
        showConfirmationButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon:'success'
    })
})
// socket.emit('message','hola mensaje desde front');

// socket.on('evento_socket_individual',data=>{
//     console.log(data);    
// });

// socket.on('evento_todos_menos_actual',data=>{
//     console.log(data);    
// });

// socket.on('evento_todos',data=>{
//     console.log(data);    
// });