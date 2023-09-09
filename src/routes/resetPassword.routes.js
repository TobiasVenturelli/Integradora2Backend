import { Router } from "express";
import ResetPasswordController from '../controllers/resetPasswordController.js';

const router = Router();
const resetPasswordController = new ResetPasswordController();


router.get('/solicitar-recuperacion', (req, res) => {
  resetPasswordController.renderSolicitarRecuperacionView(req, res);
});


router.post('/solicitar-recuperacion', async (req, res) => {
  try {
    const { email } = req.body;
    await resetPasswordController.solicitarRecuperacion(req, res, email);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get('/restablecer-contraseña', (req, res) => {
  resetPasswordController.renderRestablecerContrasenaView(req, res);
});

router.post('/restablecer-contraseña', async (req, res) => {
  try {
    const { token, nuevaContraseña } = req.body;
    await resetPasswordController.restablecerContraseña(req, res, token, nuevaContraseña);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


export default router;
