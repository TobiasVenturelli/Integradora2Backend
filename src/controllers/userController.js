import UserModel from "../models/user.model.js";

class UserController {
  async changeUserRole(req, res) {
    try {
      const userId = req.params.uid;
      const newRole = req.body.role; 

      
      if (newRole !== "user" && newRole !== "premium") {
        return res.status(400).json({ error: "Rol no válido" });
      }


      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      user.role = newRole;

      await user.save();
      res.json({ message: "Rol de usuario actualizado exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

export default UserController;
