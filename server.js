const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SHealthPJ Frontend running on port ${PORT}`);
});
