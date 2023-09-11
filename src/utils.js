import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { devLogger, prodLogger } from './config/logger.js';
import config from './config/config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

const createHash = password => {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    prodLogger.info('Se ha creado un hash de contraseña con éxito.');
    return hashedPassword;
}
const isValidPassword = (user, password) => {
    const isValid = bcrypt.compareSync(password, user.password);
    prodLogger.info('Se ha validado una contraseña con éxito.');
    return isValid;
}

const generateToken = user => {
    const token = jwt.sign({ user }, config.jwt.JWT_PRIVATE_KEY, { expiresIn: '1h' });
    prodLogger.info('Se ha generado un token JWT con éxito.');
    return token;
}

const validateToken = (token) => jwt.verify(token, config.jwt.JWT_PRIVATE_KEY, (err) => err ? false : true);

const extractCookie = req => {
    const cookie = (req && req.cookies) ? req.cookies[JWT_COOKIE_NAME] : null;
    prodLogger.info('Se ha extraído una cookie con éxito.');
    return cookie;
}

const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) {
                prodLogger.error('Se ha producido un error durante la autenticación Passport:', err);
                return next(err);
            }
            if (!user) {
                const errorMessage = info.messages ? info.messages : info.toString();
                prodLogger.error(`La autenticación Passport ha fallado: ${errorMessage}`);
                return res.status(401).render('errors/base', {
                    error: errorMessage
                });
            }
            req.user = user;
            prodLogger.info('La autenticación Passport se ha completado con éxito.');
            next();
        })(req, res, next);
    }
}
export {
    passportCall,
    extractCookie,
    validateToken,
    generateToken,
    isValidPassword,
    createHash,
}