import express from "express";
import cors from "cors";
import Conn from "./conn";
import router from "./routes/route";
const app = express();

app.use(cors());
app.use(express.json());

Conn();

app.use("/", router);

app.listen(8080, () => {
  console.log("App islistening in port 8080");
});
