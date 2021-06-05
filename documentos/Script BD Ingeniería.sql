CREATE DATABASE B77848_B76097_ING_2021

USE B77848_B76097_ING_2021

CREATE TABLE Sexo (
	idSexo tinyint identity(1,1) primary key, 
	descripcion nvarchar(40) not null
);

CREATE TABLE Departamento (
	idDepartamento tinyint identity(1,1) primary key,
	descripcion nvarchar(40) not null
);

CREATE TABLE Clasificador (
	idClasificador tinyint identity(1,1) primary key,
	descripcion nvarchar(40) not null
);


CREATE TABLE Usuario (
	idUsuario smallint identity(1,1) primary key,
	nombre nvarchar(20) not null,
	apellidos nvarchar(20) not null,
	idSexo tinyint not null,
	identificacion nvarchar(20) not null,
	foto varbinary(max) not null,
	nombreFoto nvarchar(20) not null,
	fechaNacimiento date not null,
	idDepartamento tinyint not null, 
	correo nvarchar(40) not null,
	celular nvarchar(20) not null,
	contrasenna nvarchar(40) not null,
	FOREIGN KEY (idSexo) REFERENCES Sexo(idSexo),
	FOREIGN KEY (idDepartamento) REFERENCES Departamento(idDepartamento)
);


CREATE TABLE Respuesta (
	idRespuesta smallint identity(1,1) primary key,
	descripcion nvarchar(40) not null,
	detalleRespuesta nvarchar(200) not null,
	fechaHoraRespuesta datetime not null,
	idUsuarioRespuesta smallint not null,
	ipComputadoraRespuesta varchar (20) not null,
	año date not null,
	FOREIGN KEY (idUsuarioRespuesta) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Boleta (
	idBoleta smallint identity(1,1) primary key,
	fechaHora datetime not null,
	idUsuario smallint not null,
	palabraClaveConsulta1 nvarchar(20) not null,
	palabraClaveConsulta2 nvarchar(20) not null,
	asuntoDetallado nvarchar(200) not null,
	fechaHoraBoleta datetime not null,
	ipComputadora varchar(20) not null,
	cantidadCambios tinyint not null,
	idClasificador tinyint not null,
	idRespuesta smallint,
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
	FOREIGN KEY (idClasificador) REFERENCES Clasificador(idClasificador),
	FOREIGN KEY (idRespuesta) REFERENCES Respuesta(idRespuesta)

);

CREATE TABLE Detalle (
	linea smallint identity(1,1),
	idBoleta smallint not null,
	evidenciaArchivo varbinary(max) not null,
	nombreArchivo nvarchar(20) not null,
	detalleEvidencia nvarchar(200) not null,
	fechaHoraDetalle datetime not null,
	PRIMARY KEY (linea, idBoleta),
	FOREIGN KEY (idBoleta) REFERENCES Boleta(idBoleta)
);