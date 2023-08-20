import 'dotenv/config.js';
import express from "express";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser"
import initializePassport from "./config/passport.config.js";
import config from './config/config.js'
import dotenv from 'dotenv'
import __dirname from "./utils.js"
import run from "./run.js";

dotenv.config()

const app = express()
const PORT = config.server;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))
app.use(cookieParser())
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(config.db.cs, {
    dbName: config.db.dbName
}, (error) => {
    if (error) {
        console.log("Error al conectar a la base de datos:", error);
    } else {
        console.log("Conexión a la base de datos establecida correctamente!");
        const httpServer = app.listen(PORT, () => {
            console.log("Servidor en funcionamiento en el puerto:", PORT);
        });
        const socketServer = new Server(httpServer)
        httpServer.on("error", (e) => {
            console.error("ERROR en el servidor:", e);
        });
        run(socketServer, app)
    }
})