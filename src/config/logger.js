import { createLogger, transports, format } from 'winston';

// Niveles de prioridad
const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};

// Colores correspondientes a los niveles
const colors = {
  debug: 'blue',
  http: 'green',
  info: 'cyan',
  warning: 'yellow',
  error: 'red',
  fatal: 'magenta',
};

// Formato para los logs
const logFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] [${level}] ${message}`;
  })
);


const environment = process.env.NODE_ENV || 'development';

const devLogLevel = process.env.LOG_LEVEL_DEVELOPMENT || 'debug';
const prodLogLevel = process.env.LOG_LEVEL_PRODUCTION || 'info';

// Configuración para el logger de desarrollo
const devLogger = createLogger({
  levels,
  format: logFormat,
  transports: [new transports.Console()],
  level: devLogLevel, 
});

// Configuración para el logger de producción
const prodLogger = createLogger({
  levels,
  format: logFormat,
  transports: [
    new transports.Console({ level: prodLogLevel }), 
    new transports.File({ filename: 'errors.log', level: 'error' }), 
  ],
  level: prodLogLevel, 
});

export { devLogger, prodLogger };