const url = require("url");
const http = require("http");
const fs = require("fs");
const { eliminarRepertorio, consultar, agregarCancion, editar } = require("./consultas");

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgresql",
  database: "repertorio",
  port: 5432,
});

http
  .createServer(async (req, res) => {
    const { id } = url.parse(req.url, true).query;

    if (req.url == "/" && req.method == "GET") {
      res.setHeader("content-type", "text/html");
      const html = fs.readFileSync("index.html", "utf8");
      res.end(html);
    }
    if (req.url == "/canciones" && req.method == "GET") {
      const registros = await consultar(pool);
      res.end(JSON.stringify(registros));
    }
    if (req.url.startsWith("/cancion") && req.method == "DELETE") {
      const registros = await eliminarRepertorio(id, pool);
      res.end(JSON.stringify(registros));
    }
    if (req.url == "/cancion" && req.method == "POST") {
      let body = "";
      req.on("data", (datos) => {
        body += datos;
      });
      req.on("end", async () => {
        const datos = Object.values(JSON.parse(body));
        const result = await agregarCancion(datos, pool);
        res.end(JSON.stringify(result));
      });
    }

    if (req.url == "/cancion" && req.method == "PUT") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const datos = Object.values(JSON.parse(body));
        console.log(datos);
        const respuesta = await editar(datos, pool);
        res.end(JSON.stringify(respuesta));
      });
    }
  })
  .listen(3000, console.log("Servidor encendido"));