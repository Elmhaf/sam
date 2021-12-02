const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "" | "root" | "password",
  database: "iconSean",
});

app.post("/create", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = 0;

  db.query(
    "INSERT INTO users (username, email,password,isAdmin) VALUES(?,?,?,?)",
    [name, email, password, isAdmin],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send("values Inserted");
      }
    }
  );
});

const port = process.env.PORT | 3001;
app.listen(port, () => {
  console.log("listnenig on port ", port);
});
