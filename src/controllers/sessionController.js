import passport from "passport";

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


  
}

export default SessionController;
