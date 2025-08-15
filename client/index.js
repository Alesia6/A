import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/atmdb")
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error("Mongo connection error:", err));



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
