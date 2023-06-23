const { createLogger, format, transports } = require('winston'); //Winston es una librería para el registro de eventos (logging) en aplicaciones Node.js. Proporciona una forma flexible y fácil de implementar un sistema de registro en tu aplicación, lo que te permite capturar y almacenar información relevante sobre el funcionamiento de tu código.

module.exports = createLogger({
  //format es un objeto de configuración
  format: format.combine(
    format.simple(), //esta opcion es para mostrar el error de la forma mas simple.
    format.timestamp(), //para mostrar la fecha en la que ocurre el error.
    format.printf(
      (
        info //para mostrar todo el contenido del error que se va a guardar.
      ) =>
        `[${info.timestamp}] ${info.level} ${info.message} ${info.file}:${info.line}`
    )
  ),
  transports: [
    new transports.File({
      maxsize: 5120000, // el tamaño maximo en bits que va a tener ese archivo
      maxFiles: 5, //maximo de archivo que me va a permitir crear
      filename: `${__dirname}/../logs/log-api.log`, //__dirname donde estamos e indico donde se van a almacenar los logs
    }),
    new transports.Console({
      //para debugear
      level: 'debug',
    }),
  ],
});
