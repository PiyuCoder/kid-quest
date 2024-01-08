import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { connectDb } from "./db.js";
import userRouter from "./routes/user.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import createQuizRouter from "./routes/quiz.routes.js";
import getDataRouter from "./routes/getAlphData.js";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT;
const swaggerJSDoc = YAML.load("./api.yaml");
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8000"],
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Serve the frontend
app.use(express.static(join(__dirname, "./build")));

// For all other routes, serve the frontend's index.html
app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "./build", "index.html"));
});

// user routes
app.use("/api", userRouter);
app.use("/api", getDataRouter);

//admin routes
app.use("/api", uploadRouter);
app.use("/api", createQuizRouter);

// Serve Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
