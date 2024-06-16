import express from "express";
import cors from "cors";
import Conn from "./conn.js";
import router from "./routes/route.js";
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

Conn();

app.use("/", router);

app.listen(port, () => {
  console.log("App islistening in port 8080");
});
