import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./auth/userRoutes.js";
import pwdResetRoutes from "./pwd-reset/tokenRoutes.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
dotenv.config();

// routes
app.use("/user", userRoutes);
app.use("/pwdReset", pwdResetRoutes);

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
