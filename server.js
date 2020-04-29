const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const socketio = require("socket.io");

const SimulationController = require("./simulation/SimulatorController");


app.prepare().then(() => {
    const server = createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);

        handle(req, res, parsedUrl);

    }).listen(3000, (err) => {
        if (err) throw err;
        console.log("> Ready on http://localhost:3000");
    });

    const io = socketio(server);

    io.on("connection", (socket) => {

        console.info(`Socket ${socket.id} connected.`);
        const controller = new SimulationController(socket);

        socket.on("disconnect", () => {
            controller.onDisconnect();
            console.info(`Socket ${socket.id} disconnected.`);
        });
    });
});
