const express = require("express");
const path = require("path");

const app = express();

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(publicPath, "about.html"));
});

app.get("/contact-me", (req, res) => {
  res.sendFile(path.join(publicPath, "contact-me.html"));
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(publicPath, "404.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
