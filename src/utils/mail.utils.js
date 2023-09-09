import transporter from "../config/mails.config.js"
import config from "../config/config.js"

const sendRecoverPassword = (email, token) => {

     const url = config.url.baseUrl + config.url.recoverPassword + `?token=${token}&correo=${email}`;

     const button = `<a href=${url} target="_blank">
                         <button>Recuperar contraseña</button>
                    </a>`;
     const mailOptions = {
          from: 'noreply@miempresa.com',
          to: email,
          subject: 'Recuperación de contraseña',
          html: `
          <h1>Por favor haga click en el siguiente boton para recuperar su contraseña</h1>
          <hr>
          ${button}
          `
     }
     transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log("Error al enviar el correo de recuperación:", err);
            return;
          }
          console.log("Correo de recuperación enviado:", info);
        });
      };
export {
     sendRecoverPassword
}