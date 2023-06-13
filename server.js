const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect", function () {
        console.log("user disconnected");
    });

    socket.on("init_connection", (msg) => {
        console.log("message: " + msg);
        io.emit("init_connection_resp", msg);
    });
});

server.listen(port, function () {
    console.log(`Listening on port http://localhost:${port}`);
});
