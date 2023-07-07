import express from "express";
import passport from "passport";
import UserModel from "../dao/models/user.model.js";

const router = express.Router();

router.get('/current', passport.authenticate('current', { session: false }), async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId);

    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario actual' });
  }
});

export default router;
