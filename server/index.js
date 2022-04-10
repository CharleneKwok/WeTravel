import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./auth/userRoutes.js";
import pwdResetRoutes from "./pwd-reset/tokenRoutes.js";
import saveListRoutes from "./save-list/saveListRoutes.js";
import postsRoutes from "./posts/postsRoutes.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cors());
dotenv.config();

// routes
app.use("/user", userRoutes);
app.use("/pwdReset", pwdResetRoutes);
app.use("/saveList", saveListRoutes);
app.use("/post", postsRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

const CONNECTION = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5001;

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
