export const isAdmin = (req, res, next) => {
     if (req.user && req.user.role === "admin") {
          return next(); // Permite el acceso si el usuario es administrador
     } else {
          res.status(403).json({ message: "Acceso denegado: se requiere rol de administrador" });
     }
};

export const isUser = (req, res, next) => {
     if (req.user && req.user.role === "user") {
          next(); // Permite el acceso si el usuario es usuario
     } else {
          res.status(403).json({ message: "Acceso denegado: se requiere rol de usuario" });
     }
};