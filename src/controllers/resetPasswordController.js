import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import UserModel from '../models/user.model.js';
import config from '../config/config.js';

class ResetPasswordController {
     async enviarCorreoRecuperacion(email) {
          try {
               const usuario = await UserModel.findOne({ correo: email });

               if (!usuario) {
                    throw new Error('Usuario no encontrado');
               }
               const token = jwt.sign({ usuarioId: usuario._id }, 'tu_secreto', { expiresIn: '1h' });



               const transporter = nodemailer.createTransport({
                    host: config.mail.relay,
                    port: config.mail.mailPort,
                    auth: {
                         user: config.mail.mailUser,
                         pass: config.mail.mailPass
                    }
               });


               const mailOptions = {
                    from: 'tu_correo',
                    to: email,
                    subject: 'Recuperación de Contraseña',
                    text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://localhost:8000/reset-password/${token}`,
               };
               await transporter.sendMail(mailOptions);

               return true;
          } catch (error) {
               console.error('Error al enviar el correo de recuperación:', error);
               throw error;
          }
     }

     async restablecerContraseña(token, nuevaContraseña) {
          try {
               const decodedToken = jwt.verify(token, 'tu_secreto');
               const usuarioId = decodedToken.usuarioId;

               const usuario = await UserModel.findById(usuarioId);

               if (!usuario) {
                    throw new Error('Usuario no encontrado');
               }
               const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);
               usuario.password = hashedPassword;
               await usuario.save();
               return true;
          } catch (error) {
               console.error('Error al restablecer la contraseña:', error);
               throw error;
          }
     }
}

export default ResetPasswordController;
