const conexion = require("../../helpers/conexionBd")

  // registra el usuario si el nombre se debe cambiar el nombre posteriormente 
const registrarUsuario = (usuario, nombre, estado) => {
   return new Promise((resolve, reject) => {
        conexion.query(`
             insert into usuarios (id_usuario, nombre, estado) values(?,?, ?)
            ` ,[usuario, nombre, estado],(err, result) => {
             if (err) {
                reject(err);
                return;
             }
             resolve({mensaje: "registrado"})
        })

    })
}

// se optienen todos los usuarios
const optenerUsuario = () => {
   return new Promise((resolve, reject) => {
        conexion.query(`
            select * from usuarios
           ` ,(err, result) => {
            if (err) {
               reject(err);
               return;
            }
            resolve({usuarios: result})
       })
 
    })

}

// esta funcion nos registra todos los mensajes del chat 
const registrarMensaje = (data) => {
    const id = data.id_usuario;
    const mensaje = data.mensaje;
   // const nombre = data.nombre
   return new Promise((resolve, reject) => {
        conexion.query(`
             insert into mensajes (id_usuario, mensaje) values(?,?)
            ` ,[id, mensaje],(err, result) => {
             if (err) {
                reject(err);
                return;
            }
             resolve({mensaje: "mensaje registrado"})
        })

    })
    
}

// funcion que nos da todos los mensajes

const pedirMensaje = () => {

   return new Promise((resolve, reject) => {
        conexion.query(`
            select * from mensajes
           ` ,(err, result) => {
            if (err) {
               reject(err);
               return;
            }
            resolve({mensajes: result})
       })
 
    })


}

// esta funcion marca como desconectado el usuario que se conecto 
const desconectado = (id) => {
    return new Promise((resolve,reject) => {
        conexion.query("update usuarios set estado = ? where id_usuario = ?", ["desconectado", id], 
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                conexion.query("delete from usuarios where id_usuario= ?", [id], (err, result) =>{
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve("desconectado");
                })

        })
    })
}

// esta funcion nos permite registrar un nombre a un usuario 

const registrarNombre = (nombre, id) => {
    return new Promise((resolve, reject) => {
        conexion.query("update usuarios set nombre = ? where id_usuario = =", [nombre, id], 
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({mensaje: "registro de nombre exitoso"})
            }
        )
    })

}
module.exports = {
    registrarMensaje,
    registrarUsuario,
    optenerUsuario,
    pedirMensaje,
    desconectado,
    registrarNombre
}