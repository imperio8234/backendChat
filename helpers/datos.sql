create table usuarios (
    id_usuario varchar(500) not null,
    nombre varchar(100),
    estado varchar(100),
);

create table mensajes (
    id_usuario varchar(500) not null,
    mensaje varchar(2000),
    nombre varchar(100)
)

