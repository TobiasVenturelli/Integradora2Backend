import express from 'express';
import { devLogger, prodLogger } from '../config/logger.js'; 

const router = express.Router();

router.get('/loggerTest', (req, res) => {

  devLogger.debug('Esto es un registro de nivel debug para pruebas');
  prodLogger.info('Esto es un registro de nivel info para pruebas');
  prodLogger.warning('Esto es un registro de nivel warning para pruebas');
  prodLogger.error('Esto es un registro de nivel error para pruebas');
  prodLogger.fatal('Esto es un registro de nivel fatal para pruebas');



  res.status(200).json({ message: 'Pruebas de logs exitosas' });
});

export default router;