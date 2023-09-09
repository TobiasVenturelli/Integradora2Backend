import passport from "passport";
import { getUserByEmail } from "../services/sessionServices.js";
import { generateToken } from "../utils.js";
import { sendRecoverPassword } from "../utils/mail.utils.js";


class SessionController {
  renderRegisterView(req, res) {
    res.render('sessions/register');
  }

  async registerUser(req, res) {
    try {
      passport.authenticate('register', { failureRedirect: '/session/failregister' })(req, res, () => {
        res.redirect('/session/login');
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  renderLoginView(req, res) {
    res.render('sessions/login');
  }

  async loginUser(req, res) {
    try {
      passport.authenticate('login', { failureRedirect: '/session/faillogin' })(req, res, () => {
        if (!req.user) {
          return res.status(400).send({ status: "error", error: "Credenciales Inválidas" });
        }
        res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/products');
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  logoutUser(req, res) {
    res.clearCookie(JWT_COOKIE_NAME).redirect('/session/login');
  }

  failRegister(req, res) {
    console.log('Fail Strategy');
    res.send({ error: "Failed" });
  }

  failLogin(req, res) {
    res.send({ error: "Fail Login" });
  }

  passwordRecover = async (req, res) => {
    const { correo } = req.body;

    if (!correo) {
      return res.status(404).send("Correo no enviado")
    }

    try {
      const user = await getUserByEmail(correo);
      if (!user) {

        return res.status(404).send("Usuario no existente!");
      }
      const token = generateToken(correo);
      sendRecoverPassword(correo, token)
      res.status(200).send("Reseteo de contraseña enviada")

    } catch (e) {
      console.log("Error: ", e);
      res.status(500).send("Error interno!");

    }

  }
  recoverPassword = (req, res) => {
    const { token } = req.query;
    const { correo } = req.body;
    try {
      const checkToken = validateToken(token);
      if (!checkToken) {
        console.log("Invalid token");
        return res.status(401).send("Acceso denegado!");
      }

      const newToken = generateToken(correo);

      // enviarlo dentro de un json y tomarlo en la pagina donde se reseta la contraseña!
      res.status(200).send(`Enviar a la pagina para resetar la contraseña!, token: ${newToken}`);

    } catch (e) {
      console.log("Error: ", e);
      res.status(500).send("Error interno!");
    }

  }

  resetPassword = async (req, res) => {
    const { correo, password } = req.body;

    try {
      const hashedPassword = await createHash(password);
      await sessionser.updatePasswordByEmail(correo, hashedPassword);

      res.status(200).send("Contraseña modificada correctamente");
    } catch (e) {
      console.log("Error: ", e);
      res.status(500).send("Error interno!");
    }
  }
}
export default SessionController;
