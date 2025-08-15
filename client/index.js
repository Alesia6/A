import express from "express";
import mongoose from "mongoose";
import loginRoutes from "./routes/login.js";
import accountRoutes from "./routes/account.js";


const app = express();

app.use(express.json());

app.use("/api", loginRoutes);
app.use("/api", accountRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/atmdb")
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error("Mongo connection error:", err));

app.get("/", (_req, res) => res.send("ATM API is running"));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
