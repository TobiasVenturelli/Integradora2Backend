import UserModel from "../dao/models/user.model.js";

class CurrentService {
  async getCurrentUser(userId) {
    try {
      const user = await UserModel.findById(userId);

      if (user) {
        return user;
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      throw new Error('Error al obtener el usuario actual');
    }
  }
}

export default CurrentService;