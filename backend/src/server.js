import express from "express";
import notesRoutes from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
// middleware
app.use(express.json()); // this middleware will parse JSON bodies, req.body
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`\nNew Request:\n--> Request method is ${req.method}\n--> Request URL is ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes); // prefix all endpoints in notesRoutes with "/api/notes"

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
  });
});
