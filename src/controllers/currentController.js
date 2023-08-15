import CurrentService from "../services/current.service.js";

class CurrentController {
  constructor() {
    this.currentService = new CurrentService();
  }

  async getCurrentUser(req, res) {
    try {
      const userId = req.user._id;
      const user = await this.currentService.getCurrentUser(userId);

      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default CurrentController;