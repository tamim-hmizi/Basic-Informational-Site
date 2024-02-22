import http from "http";
import url from "url";
import fs from "fs";

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);
    let filePath = "";

    switch (pathname) {
      case "/":
        filePath = "./public/index.html";
        break;
      case "/about":
        filePath = "./public/about.html";
        break;
      case "/contact-me":
        filePath = "./public/contact-me.html";
        break;
      default:
        filePath = "./public/404.html";
        break;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/html" });
          fs.readFile("./public/404.html", (err, data) => {
            if (err) {
              res.end("404 Not Found");
            } else {
              res.end(data);
            }
          });
        } else {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        }
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  })
  .listen(8080);
