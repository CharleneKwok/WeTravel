import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { fileURLToPath } from "url";

const sendEmail = (email, data, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const __filename = fileURLToPath(import.meta.url);
    const source = fs.readFileSync(
      path.join(path.dirname(__filename), "requestPwd.handlebars"),
      "utf-8"
    );
    const compiledTemplate = handlebars.compile(source);
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "WeTravel--Password reset request",
      html: compiledTemplate(data),
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send(err.response);
      }
      return res.status(200).send("Email sent");
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendEmail;
