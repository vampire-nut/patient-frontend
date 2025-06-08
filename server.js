const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const hostname =
  process.env.NODE_ENV === "production" ? undefined : "localhost";

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    cors: {
      origin: dev ? "*" : process.env.NEXT_PUBLIC_VERCEL_URL || "*", 
      methods: ["GET", "POST"],
    },
  });

  let patients = [];

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.emit("initialPatients", patients);
    socket.on("submitPatientData", (data) => {
      console.log("Received patient data:", data);
      const newPatient = {
        ...data,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      patients.push(newPatient);

      io.emit("patientUpdate", newPatient);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname || "0.0.0.0"}:${port}`);
    });
});
