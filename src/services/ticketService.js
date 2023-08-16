import TicketModel from "../models/ticket.model.js";

class TicketService {
    async generateTicket(data) {
        const ticketData = {
            code: this.generateTicketCode(), // Generar un código único para el ticket
            purchase_datetime: new Date(),
            amount: data.amount,
            purchaser: data.purchaser,
            products: data.products
        };

        return TicketModel.create(ticketData);
    }

    generateTicketCode() {
     const timestamp = new Date().getTime(); // Obtener el timestamp actual
     const randomNum = Math.floor(Math.random() * 10000); // Generar un número aleatorio entre 0 y 9999
     const code = `${timestamp}-${randomNum}`; // Concatenar el timestamp y el número aleatorio
     return code;
 }
}

export default TicketService;
