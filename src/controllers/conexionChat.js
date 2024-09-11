const { optenerUsuario, pedirMensaje, registrarNombre } = require("../services/chatBd")

const optenerUsuarios = (req, res) => {
optenerUsuario()
.then((result) => {
    if(result) {
        res.json({
            data: result.usuarios
        })
    }
})
.catch((err) => {
    console.log(err)
    res.json({
        mensaje: err,
        success: false
    })
})
}

const optenerMensajes = (req, res) => {
    pedirMensaje()
    .then((mensajes) =>{
        if (mensajes) {
            res.json({
                success: true,
                data: mensajes.mensajes
            })
        }
    })
    .catch((err) => {
        console.log(err)
        res.json({
            err
        })
    })
}

const registro = (req, res) => {
    const nombre = req.params.nombre;
    const id = req.params.id;
    registrarNombre(nombre, id)
    .then((result) => {
        if(result){
            res.json({
                success: true,
                mensaje: "registro exitoso"
            })
            return;
        }
    })
    .catch((err) => {
        res.json({
            mensaje: err
        })
    })

}
module.exports= {
    optenerUsuarios,
    optenerMensajes,
    registro,
}