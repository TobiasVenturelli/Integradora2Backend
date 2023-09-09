import productRouter from "./routes/products.routes.js"
import cartRouter from "./routes/cart.routes.js"
import chatRouter from "./routes/chat.routes.js"
import messagesModel from "../src/models/messages.model.js";
import productViewsRouter from './routes/products.views.routes.js';
import sessionRouter from './routes/session.routes.js';
import { passportCall } from "./utils.js";
import log from "./routes/loggerTest.routes.js";
import { sendRecoverPassword } from "./utils/mail.utils.js";

const run = (socketServer, app) => {
    app.use((req, res, next) => {
        req.io = socketServer
        next()
    })


    app.use('/loggerTest', log);
    app.use("/products", passportCall('jwt'), productViewsRouter)
    app.use("/session", sessionRouter)
    app.use('/mail', sendRecoverPassword)


    app.use("/api/products", productRouter)
    app.use("/api/carts", cartRouter)
    app.use("/api/chat", chatRouter)


    socketServer.on("connection", socket => {
        console.log("Nuevo cliente connectado")
        socket.on("message", async data => {
        await messagesModel.create(data)
        let messages = await messagesModel.find().lean().exec()
        socketServer.emit("logs", messages)
        })
    })

    app.use("/", (req, res) => res.send("HOME"))

}

export default run