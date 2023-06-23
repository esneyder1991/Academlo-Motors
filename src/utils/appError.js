class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `statusCode`.startsWith('4') ? 'error' : 'fail';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

//class: las clases provienen de programación orientada a objetos generalmente empiezan con mayuscula en este caso se llamará AppError; por herencia se usa extends para que esta clase herede de la clase general Error(clase padre) algunas funcionalidades
// class AppError extends Error {
//generalmente hay un metodo(o función) en las clases el cual es el constructor el cual se ejecuta cuando se instancia una clase(es decir cuando ejecuta)
//   constructor(message, statusCode) {
//     super(message); //para tener todas las funcionalidades de Error en AppError es necesario ejecutar el constructor el cual se ejecuta a traves de super() el cual recibe este "message" a través de los paramentros del constructor
// this.statusCode = statusCode; // hace referencia a los atrubutos o variables de la clase que se está creando, lo cual sirve para identificar las variables(atributos) de mi clase con variables que vengan por parametros de una función en este caso de un constructor
// this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail'; //este ternario es por si ocurriera el remoto caso que se intentara filtrar un error 500 por aquí.
// this.isOperational = true; // esto se pone dado que todos los errores que van a pasar por aqui van a ser errores operacionales.
// Error.captureStackTrace(this, this.constructor); //Esto es para capturar la pila de errores para poder indicar en que linea se encuentra mi error y dentro del parentesis se necesita la referencia al objeto que estoy creando (this) y tambien necesita la función contructora o referencia la contructor, sin embargo este constructor es un metodo que le pertenece a la clase AppError se necesita utilizar this.constructor
//   }
// }

// module.exports = AppError;
