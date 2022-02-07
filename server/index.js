import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(express.urlencoded({ limit: "30mb" }));
app.use(express.json({ limit: "30mb" }));
app.use(cors());
dotenv.config();

const CONNECTION = process.env.CONNECTION_URL;
const PORT = 5001;

mongoose
  .connect(CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));

// mongoose.set("useFindAndModify", false);
