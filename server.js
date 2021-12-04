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

app.post("/post", (req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const content = req.body.content;

  db.query(
    "INSERT INTO posts (user, content,title) VALUES(?,?,?)",
    [username, title, content],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.status(200);
      }
    }
  );
});

app.get("/posts", (req, res) => {
  const q = "SELECT * from posts";
  db.query(q, (err, result) => {
    res.send(result);
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, "  ", password);
  const q = "SELECT * FROM users WHERE username=? AND password = ?";
  db.query(q, [username, password], (err, result) => {
    if (err) {
      console.log(err);
      console.log(result);
    }
    if (result.length > 0) {
      res.status(200).json({
        status: true,
        result: "Log in successful!",
        isAdmin: result[0].isAdmin,
      });
    }
  });
});

const port = process.env.PORT | 3001;
app.listen(port, () => {
  console.log("listnenig on port ", port);
});
